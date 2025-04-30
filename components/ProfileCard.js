import React from 'react';

export default function ProfileCard({ name, address, avatar, isPrimary }) {
  return (
    <div className="bg-white shadow-xl rounded-xl p-6 max-w-xl w-full text-center mx-auto">
      {avatar && (
        <img
          src={avatar}
          alt="ENS Avatar"
          className="w-24 h-24 rounded-full border-4 border-purple-400 shadow-lg mx-auto mb-4"
        />
      )}
      <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
      {isPrimary && <p className="text-sm mt-1 text-green-600 font-medium">✅ Primary ENS Name</p>}
      <p className="text-xs text-gray-500 mt-2 truncate">{address}</p>
    </div>
  );
}