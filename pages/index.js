// lookup.xyz – Product of the Month Edition (Fixed)
// ENS Roles • Expiry Alerts • Primary Match • Wallet Age • Top Contract

import { useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import axios from "axios";
import { namehash } from "@ensdomains/ensjs/utils";

export default function Home() {
  const [input, setInput] = useState("");
  const [ensData, setEnsData] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLookup = async () => {
    setLoading(true);
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);

    try {
      let address = input;
      if (input.endsWith(".eth")) {
        const resolved = await provider.resolveName(input);
        if (!resolved) throw new Error("Could not resolve ENS name.");
        address = resolved;
      }

      const ensName = await provider.lookupAddress(address);
      const resolver = ensName ? await provider.getResolver(ensName) : null;
      const avatar = resolver ? await resolver.getText("avatar").catch(() => null) : null;
      const expiry = ensName
        ? await axios.get(
            `https://api.ensideas.com/ens/resolve/${ensName}`
          ).then((r) => r.data?.domain?.expiryDate || null).catch(() => null)
        : null;

      const records = resolver
        ? await Promise.all(["com.twitter", "url", "email"].map(async (key) => [key, await resolver.getText(key).catch(() => null)]))
        : [];

      const txs = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`);
      const balance = await provider.getBalance(address);
      const firstTx = txs.data.result?.[0];
      const last100 = txs.data.result.slice(-100);
      const gasUsed = last100.reduce((acc, tx) => acc + parseInt(tx.gasUsed || 0), 0);

      const contractHits = {};
      last100.forEach((tx) => {
        if (tx.to) contractHits[tx.to] = (contractHits[tx.to] || 0) + 1;
      });

      const topContract = Object.entries(contractHits).sort((a, b) => b[1] - a[1])[0];

      const primaryMatch = ensName === input;
      const certainty = [ensName, address].filter(Boolean).length * 25;

      setEnsData({
        ensName,
        address,
        avatar,
        expiry,
        primaryMatch,
        certainty,
        firstSeen: firstTx?.timeStamp ? new Date(firstTx.timeStamp * 1000).toLocaleDateString() : null,
        records: Object.fromEntries(records),
        topContract: topContract?.[0] || null,
        gasUsed,
      });

      setWalletData({ balance, txs: txs.data.result.slice(-5) });
    } catch (err) {
      console.error(err);
      alert("Error during lookup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 font-sans bg-gradient-to-b from-[#eef2ff] to-white min-h-screen text-gray-900">
      <Head><title>lookup.xyz</title></Head>
      <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">lookup.xyz</h1>
      <p className="mb-6 text-sm">The ENS explorer built by <a href="https://app.ens.domains/wesd.eth" className="underline">wesd.eth</a></p>
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="vitalik.eth or 0x..."
          className="border p-3 rounded w-full mb-4"
        />
        <button onClick={handleLookup} disabled={loading} className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">
          {loading ? "Loading..." : "Lookup"}
        </button>

        {ensData && (
          <div className="mt-6 space-y-3 text-sm">
            <div><strong>ENS:</strong> {ensData.ensName}</div>
            <div><strong>Address:</strong> {ensData.address}</div>
            {ensData.avatar && <img src={ensData.avatar} alt="avatar" className="w-16 h-16 rounded-full" />}
            <div><strong>Primary Match:</strong> {ensData.primaryMatch ? "✅" : "❌"}</div>
            <div><strong>Ownership Score:</strong> {ensData.certainty}%</div>
            <div><strong>Wallet Age:</strong> {ensData.firstSeen}</div>
            <div><strong>ENS Expiry:</strong> {ensData.expiry || "Unknown"}</div>
            <div><strong>Most Interacted Contract:</strong> {ensData.topContract}</div>
            <div><strong>Total Gas (last 100 txs):</strong> {ensData.gasUsed.toLocaleString()} units</div>

            <h3 className="mt-4 font-bold">Records</h3>
            <ul>
              {Object.entries(ensData.records).map(([key, val]) => (
                <li key={key}><strong>{key}:</strong> {val}</li>
              ))}
            </ul>

            <h3 className="mt-4 font-bold">Recent Transactions</h3>
            <ul>
              {walletData?.txs.map((tx, i) => (
                <li key={i}>{tx.hash.slice(0, 12)}... — {tx.value / 1e18} ETH</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
