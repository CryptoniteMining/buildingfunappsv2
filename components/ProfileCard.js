import React from 'react';

export default function ProfileCard({ ensData }) {
  const { name, address, avatar, isPrimary, web3bio } = ensData;
  const socials = web3bio?.profiles || {};

  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col items-center">
      {avatar && (
        <img
          src={avatar}
          alt="ENS Avatar"
          className="w-24 h-24 rounded-full border-4 border-purple-400 shadow-md mb-4"
        />
      )}
      <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
      {isPrimary && (
        <p className="text-xs text-green-600 font-medium mt-1">✅ Primary Name</p>
      )}
      <p className="text-sm text-gray-500 mt-2 break-all">{address}</p>

      {/* Social Links */}
      {(socials?.x || socials?.farcaster || socials?.lens) && (
        <div className="flex gap-4 mt-4 text-sm text-blue-600">
          {socials.x && (
            <a
              href={`https://x.com/${socials.x}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              🐦 @{socials.x}
            </a>
          )}
          {socials.farcaster && (
            <a
              href={`https://warpcast.com/${socials.farcaster}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              🌐 @{socials.farcaster}
            </a>
          )}
          {socials.lens && (
            <a
              href={`https://hey.xyz/u/${socials.lens}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              📸 @{socials.lens}
            </a>
          )}
        </div>
      )}

      {/* EFP Stats */}
      {web3bio?.follower_count !== undefined && (
        <div className="mt-4 text-sm text-gray-700">
          <p><strong>Followers:</strong> {web3bio.follower_count}</p>
          <p><strong>Following:</strong> {web3bio.following_count}</p>
        </div>
      )}
    </div>
  );
}
