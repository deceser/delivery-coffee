"use client";

import React from "react";

import { useCart } from "@/src/hooks/useCart";
import { ICoffeCard } from "@/src/models/coffee-card";
import { formatPrice } from "@/src/helpers/farmatPrice";

import Payment from "@/src/components/block/Payment";
import PersonalData from "@/src/components/block/PersonalData";
import DeliveryAddress from "@/src/components/block/DeliveryAddress";
import SelectedCoffeesCart from "@/src/components/block/SelectedCoffeesCart";
import { toast } from "react-toastify";

type Props = {};

const Cart = ({ ...props }: Props) => {
  const { cart, free, updateProductAmount, removeProduct, checkForEmptyFields, addressValidation } =
    useCart();

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

  const handleFormSubmit = async () => {
    const isEmpty = checkForEmptyFields(addressValidation);
    if (isEmpty) {
      toast.error("All fields must be filled");
      return;
    }

    // In the future, this will be the logic to handle the form submission

    if (!isEmpty) {
      console.log(addressValidation.firstName);
      console.log(addressValidation.secondName);
      console.log(addressValidation.mobileNumber);
      console.log(addressValidation.city);
      console.log(addressValidation.postCode);
      console.log(addressValidation.fullAddress);
    }
  };

  return (
    <section className="w-full relative max-w-7xl mx-auto px-8 mt-[104px] min-h-[calc(100vh-104px)] flex flex-col md:flex-row gap-[32px] items-start justify-between py-[72px]">
      <div className="flex-1">
        <h1 className="text-brow-400 text-[18px] font-bold">Complete your order</h1>
        <PersonalData />
        <DeliveryAddress />
        <Payment />
      </div>
      <div className="w-full md:w-[448px] sticky top-[176px]">
        <h1 className="text-brow-400 text-[18px] font-bold">Selected coffees</h1>
        <SelectedCoffeesCart
          handleRemoveProduct={handleRemoveProduct}
          handleProductIncrement={handleProductIncrement}
          handleProductDecrement={handleProductDecrement}
          cart={cart}
          total={total}
          sumFree={sumFree}
          cartFormatted={cartFormatted}
          totalSumFrete={totalSumFrete}
        />
        <button
          className="mt-[24px] bg-yellow-500 text-white w-full py-[12px] uppercase text-[14px] rounded-[6px] font-roboto font-normal hover:brightness-90 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:brightness-100"
          type="button"
          disabled={cart.length <= 0}
          onClick={handleFormSubmit}
        >
          Confirm order
        </button>
      </div>
    </section>
  );
};

export default Cart;
