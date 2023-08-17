import React from "react";
import { Metadata } from "next";

import Cart from "./index";

export const metadata: Metadata = {
  title: "Coffee Delivery | Cart",
  description: "Coffee Delivery",
};

type Props = {};

const CartPage = ({ ...props }: Props) => {
  const {} = props;
  return <Cart />;
};

export default CartPage;
