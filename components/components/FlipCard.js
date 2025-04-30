import { useState } from 'react';

export default function FlipCard({ ensData }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full max-w-md mx-auto mt-6 cursor-pointer perspective"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={\`relative w-full h-64 transition-transform duration-700 transform-style preserve-3d \${flipped ? 'rotate-y-180' : ''}\`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-white shadow-lg rounded-lg flex flex-col items-center justify-center p-4">
          {ensData?.avatar && (
            <img
              src={ensData.avatar}
              alt="ENS Avatar"
              className="w-16 h-16 rounded-full mb-4"
            />
          )}
          <h3 className="text-xl font-semibold text-gray-800">{ensData?.name}</h3>
          <p className="text-sm text-gray-500 mt-1">(click to flip)</p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-lg rotate-y-180 p-4 flex flex-col justify-center">
          <p className="mb-2 break-words">
            <span className="font-bold">Address:</span> {ensData?.address}
          </p>
          <p>
            <span className="font-bold">Followers:</span> {ensData?.efp?.followers ?? '—'}
          </p>
          <p>
            <span className="font-bold">Following:</span> {ensData?.efp?.following ?? '—'}
          </p>
        </div>
      </div>
    </div>
  );
}