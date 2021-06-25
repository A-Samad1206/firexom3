const Selection = () => {
  return (
    <>
      <div className="flex my-3">
        <div className="bg-black w-5 h-5 rounded-full shadow-md mr-2"></div>
        <div className="bg-blue-800 w-5 h-5 rounded-full shadow-md mr-2"></div>
        <div className="bg-white w-5 h-5 rounded-full shadow-md mr-2"></div>
        <div className="bg-red-800 w-5 h-5 rounded-full shadow-md mr-2"></div>
        <div className="bg-green-800 w-5 h-5 rounded-full shadow-md mr-2"></div>
      </div>
      <div className="flex flex-row my-3">
        <div className="border-2 rounded-md border-gray-300 text-gray-400 text-xs px-2 py-1 mr-1">
          XS
        </div>
        <div className="border-2 rounded-md border-gray-300 text-gray-400 text-xs px-2 py-1 mr-1">
          SM
        </div>
        <div className="border-2 rounded-md border-gray-300 text-gray-400 text-xs px-2 py-1 mr-1">
          MD
        </div>
      </div>
    </>
  );
};

export default Selection;
