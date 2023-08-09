import React from "react";

type Props = {
  placeholder: string;
  name: string;
  read?: boolean;
  value: string | undefined;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputUi = ({ ...props }: Props) => {
  const { placeholder, name, value, handleOnChange, read } = props;
  return (
    <input
      className="h-[42px] border border-gray-200 w-full bg-gray-50 pl-[12px] rounded-[4px] focus:ring-1 focus:ring-yellow-700 outline-none transition-all disabled:opacity-90"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleOnChange}
    />
  );
};

export default InputUi;
