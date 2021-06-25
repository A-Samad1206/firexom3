import { memo } from 'react';

const TopHeader = () => {
  return (
    <>
      <div className="flex flex-row justify-center items-center space-x-3">
        <span
          className="
        w-11
        h-11
        items-center
        justify-center
        inline-flex
        rounded-full
        font-bold
        text-lg text-white
        bg-blue-900
        hover:shadow-lg
        cursor-pointer
        transition
        ease-in
        duration-300
      "
        >
          F
        </span>
        <span
          className="
        w-11
        h-11
        items-center
        justify-center
        inline-flex
        rounded-full
        font-bold
        text-lg text-white
        bg-blue-400
        hover:shadow-lg
        cursor-pointer
        transition
        ease-in
        duration-300
      "
        >
          T
        </span>
        <span
          className="
        w-11
        h-11
        items-center
        justify-center
        inline-flex
        rounded-full
        font-bold
        text-lg text-white
        bg-blue-500
        hover:shadow-lg
        cursor-pointer
        transition
        ease-in
        duration-300
      "
        >
          Li
        </span>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <span className="h-px w-16 bg-gray-300"></span>
        <span className="text-gray-500 font-normal">OR</span>
        <span className="h-px w-16 bg-gray-300"></span>
      </div>
    </>
  );
};
export default memo(TopHeader);
