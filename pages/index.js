import { useState } from 'react';
import FlipCard from '../components/FlipCard';

export default function Home() {
  const [ensName, setEnsName] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setError('');
      setData(null);
      const res = await fetch(`/api/ens?name=${ensName}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Fetch failed');
      setData(json);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-100 to-purple-100 font-sans text-gray-800">
      <style jsx global>{`
        body {
          cursor: url('/cursor.svg'), auto;
        }
      `}</style>

      <h1 className="text-5xl font-black bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text mb-4">
        lookup.<span className="text-yellow-500">xyz</span>
      </h1>
      <p className="mb-6 text-center text-gray-600">
        A modern ENS explorer • built by <a href="https://twitter.com/wesdeth" className="underline">wesd.eth</a>
      </p>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search an ENS name..."
          value={ensName}
          onChange={(e) => setEnsName(e.target.value)}
          className="px-4 py-2 rounded shadow w-80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={fetchData}
          className="bg-purple-500 text-white px-6 py-2 rounded shadow hover:bg-purple-600 transition"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="w-full max-w-xl">
          <FlipCard ensData={data} />
        </div>
      )}

      <footer className="mt-10 text-sm text-gray-500">
        Like this tool? Donate to <a href="https://etherscan.io/address/wesd.eth" className="underline">wesd.eth</a>
      </footer>
    </main>
  );
}
