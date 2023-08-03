import React from "react";

type Props = {
  label: string;
  htmlfor: string;
  id: string;
  name: string;
  value: string;
  image: any;
};

const InputRadioUI: React.FC<Props> = ({ ...props }) => {
  const { label, htmlfor, id, name, value, image } = props;
  return (
    <label
      htmlFor={htmlfor}
      className="p-[16px] bg-gray-200 rounded-[6px] flex items-center gap-[12px] uppercase text-gray-500 font-roboto text-[12px] cursor-pointer hover:bg-purple-100 hover:ring-1 hover:ring-purple-500 label-checked:bg-purple-100 label-checked:ring-1 label-checked:ring-purple-500 transition-all"
    >
      {image}
      {label}
      <input id={id} value={value} type="radio" name={name} />
    </label>
  );
};

export default InputRadioUI;
