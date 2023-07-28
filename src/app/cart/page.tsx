"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { Bank, CreditCard, CurrencyDollar, MapPinLine, Money } from "phosphor-react";

import { ICoffeCard } from "@/src/models/coffee-card";
import { useCart } from "@/src/hooks/useCart";
import { formatPrice } from "@/src/helpers/farmatPrice";
import CoffeeCardCart from "@/src/components/CoffeeCardCart";

type Props = {};

const Cart = (props: Props) => {
  const { cart, free, updateProductAmount, removeProduct } = useCart();

  const cartFormatted = cart.map((product) => {
    return {
      ...product,
      priceFormatted: formatPrice(product.price),
      subTotal: formatPrice(product.price * product.quantity),
    };
  });

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      sumTotal += product.price * product.quantity;

      return sumTotal;
    }, 0),
  );

  const totalSumFrete = formatPrice(
    cart.reduce((sumTotal, product) => {
      sumTotal += product.price * product.quantity;

      return sumTotal;
    }, 0) + free,
  );

  const sumFree = formatPrice(free);

  const handleProductIncrement = (product: ICoffeCard) => {
    const incrementArguments = {
      productId: product.id,
      amount: product.quantity + 1,
    };

    updateProductAmount(incrementArguments);
  };

  const handleProductDecrement = (product: ICoffeCard) => {
    if (product.quantity < 2) {
      removeProduct(product.id);
      return;
    }

    const decrementArguments = {
      productId: product.id,
      amount: product.quantity - 1,
    };

    updateProductAmount(decrementArguments);
  };

  const handleRemoveProduct = (productId: string) => {
    removeProduct(productId);
  };

  return (
    <div className="w-full md:w-[448px] sticky top-[176px]">
      <h1 className="text-brow-400 text-[18px] font-bold">Selected coffees</h1>

      <div className="bg-gray-100 p-[40px] mt-[15px] rounded-tl-[6px]  rounded-tr-[44px] rounded-br-[6px] rounded-bl-[44px]">
        {cart.length === 0 ? (
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
          <>
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
          </>
        )}

        <button
          className="mt-[24px] bg-yellow-500 text-white w-full py-[12px] uppercase text-[14px] rounded-[6px] font-roboto font-normal hover:brightness-90 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:brightness-100"
          type="button"
          disabled={cart.length <= 0}
        >
          Confirm order
        </button>
      </div>
    </div>
  );
};

export default Cart;
