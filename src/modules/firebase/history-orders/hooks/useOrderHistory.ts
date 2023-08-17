import React from "react";
import { format } from "date-fns";

import { auth, db } from "@/src/modules/firebase/config";

import { IUser } from "@/src/models/user";
import { IOrderUser } from "@/src/models/order-user";

export const useOrderHistory = () => {
  const [load, setLoad] = React.useState<boolean>(true);
  const [userOrders, setUserOrders] = React.useState<IOrderUser[]>([]);
  const [currentUser, setCurrentUser] = React.useState<IUser | null>(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userForState: IUser = {
          uid: user.uid,
          displayName: user.displayName || undefined,
          email: user.email || undefined,
          photoURL: user.photoURL || undefined,
        };

        setCurrentUser(userForState);
        setLoad(true);

        const userRef = db.collection("users").doc(user.uid);
        const ordersRef = userRef.collection("orders_users");

        ordersRef.get().then((querySnapshot) => {
          const orders: IOrderUser[] = [];
          querySnapshot.forEach((doc) => {
            const orderData = doc.data() as IOrderUser;

            const formattedDate = format(
              new Date(
                orderData.createdAt.seconds * 1000 + orderData.createdAt.nanoseconds / 1000000,
              ),
              "MMMM d, yyyy 'at' h:mm:ss a",
            );

            orders.push({
              ...orderData,
              id: doc.id,
              createdAt: formattedDate,
            });
          });
          setUserOrders(orders);
          setLoad(false);
        });
      } else {
        setCurrentUser(null);
        setUserOrders([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return { userOrders, currentUser, load };
};
