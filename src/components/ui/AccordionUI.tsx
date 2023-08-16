import React from "react";

type Props = {};

const AccordionUI = ({ ...props }: Props) => {
  const {} = props;
  const [show, setShow] = React.useState<boolean>(false);
  return (
    <div className="accordion-item w-full">
      <div
        onClick={() => setShow(!show)}
        className="accordion-header flex justify-between p-5 border text-3xl text-gray-500 select-none rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <span>{"header"}</span>
        <span> {show ? "▽" : "△"} </span>
      </div>

      {show ? (
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
