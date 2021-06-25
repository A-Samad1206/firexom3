import React, { memo } from 'react';

const index = () => {
  return (
    <div className=" border-t-2 py-2  sm:px-12 text-sm">
      <div className="flex flex-wrap flex-row justify-center sm:justify-between items-center">
        <div className="flex flex-wrap text-sm sm:text-lg   flex-grow sm:flex-grow-0 font-normal sm:font-semibold justify-around">
          <a href="" className="">
            Home
          </a>
          <a href="" className="mx-2.5">
            About
          </a>
          <a href="" className="mx-2.5">
            Contact us
          </a>
        </div>
        <p className=" my-4">&copy; Copyright Reserved 2021</p>
      </div>
    </div>
  );
};

export default memo(index);
