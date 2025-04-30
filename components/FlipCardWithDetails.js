export default function FlipCardWithDetails({ ensData }) {
  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-10 w-full max-w-5xl px-4 mx-auto">
      {/* Flip Card */}
      <div className="flex justify-center">
        <div className="w-[350px] h-[200px] relative [perspective:1200px]">
          <div className="w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] hover:[transform:rotateY(180deg)] relative">
            {/* Front */}
            <div className="absolute inset-0 bg-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center px-4 [backface-visibility:hidden]">
              <h3 className="text-lg font-semibold text-purple-600">ENS Name</h3>
              <p className="text-xl font-bold text-gray-800 mt-2">{ensData.name}</p>
              <span className="text-xs text-gray-400 mt-4">Hover to flip for address</span>
            </div>

            {/* Back */}
            <div className="absolute inset-0 bg-purple-100 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center px-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <h3 className="text-lg font-semibold text-purple-700">Address</h3>
              <p className="text-sm break-words text-gray-700 mt-2">{ensData.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ENS Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Avatar</h4>
          {ensData.avatar ? (
            <img src={ensData.avatar} alt="ENS Avatar" className="w-20 h-20 rounded-full" />
          ) : (
            <p className="text-sm text-gray-500">No avatar available</p>
          )}
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Social Links</h4>
          {ensData.records?.["com.twitter"] || ensData.records?.["org.telegram"] ? (
            <ul className="text-sm text-blue-600 space-y-1">
              {ensData.records["com.twitter"] && (
                <li><a href={`https://twitter.com/${ensData.records["com.twitter"]}`} target="_blank" rel="noopener noreferrer">@{ensData.records["com.twitter"]}</a></li>
              )}
              {ensData.records["org.telegram"] && (
                <li><a href={`https://t.me/${ensData.records["org.telegram"]}`} target="_blank" rel="noopener noreferrer">@{ensData.records["org.telegram"]}</a></li>
              )}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No social links found</p>
          )}
        </div>
        <div className="bg-white rounded-xl shadow p-4 md:col-span-2">
          <h4 className="font-semibold text-gray-800 mb-2">Text Records</h4>
          {ensData.records && Object.keys(ensData.records).length > 0 ? (
            <ul className="text-sm text-gray-700 space-y-1">
              {Object.entries(ensData.records).map(([key, val]) => (
                <li key={key}><strong>{key}:</strong> {val}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No records available</p>
          )}
        </div>
      </div>
    </div>
  );
}