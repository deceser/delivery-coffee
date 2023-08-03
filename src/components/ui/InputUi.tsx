import React from "react";

type Props = {
  placeholder: string;
};

const InputUi: React.FC<Props> = ({ ...props }) => {
  const { placeholder } = props;
  return (
    <input
      className="h-[42px] border border-gray-200 w-full bg-gray-50 pl-[12px] rounded-[4px] focus:ring-1 focus:ring-yellow-700 outline-none transition-all disabled:opacity-90"
      placeholder={placeholder}
    />
  );
};

export default InputUi;
