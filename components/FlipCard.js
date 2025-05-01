import { useState } from 'react';

export default function FlipCard({ ensData }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        onClick={() => setFlipped(!flipped)}
        className="relative w-full h-48 cursor-pointer"
        style={{ perspective: '1000px' }}
      >
        <div
          className="w-full h-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <h3 className="text-lg font-bold text-purple-600 mb-2">ENS Name</h3>
            <p className="text-xl font-semibold">{ensData.name}</p>
            <p className="text-sm text-gray-400 mt-1">Click to reveal wallet address</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">Address</h3>
            <p className="text-xs text-center text-gray-600 break-all">{ensData.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
