import React from "react";
import { Metadata } from "next";

import HistoryOrder from "./index";

export const metadata: Metadata = {
  title: "Coffee Delivery | History",
  description: "Coffee Delivery",
};

type Props = {};

const HistoryPage = ({ ...props }: Props) => {
  const {} = props;
  return <HistoryOrder />;
};

export default HistoryPage;
