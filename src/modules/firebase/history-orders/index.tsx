import React from "react";

import { useOrderHistory } from "./hooks/useOrderHistory";

import AccordionUI from "./components/AccordionUI";

type Props = {};

export const HistoryOrders = ({ ...props }: Props) => {
  const {} = props;
  const { userOrders, load } = useOrderHistory();
  const [openOrderId, setOpenOrderId] = React.useState<string | null>(null);

  return (
    <>
      {load ? (
        <div className="m-auto h-20 w-20 animate-spin rounded-full border-8 border-t-purple-500" />
      ) : (
        <>
          {userOrders.map((order) => (
            <AccordionUI
              key={order.id}
              orderId={order.id}
              header={order.createdAt}
              totalSumWithDelivery={order.totalSumWithDelivery}
              sumDelivery={order.sumDelivery}
              fullAddress={order.fullAddress}
              city={order.city}
              cartItems={order.cart}
              totalItems={order.itemPrice}
              isOpen={openOrderId === order.id}
              setOpenOrderId={setOpenOrderId}
            />
          ))}
        </>
      )}
    </>
  );
};
