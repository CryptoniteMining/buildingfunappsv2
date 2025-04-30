// components/FlipCard.js

export default function FlipCard({ ensData }) {
  return (
    <div className="flex justify-center">
      <div className="w-80 h-56 perspective">
        <div className="relative w-full h-full duration-700 transform-style-preserve-3d hover:rotate-y-180">
          
          {/* Front Side */}
          <div className="absolute w-full h-full bg-white rounded-xl shadow-lg p-4 backface-hidden flex flex-col justify-center items-center">
            <h3 className="text-lg font-bold text-purple-600 mb-2">ENS Name</h3>
            <p className="text-sm text-gray-700">{ensData.name}</p>
            <p className="mt-2 text-sm text-gray-400">Hover to flip.</p>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full bg-purple-100 rounded-xl shadow-lg p-4 rotate-y-180 backface-hidden flex flex-col justify-center items-center">
            <h3 className="text-lg font-bold text-purple-600 mb-2">Address</h3>
            <p className="text-sm text-gray-700 break-all text-center">{ensData.address}</p>
          </div>
        </div>
      </div>

      {/* Tailwind custom class for 3D */}
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .hover\\:rotate-y-180:hover {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
