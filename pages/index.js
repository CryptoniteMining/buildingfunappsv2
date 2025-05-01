import { useState } from 'react';
import Head from 'next/head';
import FlipCardWithDetails from '../components/FlipCardWithDetails';
import { getEnsData } from '../utils/ensUtils';

export default function Home() {
  const [ensName, setEnsName] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setError('');
      setData(null);
      const result = await getEnsData(ensName);
      setData(result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-100 via-pink-100 to-yellow-100 font-sans text-gray-900 px-4">
      <Head>
        <title>lookup.xyz – Discover ENS Profiles</title>
        <meta property="og:title" content="lookup.xyz – Discover ENS Profiles" />
        <meta property="og:description" content="Search ENS names and view records, avatars, NFTs, POAPs, and followers." />
        <meta property="og:image" content="https://lookup.xyz/opengraph.jpg" />
        <meta property="og:url" content="https://lookup.xyz" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@wesdeth" />
        <meta name="twitter:image" content="https://lookup.xyz/opengraph.jpg" />
      </Head>

      {/* Hero */}
      <header className="text-center py-12">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-rose-500 text-transparent bg-clip-text">
          lookup.xyz
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          Discover ENS profiles. Built by <a href="https://twitter.com/wesdeth" className="underline">wesd.eth</a>
        </p>
      </header>

      {/* ENS Search */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search an ENS name..."
          value={ensName}
          onChange={(e) => setEnsName(e.target.value)}
          className="px-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={fetchData}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Search
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="text-red-600 text-center font-medium mb-4">{error}</div>
      )}

      {/* ENS Profile Details */}
      {data && (
        <FlipCardWithDetails ensData={data} />
      )}

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-16 mb-6">
        Like this tool? Donate to <a href="https://app.ens.domains/name/wesd.eth" className="underline">wesd.eth</a>
      </footer>
    </main>
  );
}
