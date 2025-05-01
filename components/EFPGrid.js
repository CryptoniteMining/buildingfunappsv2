
import React from 'react';

export default function EFPGrid({ efp }) {
  if (!efp || (!efp.followersList && !efp.followingList)) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4">
        <h4 className="text-lg font-semibold mb-3 text-gray-800">
          Ethereum Follow Protocol
        </h4>
        <p className="text-sm text-gray-500">No EFP data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h4 className="text-lg font-semibold mb-3 text-gray-800">
        Ethereum Follow Protocol
      </h4>

      {/* Followers */}
      {efp.followersList?.length > 0 && (
        <>
          <h5 className="text-md font-semibold mb-2 text-purple-600">Followers</h5>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-4">
            {efp.followersList.map((follower, idx) => (
              <a
                key={idx}
                href={`https://web3.bio/${follower.ens}`}
                target="_blank"
                rel="noopener noreferrer"
                title={follower.ens}
                className="flex flex-col items-center text-xs text-gray-700 hover:text-purple-600"
              >
                <img
                  src={follower.avatar || '/default-avatar.png'}
                  alt={follower.ens}
                  className="w-10 h-10 rounded-full shadow"
                />
                <span className="mt-1 truncate">{follower.ens}</span>
              </a>
            ))}
          </div>
        </>
      )}

      {/* Following */}
      {efp.followingList?.length > 0 && (
        <>
          <h5 className="text-md font-semibold mb-2 text-purple-600">Following</h5>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {efp.followingList.map((following, idx) => (
              <a
                key={idx}
                href={`https://web3.bio/${following.ens}`}
                target="_blank"
                rel="noopener noreferrer"
                title={following.ens}
                className="flex flex-col items-center text-xs text-gray-700 hover:text-purple-600"
              >
                <img
                  src={following.avatar || '/default-avatar.png'}
                  alt={following.ens}
                  className="w-10 h-10 rounded-full shadow"
                />
                <span className="mt-1 truncate">{following.ens}</span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
