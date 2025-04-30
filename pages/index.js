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

      const txs = isAdvanced ? await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`) : { data: { result: [] } };
      const balance = isAdvanced ? await provider.getBalance(address) : null;
      const nftResult = isAdvanced ? await axios.get(`${process.env.NEXT_PUBLIC_ALCHEMY_BASE_URL}/getNFTs?owner=${address}`) : { data: { ownedNfts: [] } };

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
    <div className={darkMode ? "dark bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white" : "bg-gradient-to-br from-[#dff6ff] via-[#e4f1fe] to-[#f1f1f1] text-black relative overflow-hidden"}>
      <Head>
        <title>lookup.xyz – ENS Explorer</title>
        <meta property="og:title" content="lookup.xyz – ENS Explorer" />
        <meta property="og:description" content="Explore .eth names, wallets, NFTs & more with the sleekest Web3 lookup tool." />
        <meta property="og:image" content="https://ens.domains/media/ens-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="min-h-screen p-6 max-w-3xl mx-auto font-sans transition-all duration-300 relative z-10 overflow-visible">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-sky-200 via-white to-sky-300 blur-sm"></div>
        <div className="absolute left-[-100px] top-20 text-6xl font-black text-blue-400/30 select-none animate-float">ENS</div>
        <div className="absolute right-[-100px] top-60 text-6xl font-black text-purple-400/30 select-none animate-float-slow">ENS</div>
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(15px); }
          }
          @keyframes float-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(30px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-slow {
            animation: float-slow 8s ease-in-out infinite;
          }
        `}</style>

        <div className="flex justify-between items-center mb-8 relative z-10">
          <div>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-orange-400 to-yellow-300 animate-pulse">lookup.xyz</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">A modern ENS explorer • built by <a href="https://app.ens.domains/wesd.eth" target="_blank" rel="noopener noreferrer" className="underline font-medium">wesd.eth</a></p>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="text-xs border px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <div className="relative z-10 bg-white dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
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
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:to-pink-600 transition text-white px-6 py-2 rounded-full shadow"
              disabled={loading}
            >
              {loading ? "Loading..." : "Lookup"}
            </button>
          </div>

          {/* ... Keep the rest of the ENS display output unchanged ... */}
        </div>
      </main>
    </div>
  );
}
