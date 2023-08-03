import React from "react";
import { toast } from "react-toastify";

type Props = {
  displayName?: string;
  email?: string;
  handleLogout: () => void;
};

const handleClickHistory = () => {
  toast.warn("Sorry, this feature is currently unavailable");
};

const Dropdawn = ({ ...props }: Props) => {
  const { displayName, email, handleLogout } = props;
  return (
    <div className=" px-5 pt-5 pb-6 bg-gradient-to-br from-purple-500 to-teal-950 rounded-2xl backdrop-blur-3xl flex-col justify-start items-start gap-3.5 flex">
      <div className="flex-col justify-start flex gap-[2px]">
        <div className="justify-start  inline-flex">
          <div className="text-center text-white  text-base font-medium leading-snug ">
            Hi, {displayName}
          </div>
        </div>
        <div className="w-full h-px bg-white bg-opacity-20" />
        <div className="justify-start items-start inline-flex">
          <div className="text-center text-white text-opacity-50 text-base font-medium leading-snug ">
            {email}
          </div>
        </div>
      </div>
      <div className="flex-col justify-start items-start flex">
        <button
          onClick={handleClickHistory}
          className="text-center text-gray-200 text-xl font-medium leading-7 hover:opacity-50 transition-all"
        >
          My history
        </button>
        <button
          onClick={handleLogout}
          className="text-center text-gray-200 text-xl font-medium leading-7 hover:opacity-50 transition-all"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export { Dropdawn };
