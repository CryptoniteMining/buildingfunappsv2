import React, { useState } from 'react';

export default function FlipCardWithDetails({ ensData }) {
  const { name, address, avatar, isPrimary, records, efp } = ensData;

  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full max-w-5xl flex flex-col gap-10 mx-auto px-4">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col items-center">
        {avatar && (
          <img src={avatar} alt="ENS Avatar" className="w-24 h-24 rounded-full border-4 border-purple-400 shadow-md mb-4" />
        )}
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        {isPrimary && (
          <p className="text-xs text-green-600 font-medium mt-1">✅ Primary Name</p>
        )}
        <p className="text-sm text-gray-500 mt-2 break-all">{address}</p>
      </div>

      {/* Records and Flip */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Flip Card */}
        <div className="w-full flex justify-center">
          <div
            className="w-[350px] h-[200px] relative cursor-pointer"
            style={{ perspective: '1200px' }}
            onClick={() => setFlipped(!flipped)}
          >
            <div
              className="w-full h-full transition-transform duration-700 relative"
              style={{
                transformStyle: 'preserve-3d',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 bg-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center px-4"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <h3 className="text-lg font-semibold text-purple-600">ENS Name</h3>
                <p className="text-xl font-bold text-gray-800 mt-2">{name}</p>
                <span className="text-xs text-gray-400 mt-4">Click to flip for address</span>
              </div>
              {/* Back */}
              <div
                className="absolute inset-0 bg-purple-100 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center px-4"
                style={{
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <h3 className="text-lg font-semibold text-purple-700">Address</h3>
                <p className="text-sm break-words text-gray-700 mt-2">{address}</p>
                <span className="text-xs text-gray-400 mt-4">Click to flip back</span>
              </div>
            </div>
          </div>
        </div>

        {/* ENS Records */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h4 className="text-lg font-semibold mb-3 text-gray-800">ENS Records</h4>
          {records && Object.keys(records).length > 0 ? (
            <ul className="text-sm text-gray-700 space-y-2">
              {Object.entries(records).map(([key, val]) => (
                <li key={key}><strong>{key}:</strong> {val}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No text records found.</p>
          )}
        </div>
      </div>

      {/* Socials & EFP */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Social Links */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h4 className="text-lg font-semibold mb-3 text-gray-800">Social Links</h4>
          <ul className="space-y-2 text-sm text-blue-600">
            {records?.["com.twitter"] && (
              <li>
                <a
                  href={`https://x.com/${records["com.twitter"]}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  🐦 @{records["com.twitter"]}
                </a>
              </li>
            )}
            {records?.["com.farcaster"] && (
              <li>
                <a
                  href={`https://warpcast.com/${records["com.farcaster"]}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  🌐 @{records["com.farcaster"]}
                </a>
              </li>
            )}
            {records?.["com.lens"] && (
              <li>
                <a
                  href={`https://hey.xyz/u/${records["com.lens"]}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  📸 @{records["com.lens"]}
                </a>
              </li>
            )}
          </ul>
          {!(
            records?.["com.twitter"] ||
            records?.["com.farcaster"] ||
            records?.["com.lens"]
          ) && <p className="text-sm text-gray-500">No connected social handles.</p>}
        </div>

        {/* EFP Stats */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h4 className="text-lg font-semibold mb-3 text-gray-800">Ethereum Follow Protocol</h4>
          {efp?.followers !== undefined ? (
            <ul className="text-sm text-gray-700">
              <li><strong>Followers:</strong> {efp.followers}</li>
              <li><strong>Following:</strong> {efp.following}</li>
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No EFP data available.</p>
          )}
        </div>
      </div>

      {/* POAPs Placeholder */}
      <div className="bg-white rounded-xl shadow-md p-4 mt-4 text-center">
        <h4 className="text-lg font-semibold mb-2 text-gray-800">POAPs</h4>
        <p className="text-sm text-gray-500">POAPs display coming soon...</p>
      </div>
    </div>
  );
}
