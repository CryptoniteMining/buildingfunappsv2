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
    <main className="min-h-screen bg-gradient-to-b from-indigo-100 via-pink-100 to-yellow-100 font-sans text-gray-900 px-4">
      <style jsx global>{`
        body {
          cursor: url('/cursor.svg'), auto;
        }
      `}</style>

      <header className="text-center py-12">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-rose-500 text-transparent bg-clip-text">
          lookup.xyz
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          Discover ENS profiles. Built by <a href="https://twitter.com/wesdeth" className="underline">wesd.eth</a>
        </p>
      </header>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Enter an ENS name..."
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

      {error && (
        <div className="text-red-600 text-center font-medium mb-4">{error}</div>
      )}

      {data && (
        <>
          <section className="flex flex-col items-center text-center mb-8">
            {data.avatar && (
              <img
                src={data.avatar}
                alt="ENS Avatar"
                className="w-24 h-24 rounded-full border-4 border-purple-400 shadow-lg mb-4"
              />
            )}
            <h2 className="text-2xl font-bold text-gray-800">{data.name}</h2>
            {data.isPrimary && (
              <p className="text-xs mt-1 text-green-600 font-medium">✅ Primary Name</p>
            )}
          </section>

          <FlipCard ensData={data} />
        </>
      )}

      <footer className="text-center text-sm text-gray-500 mt-16 mb-6">
        Like this tool? Donate to <a href="https://app.ens.domains/name/wesd.eth" className="underline">wesd.eth</a>
      </footer>
    </main>
  );
}
