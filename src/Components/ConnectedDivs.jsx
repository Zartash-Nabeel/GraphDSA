

// eslint-disable-next-line react/prop-types
export default function ConnectedDivs({divcolor}) {
  return (
    <div className="relative w-[52%] h-[600px] bg-gray-100 border border-gray-300">
      {/* Four divs in the corners */}
      <div className={`absolute top-5 left-5 w-24 h-24 ${divcolor === 1 ? 'bg-green-500' : 'bg-red-500'} text-white flex justify-center items-center`}>
        My House
      </div>
      <div className={`absolute top-5 right-5 w-24 h-24 ${divcolor === 2 ? 'bg-green-500' : 'bg-red-500'} text-white flex justify-center items-center`}>
        Shop
      </div>
      <div className={`absolute bottom-5 left-5 w-24 h-24 ${divcolor === 3 ? 'bg-green-500' : 'bg-red-500'} text-white flex justify-center text-nowrap items-center`}>
        Friend House
      </div>
      <div className={`absolute bottom-5 right-5 w-24 h-24 ${divcolor === 4 ? 'bg-green-500' : 'bg-red-500'} text-white flex justify-center items-center`}>
        Library
      </div>

      {/* Arrows */}
      {/* Arrow from Div 1 to Div 3 */}
      <div className="absolute top-[107px] left-[70px] w-0 h-0 border-l-8 border-r-8 border-t-12 border-t-black">⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ </div>

      {/* Arrow from Div 1 to Div 4 */}
      <div className="absolute top-[120px] left-[80px] w-0 h-0 border-l-8 border-r-8 border-t-12 border-t-black rotate-[-56deg]">⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️  ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️</div>

      {/* Arrow from Div 2 to Div 4 */}
      <div className="absolute top-[120px] right-[70px] w-0 h-0 border-l-8 border-r-8 border-t-12 border-t-black ">⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️</div>

      {/* Arrow from Div 3 to Div 1 */}
      <div className="absolute bottom-[107px] left-[70px] w-0 h-0 border-l-8 border-r-8 border-t-12 border-t-black rotate-180">⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️  ⬇️ ⬇️ ⬇️ ⬇️  </div>

      {/* Arrow from Div 3 to Div 2 */}
       <div className="absolute bottom-[100px] left-[92px] w-0 h-0 border-l-8 border-r-8 border-t-12 border-t-black rotate-[-124deg]">⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️</div>

      {/* Arrow from Div 4 to Div 3 */}
      <div className="absolute bottom-[82px] right-[100px] w-0 h-0 border-l-8 border-r-8 border-t-12 border-t-black rotate-90">⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️</div>
    </div>
  );
}
