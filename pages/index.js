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
    console.log("🔍 Looking up:", input);
    setLoading(true);
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    let address = input;
    try {
      if (input.endsWith(".eth")) {
        address = await provider.resolveName(input);
        console.log("Resolved address:", address);
        if (!address) {
          alert("ENS name could not be resolved. Make sure it exists and is correctly typed.");
          setLoading(false);
          return;
        }
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
      let controller = null;
      let nameExpiry = null;
      let subnames = [];

      if (ensName) {
        resolver = await provider.getResolver(ensName);
        controller = await provider.getSigner(address).getAddress().catch(() => null);
      }

      if (resolver) {
        try {
          avatar = await resolver.getText("avatar").catch(() => null);
          bio = await resolver.getText("description").catch(() => null);
          twitter = await resolver.getText("com.twitter").catch(() => null);
          btc = await getChainAddress(resolver, 0, 'address.BTC');
          ltc = await getChainAddress(resolver, 2, 'address.LTC');
          doge = await getChainAddress(resolver, 3, 'address.DOGE');
          sol = await getChainAddress(resolver, 501, 'address.SOL');
        } catch (e) {
          console.warn("Resolver exists but failed to fetch some records:", e);
        }

        if (isAdvanced && resolver) {
          try {
            const keys = ["url", "email", "com.discord"];
            const values = await Promise.all(keys.map(key => resolver.getText(key).catch(() => null)));
            records = keys.reduce((acc, key, i) => {
              if (values[i]) acc[key] = values[i];
              return acc;
            }, {});
          } catch (e) {
            console.warn("⚠️ Failed to get advanced text records:", e);
            records = {};
          }
        }
      }

      const txs = isAdvanced ? await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`) : { data: { result: [] } };
      const balance = isAdvanced ? await provider.getBalance(address) : null;
      const nftResult = isAdvanced ? await axios.get(`${process.env.NEXT_PUBLIC_ALCHEMY_BASE_URL}/getNFTs?owner=${address}`) : { data: { ownedNfts: [] } };

      // Real ENS Expiry Fetch (Name Wrapper or Base Registrar Logic can be added here later)
      nameExpiry = Date.now() / 1000 + 60 * 60 * 24 * 180; // 180 days from now (placeholder)

      // Fetch subnames — this would require ENS subgraph or a dedicated API (placeholder array)
      subnames = ["mail.wesd.eth", "dev.wesd.eth"];

      setEnsData({ ensName, address, avatar, bio, twitter, btc, ltc, doge, sol, records, controller, nameExpiry, subnames });
      setWalletData({ balance, txs: txs.data.result });
      setNfts(nftResult.data.ownedNfts);
    } catch (err) {
      console.error("❌ Lookup failed:", err);
      alert("Something went wrong. Check your ENS name, network settings, or environment keys.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* UI continues here unchanged... */}
    </div>
  );
}
