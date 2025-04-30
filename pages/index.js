import { useState } from 'react';

export default function Home() {
  const [ensName, setEnsName] = useState('');
  const [ensData, setEnsData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!ensName) return;

    setLoading(true);
    setError(null);
    setEnsData(null);

    try {
      const response = await fetch(`/api/ens?name=${ensName}`);
      if (!response.ok) throw new Error('Failed to fetch ENS data');
      const data = await response.json();
      setEnsData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-4">
        lookup.xyz
      </h1>
      <p className="mb-8 text-gray-700">A modern ENS explorer • built by <a className="underline" href="https://app.ens.domains/name/wesd.eth">wesd.eth</a></p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Enter ENS name..."
          value={ensName}
          onChange={(e) => setEnsName(e.target.value)}
          className="px-4 py-2 rounded shadow w-72 sm:w-96 border border-gray-300"
        />
        <button
          onClick={handleSearch}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded font-medium"
        >
          Search
        </button>
      </div>

      {loading && <p className="mt-6">Loading...</p>}
      {error && <p className="mt-6 text-red-600">{error}</p>}
      {ensData && (
        <div className="mt-10 bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl text-left">
          <h2 className="text-xl font-bold mb-4">Results for {ensName}</h2>
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(ensData, null, 2)}</pre>
        </div>
      )}

      <footer className="mt-12 text-sm text-gray-500">
        Like this tool? Donate to <a href="https://app.ens.domains/name/wesd.eth" className="underline">wesd.eth</a>
      </footer>
    </div>
  );
}
