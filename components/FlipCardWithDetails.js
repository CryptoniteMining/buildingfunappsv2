import React, { useState } from 'react';
import EFPGrid from './EFPGrid';
import SocialCards from './SocialCards';

export default function FlipCardWithDetails({ ensData }) {
  const { name, address, avatar, isPrimary, records, efp, nfts } = ensData;
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

      {/* Flip Card + Records */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Flip Card */}
        <div className="w-full flex justify-center">
          <div
            className="w-[350px] h-[200px] relative cursor-pointer"
            style={{ perspective: '1200px' }}
            onClick={() => setFlipped(!flipped)}
          >
            <div
              className="w-full h-full transition-transform duration-700 ease-in-out relative"
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
                <span className="text-xs text-gray-400 mt-4">Click to reveal wallet address</span>
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

      {/* Social Cards */}
      <SocialCards socials={{
        twitter: records?.["com.twitter"],
        github: records?.["com.github"],
        telegram: records?.["org.telegram"],
        farcaster: records?.["org.farcaster"],
      }} />

      {/* EFP Grid */}
      <EFPGrid efp={efp} />

      {/* NFTs */}
      <div className="bg-white rounded-xl shadow-md p-4 mt-4">
        <h4 className="text-lg font-semibold mb-3 text-gray-800">NFTs</h4>
        {nfts && nfts.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {nfts.slice(0, 10).map((nft, idx) => (
              <img
                key={idx}
                src={nft.image || nft.media_url}
                alt={nft.name || 'NFT'}
                className="w-16 h-16 object-cover rounded-md border"
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No NFTs found.</p>
        )}
      </div>

      {/* POAPs Placeholder */}
      <div className="bg-white rounded-xl shadow-md p-4 mt-4 text-center">
        <h4 className="text-lg font-semibold mb-2 text-gray-800">POAPs</h4>
        <p className="text-sm text-gray-500">POAPs display coming soon...</p>
      </div>
    </div>
  );
}
