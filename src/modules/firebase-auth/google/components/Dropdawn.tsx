import React from "react";

type Props = {};

const Dropdawn = ({ ...props }: Props) => {
  const {} = props;
  return (
    <div className="w-48  h-40  top-20 flex-col justify-start items-center absolute">
      <div className="h-40 px-5 pt-5 pb-6 bg-gradient-to-br from-purple-500 to-teal-950 rounded-2xl backdrop-blur-3xl flex-col justify-start items-start gap-3.5 flex">
        <div className="flex-col justify-start items-start gap-2.5 flex">
          <div className="justify-start items-start gap-2.5 inline-flex">
            <div className="text-center text-white text-opacity-50 text-base font-medium leading-snug">
              my.email@gmail.com
            </div>
          </div>
          <div className="w-40 h-px bg-white bg-opacity-20" />
        </div>
        <div className="flex-col justify-start items-start gap-2.5 flex">
          <div className="justify-start items-start gap-2.5 inline-flex">
            <div className="text-center text-gray-200 text-xl font-medium leading-7">
              My history
            </div>
          </div>
          <div className="justify-start items-start inline-flex">
            <div className="justify-start items-start gap-2.5 flex">
              <div className="text-center text-gray-200 text-xl font-medium leading-7">Log out</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dropdawn };
