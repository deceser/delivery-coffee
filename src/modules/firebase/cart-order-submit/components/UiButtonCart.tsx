import React from "react";

import { ICoffeCard } from "@/src/models/coffee-card";
import { IAddress } from "@/src/models/address";

type Props = {
  cart: ICoffeCard[];
  itemPrice: string;
  sumDelivery: string;
  totalSumWithDelivery: string;
  addressValidation: IAddress;

  checkForEmptyFields: (fields: any) => boolean;

  handleFormSubmit: (formData: {
    cart: ICoffeCard[];
    addressValidation: IAddress;
    itemPrice: string;
    sumDelivery: string;
    totalSumWithDelivery: string;
    checkForEmptyFields: (fields: any) => boolean;
  }) => Promise<void>;
};

const UiButtonCart = ({ ...props }: Props) => {
  const {
    cart,
    addressValidation,
    itemPrice,
    sumDelivery,
    totalSumWithDelivery,
    checkForEmptyFields,
    handleFormSubmit,
  } = props;

  const formData = {
    cart,
    addressValidation,
    itemPrice,
    sumDelivery,
    totalSumWithDelivery,
    checkForEmptyFields,
  };

  return (
    <button
      className="mt-[24px] bg-yellow-500 text-white w-full py-[12px] uppercase text-[14px] rounded-[6px] font-roboto font-normal hover:brightness-90 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:brightness-100"
      type="button"
      onClick={() => handleFormSubmit(formData)}
    >
      Confirm order
    </button>
  );
};

export default UiButtonCart;
