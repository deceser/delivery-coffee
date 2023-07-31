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
import InputUi from "@/src/components/InputUi";
import InputRadioUI from "@/src/components/InputRadioUI";

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
    <section className="w-full relative max-w-7xl mx-auto px-8 mt-[104px] min-h-[calc(100vh-104px)] flex flex-col md:flex-row gap-[32px] items-start justify-between py-[72px]">
      <div className="flex-1">
        <h1 className="text-brow-400 text-[18px] font-bold">Complete your order</h1>

        <div className="bg-gray-100 p-[40px] mt-[15px] rounded-[6px]">
          <div className="flex items-start gap-[8px]">
            <MapPinLine size={22} className="text-yellow-700" />
            <div className="flex flex-col items-start font-roboto">
              <h1 className="text-[16px] text-brow-300">Personal data</h1>
            </div>
          </div>

          {/*There should be Google authorization*/}
        </div>

        <div className="bg-gray-100 p-[40px] mt-[15px] rounded-[6px]">
          <div className="flex items-start gap-[8px]">
            <MapPinLine size={22} className="text-yellow-700" />
            <div className="flex flex-col items-start font-roboto">
              <h1 className="text-[16px] text-brow-300">Delivery address</h1>
              <p className="text-[14px] text-brow-300">
                Enter the address where you want to receive your order
              </p>
            </div>
          </div>

          <form className="mt-[32px] font-roboto text-gray-300 flex flex-col gap-[16px]">
            <div className="flex items-center gap-[16px]">
              <InputUi placeholder="City" />
              <InputUi placeholder="Post code" />
            </div>
            <InputUi placeholder="Full Address" />
          </form>
        </div>

        <div className="bg-gray-100 p-[40px] mt-[15px] rounded-[6px]">
          <div className="flex items-start gap-[8px]">
            <CurrencyDollar size={22} className="text-purple-500" />
            <div className="flex flex-col items-start font-roboto">
              <h1 className="text-[16px] text-brow-300">Payment</h1>
              <p className="text-[14px] text-brow-300">
                Payment is made on delivery. Choose the way you want to pay
              </p>
            </div>
          </div>

          <div className="mt-[48px] grid grid-cols-1 md:grid-cols-3 gap-[12px]">
            <InputRadioUI
              label="Credit card"
              htmlfor="creditCard"
              id="creditCard"
              value="creditCard"
              name="pay_method"
              image={<CreditCard size={16} className="text-purple-500" />}
            />

            <InputRadioUI
              label="Debit card"
              htmlfor="debitCard"
              id="debitCard"
              value="debitCard"
              name="pay_method"
              image={<Bank size={16} className="text-purple-500" />}
            />

            <InputRadioUI
              label="Money"
              htmlfor="money"
              id="money"
              value="money"
              name="pay_method"
              image={<Money size={16} className="text-purple-500" />}
            />
          </div>
        </div>
      </div>
      <div className="w-full md:w-[448px] sticky top-[176px]">
        <h1 className="text-brow-400 text-[18px] font-bold">Selected coffees</h1>

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

          <button
            className="mt-[24px] bg-yellow-500 text-white w-full py-[12px] uppercase text-[14px] rounded-[6px] font-roboto font-normal hover:brightness-90 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:brightness-100"
            type="button"
            disabled={cart.length <= 0}
          >
            Confirm order
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
