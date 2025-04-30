// components/FlipCard.js

export default function FlipCard({ ensData }) {
  return (
    <div className="flex justify-center items-center mt-10">
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
  );
}
