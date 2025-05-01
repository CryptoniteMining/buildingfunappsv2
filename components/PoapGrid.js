import React from 'react';

export default function PoapGrid({ poaps }) {
  if (!poaps || poaps.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 text-center">
        <h4 className="text-lg font-semibold mb-2 text-gray-800">POAPs</h4>
        <p className="text-sm text-gray-500">No POAPs found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h4 className="text-lg font-semibold mb-3 text-gray-800">POAPs</h4>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {poaps.map((poap, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <img
              src={poap.image_url}
              alt={poap.event.name}
              title={poap.event.name}
              className="w-16 h-16 rounded-md object-cover shadow"
            />
            <span className="text-xs mt-1 text-gray-600 truncate w-full">{poap.event.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}