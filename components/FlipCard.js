import React from 'react';

export default function FlipCard({ ensData }) {
  return (
    <div className="perspective w-64 h-40 mx-auto">
      <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180">
        <div className="absolute w-full h-full backface-hidden bg-white border rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-semibold">ENS Name</h3>
          <p className="text-xs truncate">{ensData.name}</p>
          <h3 className="mt-2 text-sm font-semibold">Address</h3>
          <p className="text-xs truncate">{ensData.address}</p>
          <p className="mt-4 text-[10px] text-gray-400">Hover to flip</p>
        </div>
        <div className="absolute w-full h-full backface-hidden bg-gray-100 border rounded-lg shadow-lg p-4 rotate-y-180">
          <h3 className="text-sm font-semibold">More Coming Soon</h3>
          <p className="text-xs text-gray-600">EFP, NFTs, and onchain activity will show here.</p>
        </div>
      </div>
    </div>
  );
}