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

import { auth, db } from "@/src/modules/firebase-auth/config";
import firebase from "firebase/compat/app";

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

  const itemPrice = formatPrice(
    cart.reduce((sumTotal, product) => {
      sumTotal += product.price * product.quantity;

      return sumTotal;
    }, 0),
  );

  const totalSumDelivery = formatPrice(
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

  // TODO :: Create a separate module
  // TODO :: Change your order details
  // TODO :: Create collections All Orders

  const handleFormSubmit = async () => {
    const isEmpty = checkForEmptyFields(addressValidation);
    if (isEmpty) {
      toast.error("All fields must be filled");
      return;
    }

    try {
      if (auth.currentUser) {
        // User is authenticated, save the order in user's collection
        await db.collection("users").doc(auth.currentUser?.uid).collection("orders_users").add({
          firstName: addressValidation.firstName,
          secondName: addressValidation.secondName,
          mobileNumber: addressValidation.mobileNumber,
          city: addressValidation.city,
          postCode: addressValidation.postCode,
          fullAddress: addressValidation.fullAddress,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          totalSumDelivery: totalSumDelivery,
        });
      } else {
        // User is not authenticated, save the order in a general collection
        await db.collection("orders").add({
          firstName: addressValidation.firstName,
          secondName: addressValidation.secondName,
          mobileNumber: addressValidation.mobileNumber,
          city: addressValidation.city,
          postCode: addressValidation.postCode,
          fullAddress: addressValidation.fullAddress,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          totalSumDelivery: totalSumDelivery,
        });
      }

      toast.success("Order has been placed successfully");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order");
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
          itemPrice={itemPrice}
          sumDelivery={sumDelivery}
          cartFormatted={cartFormatted}
          totalSumDelivery={totalSumDelivery}
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
