
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLookup = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/ens?name=${input}`);
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching ENS data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 text-gray-900">
      <Head>
        <title>lookup.xyz</title>
      </Head>
      <main className="flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-400">
          lookup.xyz
        </h1>
        <p className="mb-6 mt-2 text-lg text-gray-700">
          A modern ENS explorer • built by <a href="https://twitter.com/wesd_eth" className="underline">wesd.eth</a>
        </p>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter .eth name"
            className="p-3 border rounded-lg shadow-md"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleLookup}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg"
          >
            {loading ? 'Loading...' : 'Lookup'}
          </button>
        </div>
        {data && (
          <div className="mt-6 bg-white p-6 rounded-xl shadow-lg w-full max-w-xl">
            <h2 className="text-xl font-semibold">{data.name}</h2>
            <p><strong>Address:</strong> {data.address}</p>
            <p><strong>Expiry:</strong> {data.expiry}</p>
            <p><strong>Followers:</strong> {data.followers}</p>
          </div>
        )}
        <footer className="mt-12 text-center text-sm text-gray-600">
          Like this tool? Donate to <code>wesd.eth</code>
        </footer>
      </main>
    </div>
  );
}
