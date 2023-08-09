import React from "react";
import Image from "next/image";
import Link from "next/link";

import CoffeeCardCart from "./CoffeeCardCart";
import { ICoffeCard } from "@/src/models/coffee-card";

type Props = {
  handleRemoveProduct: (product: string) => void;
  handleProductIncrement: (product: ICoffeCard) => void;
  handleProductDecrement: (product: ICoffeCard) => void;
  cart: ICoffeCard[];
  total: string;
  sumFree: string;
  cartFormatted: ICoffeCard[];
  totalSumFrete: string;
};

const SelectedCoffeesCart = ({ ...props }: Props) => {
  const {
    handleRemoveProduct,
    handleProductIncrement,
    handleProductDecrement,
    cart,
    total,
    sumFree,
    cartFormatted,
    totalSumFrete,
  } = props;
  return (
    <div className="bg-gray-100 p-[40px] mt-[15px] rounded-tl-[6px]  rounded-tr-[44px] rounded-br-[6px] rounded-bl-[44px]">
      {!cart.length ? (
        <div className="flex flex-col items-center justify-center">
          <Image src="/svg/empty_cart.svg" alt="Empty Cart" width={200} height={100} />
          <h1 className="mt-[30px] font-roboto font-normal text-brow-400">
            You have no items in your cart
          </h1>
          <Link
            className="text-purple-500 underline underline-offset-2 hover:brightness-90 transition-all"
            href="/home"
          >
            Add now
          </Link>
        </div>
      ) : (
        <div className="flex flex-col ">
          {cartFormatted.map((product) => {
            return (
              <div
                key={product.title}
                className="flex items-start justify-between border-b border-gray-200 py-[24px]"
              >
                <CoffeeCardCart
                  imageUrl={product.imageUrl}
                  title={product.title}
                  quantity={product.quantity}
                  subTotal={product.subTotal}
                  handleProductIncrement={() => handleProductIncrement(product)}
                  handleProductDecrement={() => handleProductDecrement(product)}
                  handleRemoveProduct={() => handleRemoveProduct(product.id)}
                />
              </div>
            );
          })}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-[24px] flex flex-col gap-[12px]">
          <div className="flex items-center font-roboto font-normal text-[14px] text-gray-300 justify-between">
            <span>Total items</span>
            <span>{total}</span>
          </div>

          <div className="flex items-center font-roboto font-normal text-[14px] text-gray-300 justify-between">
            <span>Delivery</span>
            <span>{sumFree}</span>
          </div>
          <div className="flex items-center justify-between text-[20px] font-bold text-brow-400">
            <span>Total</span>
            <span>{totalSumFrete}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedCoffeesCart;
