"use client";

import React from "react";

import { useCart } from "@/src/hooks/useCart";
import { formatPrice } from "@/src/helpers/farmatPrice";

import { useValidation } from "@/src/hooks/useValidation";
import { useInput } from "@/src/hooks/useInput";
import { IAddress } from "@/src/models/address";

import { ICoffeCard } from "@/src/models/coffee-card";

import { CartOrderSubmit } from "@/src/modules/firebase/cart-order-submit";

import Payment from "@/src/components/block/Payment";
import PersonalData from "@/src/components/block/PersonalData";
import DeliveryAddress from "@/src/components/block/DeliveryAddress";
import SelectedCoffeesCart from "@/src/components/block/SelectedCoffeesCart";

type Props = {};

const Cart = ({ ...props }: Props) => {
  const { cart, free, updateProductAmount, removeProduct, addressValidation, checkForEmptyFields } =
    useCart();
  // const { checkForEmptyFields, addressValidation, handleOnChange } = useValidation();
  // const initialAddress: IAddress = {
  //   firstName: "",
  //   secondName: "",
  //   mobileNumber: "",
  //   city: "",
  //   postCode: "",
  //   fullAddress: "",
  // };
  // const { values } = useInput(initialAddress);

  // console.log(values);

  // TODO :: will need fix bug useValidation
  // console.log(addressValidation);

  const cartFormatted = cart.map((product) => {
    return {
      ...product,
      priceFormatted: formatPrice(product.price),
      subTotal: formatPrice(product.price * product.quantity),
    };
  });

  const itemPrice = formatPrice(
    cart.reduce((sumTotal, product) => {
      sumTotal += product.price * product.quantity;

      return sumTotal;
    }, 0),
  );

  const totalSumWithDelivery = formatPrice(
    cart.reduce((sumTotal, product) => {
      sumTotal += product.price * product.quantity;

      return sumTotal;
    }, 0) + free,
  );

  const sumDelivery = formatPrice(free);

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
          itemPrice={itemPrice}
          sumDelivery={sumDelivery}
          cartFormatted={cartFormatted}
          totalSumWithDelivery={totalSumWithDelivery}
        />

        <CartOrderSubmit
          cart={cart}
          itemPrice={itemPrice}
          sumDelivery={sumDelivery}
          totalSumWithDelivery={totalSumWithDelivery}
          addressValidation={addressValidation}
          checkForEmptyFields={checkForEmptyFields}
        />
      </div>
    </section>
  );
};

export default Cart;
