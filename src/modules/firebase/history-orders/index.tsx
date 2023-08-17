import React from "react";

import { useOrderHistory } from "./hooks/useOrderHistory";

import AccordionUI from "./components/AccordionUI";

type Props = {};

export const HistoryOrders = ({ ...props }: Props) => {
  const {} = props;
  const { userOrders, load } = useOrderHistory();
  const [openOrderId, setOpenOrderId] = React.useState<string | null>(null);

  console.log(load ? "loading" : "not load");

  console.log(userOrders);

  return (
    <>
      {load ? (
        <h1>LOAD</h1>
      ) : (
        <>
          {userOrders.map((order) => (
            <AccordionUI
              key={order.id}
              orderId={order.id}
              header={order.createdAt}
              isOpen={openOrderId === order.id}
              setOpenOrderId={setOpenOrderId}
            />
          ))}
        </>
      )}
    </>
  );
};
