import React from 'react';

const index = () => {
  return (
    <section className="flex justify-center border">
      <div id="hero" className="flex flex-row mt-20  ">
        <div className="w-2/5 flex flex-col justify-center">
          <h2 className="font-serif text-5xl text-gray-800 mb-4">
            Some Catchy title
          </h2>
          <p className="uppercase text-gray-600 tracking-wide">
            Brand Tag Line goes here
          </p>
          <p className="uppercase text-gray-600 tracking-wide">
            Brand motto goes here
          </p>
          <a
            href=""
            className="bg-gradient-to-r from-red-600 to-pink-500 rounded-full
            px-6 py-2 text-gray-50 uppercase text-md self-start my-5
            "
          >
            Shop Now
          </a>
        </div>
        <img src="/imgs/canon-printer.png" alt="" className="self-center " />
      </div>
    </section>
  );
};

export default index;
