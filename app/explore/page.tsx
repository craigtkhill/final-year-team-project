import Image from "next/image";


const ExplorePage = () => {
  var selected_char = "/characters/char1.png";
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-8">
        <Image
          src="/air-pollution.jpg"
          alt="Air Pollution Scene"
          width={400}
          height={300}
        />
      </div>
      <div className="mb-8">
        <Image src={selected_char} alt="Character" width={200} height={200} />
      </div>
      <div className="flex justify-between w-96 mb-8">
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">Air Quality Score</p>
          <div className="w-24 h-4 bg-gray-300 rounded-full mt-2"></div>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">Economic Score</p>
          <div className="w-24 h-4 bg-gray-300 rounded-full mt-2"></div>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">Health Score</p>
          <div className="w-24 h-4 bg-gray-300 rounded-full mt-2"></div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold mb-4">Choose a Path:</p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Path 1
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Path 2
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Path 3
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Path 4
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
