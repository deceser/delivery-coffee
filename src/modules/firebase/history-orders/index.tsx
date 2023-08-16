import React from "react";

import { useOrderHistory } from "./hooks/useOrderHistory";

import AccordionUI from "./components/AccordionUI";

type Props = {};

export const HistoryOrders = ({ ...props }: Props) => {
  const {} = props;
  const { userOrders } = useOrderHistory();
  const [showOrderId, setShowOrderId] = React.useState<boolean>(false);

  console.log(userOrders);

  return <AccordionUI showOrderId={showOrderId} setShowOrderId={setShowOrderId} />;
};
