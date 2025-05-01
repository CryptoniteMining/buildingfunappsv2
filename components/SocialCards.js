import React from 'react';

const iconMap = {
  twitter: 'https://cdn.simpleicons.org/twitter/1DA1F2',
  github: 'https://cdn.simpleicons.org/github/000000',
  farcaster: 'https://seeklogo.com/images/F/farcaster-logo-04E67A99C4-seeklogo.com.png',
  telegram: 'https://cdn.simpleicons.org/telegram/26A5E4',
};

const displayMap = {
  twitter: 'Twitter',
  github: 'GitHub',
  farcaster: 'Farcaster',
  telegram: 'Telegram',
};

const urlMap = {
  twitter: (handle) => `https://twitter.com/${handle}`,
  github: (handle) => `https://github.com/${handle}`,
  farcaster: (handle) => `https://warpcast.com/${handle}`,
  telegram: (handle) => `https://t.me/${handle}`,
};

export default function SocialCards({ socials }) {
  const known = ['twitter', 'github', 'farcaster', 'telegram'];
  const available = known.filter((k) => socials?.[k]);

  if (available.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4">
        <h4 className="text-lg font-semibold mb-3 text-gray-800">Social Links</h4>
        <p className="text-sm text-gray-500">No connected social handles.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h4 className="text-lg font-semibold mb-3 text-gray-800">Social Links</h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {available.map((key) => (
          <a
            key={key}
            href={urlMap[key](socials[key])}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-2 border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition"
          >
            <img src={iconMap[key]} alt={key} className="w-6 h-6" />
            <span className="text-sm text-gray-700 font-medium">
              {displayMap[key]}
            </span>
            <span className="text-xs text-gray-500">@{socials[key]}</span>
          </a>
        ))}
      </div>
    </div>
  );
}