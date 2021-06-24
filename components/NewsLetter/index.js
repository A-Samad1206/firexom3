import React from 'react';

const index = () => {
  return (
    <div className="rounded-lg shadow-lg my-20 flex flex-row text-white">
      <div className="w-full md:w-3/5 bg-gradient-to-r from-black via-purple-900 to-transparent p-12">
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-extrabold mb-4">
            Subscribe to get our offers first
          </h3>
          <p className="mb-4 leading-relaxed">
            Want to hear from when we have?
          </p>
          <input
            type="text"
            placeholder="Enter Email..."
            className="bg-gray-600 text-gray-200 placeholder-gray-100 px-4 py-3 w-full rounded-lg focus:outline-none focus:ring"
          />
          <button className="bg-red-600 py-2 rounded-lg w-full my-4">
            Subscribe
          </button>
        </div>
      </div>
      <div className="hidden md:w-2/5 ">
        <img src="/imgs/modern-shirt.png" alt="" className="h-56" />
      </div>
    </div>
  );
};

export default index;
