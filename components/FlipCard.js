// components/FlipCard.js

export default function FlipCard({ ensData }) {
  return (
    <div className="flex justify-center mt-6">
      <div className="w-96 h-64 relative [perspective:1000px]">
        <div className="w-full h-full transition-transform duration-700 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)] relative">

          {/* Front Side */}
          <div className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 [backface-visibility:hidden] flex flex-col justify-center items-center text-center">
            <h3 className="text-xl font-semibold text-purple-600">ENS Name</h3>
            <p className="mt-2 text-gray-700 text-lg">{ensData.name}</p>
            <p className="mt-4 text-sm text-gray-400">Hover to flip for more</p>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 bg-purple-100 rounded-xl shadow-lg p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center text-center">
            <h3 className="text-xl font-semibold text-purple-700">Address</h3>
            <p className="mt-2 text-gray-800 text-sm break-all">{ensData.address}</p>
          </div>

        </div>
      </div>
    </div>
  );
}

