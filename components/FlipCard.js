import React, { useState } from 'react';

export default function FlipCard({ ensData }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full max-w-sm h-48 mx-auto perspective"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <h3 className="text-lg font-bold text-purple-600 mb-1">ENS Name</h3>
          <p className="text-lg font-semibold text-gray-800">{ensData.name}</p>
          <p className="text-sm text-gray-500 mt-2">Click to see wallet address</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center rotate-y-180"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-2">Wallet Address</h3>
          <p className="text-xs text-center text-gray-600 break-all">
            {ensData.address}
          </p>
        </div>
      </div>
    </div>
  );
}
