
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newDrop = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };
      setClicks((prev) => [...prev.slice(-10), newDrop]);
      setTimeout(() => {
        setClicks((prev) => prev.filter((drop) => drop.id !== newDrop.id));
      }, 800);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 via-white to-purple-100 font-sans text-gray-900 overflow-hidden">
      <Head>
        <title>lookup.xyz 🌈</title>
      </Head>

      {clicks.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-6 h-6 rounded-full bg-blue-400 opacity-70 animate-ping pointer-events-none"
          style={{ top: drop.y, left: drop.x, transform: 'translate(-50%, -50%)' }}
        />
      ))}

      <main className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
          lookup.xyz
        </h1>
        <p className="mb-6 text-gray-600">A modern ENS explorer • built by <a href="https://twitter.com/wesd_eth" className="underline">wesd.eth</a></p>

        <input
          type="text"
          placeholder="Search ENS name e.g. vitalik.eth"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-3 rounded-xl w-full max-w-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none text-center"
        />
        <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
          Search
        </button>

        <footer className="mt-16 text-sm text-gray-500">
          Like this tool? Donate to <code>wesd.eth</code>
        </footer>
      </main>
    </div>
  );
}

