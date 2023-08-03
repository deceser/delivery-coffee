import React from "react";
import Image from "next/image";

import { Minus, Plus, Trash } from "phosphor-react";

type Props = {
  handleRemoveProduct: () => void;
  handleProductDecrement: () => void;
  handleProductIncrement: () => void;
  title: string;
  subTotal: string;
  imageUrl: string;
  quantity: number;
};

const CoffeeCardCart = ({ ...props }: Props) => {
  const {
    imageUrl,
    title,
    quantity,
    subTotal,
    handleRemoveProduct,
    handleProductDecrement,
    handleProductIncrement,
  } = props;

  return (
    <>
      <div className="flex items-center gap-[20px]">
        <Image src={imageUrl} alt={title} width={64} height={64} priority quality={100} />
        <div className="flex flex-col">
          <h1 className="font-roboto text-brow-400 text-[16px]">{title}</h1>
          <div className="flex items-center gap-[8px] mt-[8px]">
            <div className="bg-gray-200 w-[72px] h-[38px] flex items-center justify-evenly rounded-[6px] font-roboto text-purple-500">
              <button onClick={handleProductDecrement} type="button">
                <Minus size={14} weight="fill" />
              </button>
              <span className="text-gray-800 select-none">{quantity}</span>
              <button onClick={handleProductIncrement} type="button">
                <Plus size={14} weight="fill" />
              </button>
            </div>

            <button
              className="flex items-center gap-[4px] h-[38px] text-brow-300 text-[12px] uppercase rounded-[6px] font-roboto group bg-gray-200 p-[8px] hover:bg-purple-500 hover:text-white transition-colors"
              type="button"
              onClick={handleRemoveProduct}
            >
              <Trash size={16} className="text-purple-500 group-hover:text-white" />
              Remover
            </button>
          </div>
        </div>
      </div>
      <span className="font-roboto text-[16px] font-bold text-brow-300">{subTotal}</span>
    </>
  );
};

export default CoffeeCardCart;
