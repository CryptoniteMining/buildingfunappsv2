import { useState } from 'react';
import FlipCardWithDetails from '../components/FlipCardWithDetails';
import { getEnsData } from '../utils/ensUtils';

export default function Home() {
  const [ensName, setEnsName] = useState('');
  const [ensData, setEnsData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setError('');
    setEnsData(null);
    setLoading(true);
    try {
      const data = await getEnsData(ensName);
      setEnsData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-100 via-pink-100 to-yellow-100 font-sans text-gray-900 px-4 pb-16">
      <style jsx global>{`
  body {
    cursor: auto; // Removed SVG ref
  }
`}</style>

      {/* Header */}
      <header className="text-center py-12">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-rose-500 text-transparent bg-clip-text">
          lookup.xyz
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          Discover ENS profiles. Built by{' '}
          <a href="https://twitter.com/wesdeth" className="underline" target="_blank" rel="noreferrer">
            wesd.eth
          </a>
        </p>
      </header>

      {/* ENS Input + Search */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search an ENS name..."
          value={ensName}
          onChange={(e) => setEnsName(e.target.value)}
          className="px-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Search
        </button>
      </div>

      {/* Status */}
      {error && (
        <p className="text-center text-red-500 font-medium mt-4">{error}</p>
      )}
      {loading && (
        <p className="text-center text-gray-500 mt-4">Loading ENS data...</p>
      )}

      {/* Result */}
      {ensData && (
        <section className="mt-6">
          <FlipCardWithDetails ensData={ensData} />
        </section>
      )}

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-20">
        Like this tool? Donate to{' '}
        <a href="https://app.ens.domains/name/wesd.eth" className="underline" target="_blank" rel="noreferrer">
          wesd.eth
        </a>
      </footer>
    </main>
  );
}
