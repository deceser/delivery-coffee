import React from "react";

type Props = {
  showOrderId: boolean;
  setShowOrderId: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccordionUI = ({ ...props }: Props) => {
  const { showOrderId, setShowOrderId } = props;
  return (
    <div className="accordion-item w-full">
      <div
        onClick={() => setShowOrderId(!showOrderId)}
        className="accordion-header flex justify-between p-5 border text-3xl text-gray-500 select-none rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <span>{"header"}</span>
        <span> {showOrderId ? "▽" : "△"} </span>
      </div>

      {showOrderId ? (
        <p className="accordion-body p-5 border text-2xl text-gray-400 rounded-lg leading-relaxed">
          {"body"}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default AccordionUI;
