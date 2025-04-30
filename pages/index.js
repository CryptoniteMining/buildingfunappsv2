// lookup.xyz — Modern ENS Explorer with Rainbow-style UI + Multichain Support

import { useState } from 'react';
import Head from 'next/head';
import { ethers } from 'ethers';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [ensData, setEnsData] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const getChainAddress = async (resolver, coinType, textKey) => {
    try {
      const addr = await resolver.getAddress(coinType);
      if (addr) return addr;
    } catch {}
    try {
      const text = await resolver.getText(textKey);
      return text || null;
    } catch {
      return null;
    }
  };

  const handleLookup = async () => {
    setLoading(true);
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    let address = input;
    try {
      if (input.endsWith(".eth")) {
        address = await provider.resolveName(input);
        if (!address) throw new Error("ENS name could not be resolved.");
      }

      const ensName = await provider.lookupAddress(address);
      let resolver = null;
      let avatar = null;
      let bio = null;
      let twitter = null;
      let btc = null;
      let ltc = null;
      let doge = null;
      let sol = null;
      let records = {};

      if (ensName) {
        resolver = await provider.getResolver(ensName);
      }

      if (resolver) {
        avatar = await resolver.getText("avatar").catch(() => null);
        bio = await resolver.getText("description").catch(() => null);
        twitter = await resolver.getText("com.twitter").catch(() => null);
        btc = await getChainAddress(resolver, 0, 'address.BTC');
        ltc = await getChainAddress(resolver, 2, 'address.LTC');
        doge = await getChainAddress(resolver, 3, 'address.DOGE');
        sol = await getChainAddress(resolver, 501, 'address.SOL');
        records = isAdvanced ? await resolver.getTexts(["url", "email", "com.discord"]).catch(() => ({})) : {};
      }

      const txs = isAdvanced ? await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
      ) : { data: { result: [] } };

      const balance = isAdvanced ? await provider.getBalance(address) : null;

      const nftResult = isAdvanced ? await axios.get(
        `${process.env.NEXT_PUBLIC_ALCHEMY_BASE_URL}/getNFTs?owner=${address}`
      ) : { data: { ownedNfts: [] } };

      setEnsData({ ensName, address, avatar, bio, twitter, btc, ltc, doge, sol, records });
      setWalletData({ balance, txs: txs.data.result });
      setNfts(nftResult.data.ownedNfts);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check the ENS name or address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={darkMode ? "dark bg-[#0a0a0f] text-white" : "bg-gradient-to-br from-[#f3f3ff] to-[#eaf1ff] text-black"}>
      <Head>
        <title>lookup.xyz – ENS Explorer</title>
      </Head>
      <main className="min-h-screen p-6 max-w-3xl mx-auto font-sans transition-all duration-300">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">lookup.xyz</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">A modern ENS explorer • built by <a href="https://app.ens.domains/wesd.eth" target="_blank" rel="noopener noreferrer" className="underline font-medium">wesd.eth</a></p>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="text-xs border px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search any ENS or 0x address"
            className="p-4 border border-gray-300 dark:border-gray-700 w-full rounded-xl shadow-sm bg-white dark:bg-gray-800 mb-4"
          />

          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-medium flex items-center gap-2">
              <input
                type="checkbox"
                checked={isAdvanced}
                onChange={() => setIsAdvanced(!isAdvanced)}
                className="accent-purple-600"
              />
              Advanced Mode
            </label>
            <button
              onClick={handleLookup}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition text-white px-6 py-2 rounded-full shadow"
              disabled={loading}
            >
              {loading ? "Loading..." : "Lookup"}
            </button>
          </div>

          {ensData && (
            <div className="border-t pt-6 mt-6">
              <h2 className="text-2xl font-semibold mb-3">{ensData.ensName || ensData.address}</h2>
              {ensData.avatar && <img src={ensData.avatar} alt="avatar" className="w-20 h-20 rounded-full mb-4" />}
              <p className="mb-1"><strong>Bio:</strong> {ensData.bio}</p>
              <p className="mb-1"><strong>Twitter:</strong> {ensData.twitter}</p>
              <p className="mb-1"><strong>BTC:</strong> {ensData.btc}</p>
              <p className="mb-1"><strong>LTC:</strong> {ensData.ltc}</p>
              <p className="mb-1"><strong>DOGE:</strong> {ensData.doge}</p>
              <p className="mb-1"><strong>SOL:</strong> {ensData.sol}</p>

              {isAdvanced && (
                <>
                  <h3 className="mt-6 font-bold text-lg">Records</h3>
                  <ul className="list-disc list-inside text-sm mb-4">
                    {Object.entries(ensData.records).map(([key, val]) => (
                      <li key={key}><strong>{key}:</strong> {val}</li>
                    ))}
                  </ul>
                  <p className="mb-2"><strong>ETH Balance:</strong> {walletData?.balance ? ethers.formatEther(walletData.balance) + " ETH" : "N/A"}</p>
                  <h3 className="font-bold mt-4">Recent Transactions</h3>
                  <ul className="list-decimal list-inside text-sm">
                    {walletData?.txs.slice(0, 5).map((tx, i) => (
                      <li key={i}>{tx.hash.slice(0, 10)}... – {tx.value / 1e18} ETH</li>
                    ))}
                  </ul>

                  <h3 className="mt-6 font-bold text-lg">NFTs</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {nfts.slice(0, 4).map((nft, i) => (
                      <div key={i} className="border p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                        <img src={nft.media?.[0]?.gateway || nft.metadata?.image} alt={nft.title || nft.metadata?.name} className="w-full h-32 object-cover rounded-lg" />
                        <p className="text-xs mt-2 text-center">{nft.title || nft.metadata?.name}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
