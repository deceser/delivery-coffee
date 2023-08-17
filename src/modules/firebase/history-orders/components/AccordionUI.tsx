import React from "react";

type Props = {
  isOpen: boolean;
  setOpenOrderId: React.Dispatch<React.SetStateAction<string | null>>;

  header: string;
  orderId: string;
};

const AccordionUI = ({ ...props }: Props) => {
  const { isOpen, setOpenOrderId, header, orderId } = props;
  return (
    <div className="accordion-item w-full mt-[10px]">
      <div
        onClick={() => setOpenOrderId(isOpen ? null : orderId)}
        className="accordion-header flex justify-between p-5 border text-3xl text-gray-500 select-none rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <span>{header}</span>
        <span> {isOpen ? "▽" : "△"} </span>
      </div>

      {isOpen && (
        <p className="accordion-body p-5 border text-2xl text-gray-400 rounded-lg leading-relaxed">
          {"body"}
        </p>
      )}
    </div>
  );
};

export default AccordionUI;
