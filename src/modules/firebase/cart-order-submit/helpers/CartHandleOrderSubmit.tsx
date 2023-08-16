import { toast } from "react-toastify";
import firebase from "firebase/compat/app";
import { auth, db } from "@/src/modules/firebase/config";

import { IAddress } from "@/src/models/address";
import { ICoffeCard } from "@/src/models/coffee-card";

type FormData = {
  cart: ICoffeCard[];
  addressValidation: IAddress;
  itemPrice: string;
  sumDelivery: string;
  totalSumWithDelivery: string;
  checkForEmptyFields: (fields: any) => boolean;
  removeAllProductCart: () => void;
};

export const handleFormSubmit = async (formData: FormData) => {
  const {
    cart,
    addressValidation,
    itemPrice,
    sumDelivery,
    totalSumWithDelivery,
    checkForEmptyFields,
    removeAllProductCart,
  } = formData;

  const isEmpty = checkForEmptyFields(addressValidation);

  if (isEmpty) {
    toast.error("All fields must be filled");
    return;
  }

  if (cart.length <= 0) {
    toast.error("Cart cannot be empty");
    return;
  }

  try {
    const orderData = {
      firstName: addressValidation.firstName,
      secondName: addressValidation.secondName,
      mobileNumber: addressValidation.mobileNumber,
      city: addressValidation.city,
      postCode: addressValidation.postCode,
      fullAddress: addressValidation.fullAddress,

      cart: cart,

      itemPrice: itemPrice,
      sumDelivery: sumDelivery,
      totalSumWithDelivery: totalSumWithDelivery,

      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    // User is authenticated, save the order in user's collection
    if (auth.currentUser) {
      await db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("orders_users")
        .add(orderData);

      // Additionally, save the order in the general collection
      await db.collection("orders_all").add(orderData);
    }

    // User is not authenticated, save the order in a general collection
    if (!auth.currentUser) {
      await db.collection("orders_all").add(orderData);
    }

    removeAllProductCart();
    toast.success("Order has been placed successfully");
  } catch (error) {
    console.error("Error placing order:", error);
    toast.error("Error placing order");
  }
};
