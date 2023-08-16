import React from "react";

type Props = {};

const SpinerBtn = (props: Props) => {
  return (
    <button
      className="flex items-center gap-[4px] p-[8px] text-white rounded-[6px] select-none bg-purple-500"
      disabled
    >
      <svg
        className="animate-spin h-5 w-5 "
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="white"
        viewBox="0 0 256 256"
      >
        <path d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"></path>
      </svg>
    </button>
  );
};

export default SpinerBtn;
