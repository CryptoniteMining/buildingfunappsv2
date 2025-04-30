import React from 'react';

const ProfileCard = ({ ensData }) => {
  if (!ensData) return null;

  const {
    name,
    address,
    avatar,
    isPrimary,
    records,
    socials,
    efp,
    poaps,
  } = ensData;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto mb-10">
      {/* Top Profile Section */}
      <div className="flex flex-col items-center text-center mb-6">
        {avatar && (
          <img
            src={avatar}
            alt="ENS Avatar"
            className="w-24 h-24 rounded-full border-4 border-purple-400 shadow mb-4"
          />
        )}
        <h2 className="text-2xl font-semibold">{name}</h2>
        {isPrimary && (
          <p className="text-green-600 text-sm mt-1">✅ Primary Name</p>
        )}
        <p className="mt-2 text-sm text-gray-600 break-words max-w-full">{address}</p>
      </div>

      {/* ENS Records */}
      {records && Object.keys(records).length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-purple-600">ENS Records</h3>
          <ul className="text-sm text-gray-800 space-y-1">
            {Object.entries(records).map(([key, value]) => (
              <li key={key}>
                <strong className="capitalize">{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Social Links */}
      {socials && socials.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-purple-600">Social Links</h3>
          <ul className="text-sm text-blue-600 space-y-1">
            {socials.map((link, idx) => (
              <li key={idx}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="underline">
                  {link.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Ethereum Follow Protocol */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-purple-600">Ethereum Follow Protocol</h3>
        {efp && efp.length > 0 ? (
          <ul className="text-sm text-gray-800 space-y-1">
            {efp.map((follow, idx) => (
              <li key={idx}>{follow}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No EFP data available.</p>
        )}
      </div>

      {/* POAPs */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-purple-600">POAPs</h3>
        {poaps && poaps.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {poaps.map((poap, idx) => (
              <img key={idx} src={poap.image_url} alt={poap.event.name} className="w-16 h-16 rounded" />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">POAPs display coming soon...</p>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
