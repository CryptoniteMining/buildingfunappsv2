import React from 'react';

export default function FlipCard({ ensData }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative w-full h-48 perspective">
        <div className="transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180 w-full h-full">
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">ENS Name</h3>
            <p className="text-purple-600 font-semibold">{ensData.name}</p>
            <p className="text-sm text-gray-500 mt-1">Hover to flip</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Address</h3>
            <p className="text-xs text-center text-gray-600 break-all">
              {ensData.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
