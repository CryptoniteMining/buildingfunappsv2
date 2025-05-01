import React, { useState } from 'react';

export default function FlipCard({ ensData }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full max-w-xs mx-auto">
      <div
        className="relative w-full h-48"
        style={{ perspective: '1000px' }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 ${
            flipped ? 'transform rotate-y-180' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <h3 className="text-md font-bold text-purple-600 mb-1">ENS Name</h3>
            <p className="text-lg font-semibold">{ensData.name}</p>
            <p className="text-xs text-gray-400 mt-2">Tap to flip for address</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center transform rotate-y-180"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <h3 className="text-md font-bold text-purple-600 mb-1">Address</h3>
            <p className="text-xs text-gray-700 text-center break-words">
              {ensData.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
