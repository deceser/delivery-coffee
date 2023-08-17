import React from "react";
import { Metadata } from "next";

import HistoryOrder from "./index";
import PrivateRoute from "../privatRoute";

export const metadata: Metadata = {
  title: "Coffee Delivery | History",
  description: "Coffee Delivery",
};

type Props = {};

const HistoryPage = ({ ...props }: Props) => {
  const {} = props;
  return (
    <PrivateRoute>
      <HistoryOrder />
    </PrivateRoute>
  );
};

export default HistoryPage;
