import React from 'react';

export default function FlipCard({ ensData }) {
  return (
    <div className="relative w-full max-w-xs h-48 perspective mx-auto">
      <div className="relative w-full h-full preserve-3d transition-transform duration-700 hover:rotate-y-180">
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
          <h3 className="text-md font-bold text-purple-600 mb-1">ENS Name</h3>
          <p className="text-lg font-semibold">{ensData.name}</p>
          <p className="text-xs text-gray-400 mt-2">Hover to flip for address</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
          <h3 className="text-md font-bold text-purple-600 mb-1">Address</h3>
          <p className="text-xs text-gray-700 text-center break-words">{ensData.address}</p>
        </div>
      </div>
    </div>
  );
}
