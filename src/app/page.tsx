import React from "react";
import { Metadata } from "next";

import HomePage from "./home/page";

export const metadata: Metadata = {
  title: "Coffee Delivery | Home",
  description: "Coffee Delivery",
};

type Props = {};

const page = ({ ...Props }: Props) => {
  return <HomePage />;
};

export default page;
