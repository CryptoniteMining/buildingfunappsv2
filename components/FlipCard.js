import React from 'react';

const FlipCard = ({ ensData }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-80 h-48 [perspective:1000px]">
        <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
          <div className="absolute w-full h-full backface-hidden bg-white border border-purple-300 shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">ENS Name</h3>
            <p className="text-sm text-gray-700">{ensData.name}</p>
            <p className="text-xs mt-2 text-gray-400">Hover to flip</p>
          </div>
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-purple-100 border border-purple-300 shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Address</h3>
            <p className="text-sm break-words">{ensData.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
