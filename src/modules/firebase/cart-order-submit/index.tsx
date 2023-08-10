import React from "react";

import UiButtonCart from "./components/UiButtonCart";

import { handleFormSubmit } from "./helpers/CartHandleOrderSubmit";

import { IAddress } from "@/src/models/address";
import { ICoffeCard } from "@/src/models/coffee-card";

type Props = {
  cart: ICoffeCard[];
  itemPrice: string;
  sumDelivery: string;
  totalSumWithDelivery: string;
  addressValidation: IAddress;

  checkForEmptyFields: (fields: any) => boolean;
};

export const CartOrderSubmit = ({ ...props }: Props) => {
  const {
    cart,
    addressValidation,
    itemPrice,
    sumDelivery,
    totalSumWithDelivery,
    checkForEmptyFields,
  } = props;

  return (
    <UiButtonCart
      cart={cart}
      itemPrice={itemPrice}
      sumDelivery={sumDelivery}
      totalSumWithDelivery={totalSumWithDelivery}
      addressValidation={addressValidation}
      checkForEmptyFields={checkForEmptyFields}
      handleFormSubmit={handleFormSubmit}
    />
  );
};
