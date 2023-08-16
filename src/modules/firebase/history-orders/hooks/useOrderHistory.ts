import React from "react";
import { format } from "date-fns";

import { auth, db } from "@/src/modules/firebase/config";
import { IOrderUser } from "@/src/models/order-user";

export const useOrderHistory = () => {
  const [userOrders, setUserOrders] = React.useState<IOrderUser[]>([]);

  React.useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userRef = db.collection("users").doc(currentUser.uid);
      const ordersRef = userRef.collection("orders_users");

      ordersRef.get().then((querySnapshot) => {
        const orders: IOrderUser[] = [];
        querySnapshot.forEach((doc) => {
          const orderData = doc.data() as IOrderUser;

          // Convert timestamp to readable format
          const formattedDate = format(
            new Date(
              orderData.createdAt.seconds * 1000 + orderData.createdAt.nanoseconds / 1000000,
            ),
            "MMMM d, yyyy 'at' h:mm:ss a 'UTC'xxx",
          );

          orders.push({
            ...orderData,
            createdAt: formattedDate,
          });
        });
        setUserOrders(orders);
      });
    }
  }, []);

  return { userOrders };
};
