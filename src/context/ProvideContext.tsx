"use client";

import React from "react";
import { toast } from "react-toastify";

import { api } from "@/src/lib/axios";
import { formatPrice } from "@/src/helpers/farmatPrice";

import { ICoffeCard } from "@/src/models/coffee-card";
import { IAddress } from "../models/address";
interface CartContextData {
  free: number;
  load: boolean;
  cart: ICoffeCard[];
  products: ICoffeCard[];
  addressValidation: IAddress;

  handleAddNewProductInCart: (product: ICoffeCard) => void;
  updateProductAmount: ({ productId, amount }: { productId: string; amount: number }) => void;
  removeProduct: (productId: string) => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkForEmptyFields: (address: IAddress) => boolean;
  setAddressValidation: React.Dispatch<React.SetStateAction<IAddress>>;
}

export const CartContext = React.createContext({} as CartContextData);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = React.useState<ICoffeCard[]>([]);
  const [free, setFree] = React.useState<number>(7.8);
  const [products, setProducts] = React.useState<ICoffeCard[]>([]);
  const [load, setLoad] = React.useState<boolean>(false);
  const [addressValidation, setAddressValidation] = React.useState<IAddress>({
    firstName: "",
    secondName: "",
    mobileNumber: "",
    city: "",
    postCode: "",
    fullAddress: "",
  });

  const handleAddNewProductInCart = (product: ICoffeCard) => {
    const findProduct = cart.find((p) => p.id === product.id);

    if (findProduct) {
      const sumQuantity = findProduct.quantity + product.quantity;
      updateProductAmount({ productId: findProduct.id, amount: sumQuantity });
      toast.success(`This product was already in your cart, we updated the quantity!`);
      return;
    }

    setCart([...cart, product]);
    localStorage.setItem("@CoffeeDelivery:cart", JSON.stringify([...cart, product]));

    toast.success(`Product added to cart!`);
  };

  const updateProductAmount = ({ productId, amount }: { productId: string; amount: number }) => {
    const productExists = cart.some((cartProduct) => cartProduct.id === productId);

    if (!productExists) {
      toast.error("Error in changing product quantity");
      return;
    }

    const updatedCart = cart.map((cartItem) =>
      cartItem.id === productId
        ? {
            ...cartItem,
            quantity: amount,
          }
        : cartItem,
    );

    setCart(updatedCart);
    localStorage.setItem("@CoffeeDelivery:cart", JSON.stringify(updatedCart));
  };

  const removeProduct = (productId: string) => {
    const productExists = cart.some((cartProduct) => cartProduct.id === productId);

    if (!productExists) {
      toast.error("Error in changing product quantity");
      return;
    }

    const updatedCart = cart.filter((cartItem) => cartItem.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("@CoffeeDelivery:cart", JSON.stringify(updatedCart));
  };

  React.useEffect(() => {
    const storagedCart = localStorage.getItem("@CoffeeDelivery:cart");

    if (storagedCart) {
      setCart(JSON.parse(storagedCart));
    } else {
      setCart([]);
    }
  }, []);

  // ---- validation order ----

  const isNullOrWhitespace = (value: string | undefined): boolean => {
    return value === undefined || value.trim() === "";
  };

  const checkForEmptyFields = (address: IAddress) => {
    for (const key in address) {
      if (address.hasOwnProperty(key)) {
        const fieldValue = address[key as keyof IAddress];
        if (isNullOrWhitespace(fieldValue) && key !== "secondName") {
          return true; // If at least one non-empty field (except secondName) is empty, return true
        }
      }
    }

    return false; // All fields are filled
  };

  // ...

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name; // Get the field name
    const newValue: string = e.target.value;
    setAddressValidation((prevAddress) => ({
      ...prevAddress,
      [field]: newValue, // Update the corresponding field
    }));
  };

  // -----

  // ----- get -----

  const getProducts = () => {
    setLoad(true);
    api
      .get("/products")
      .then((response) => {
        const productsFormated = response.data.map((product: ICoffeCard) => {
          return { ...product, priceFormatted: formatPrice(product.price) };
        });
        setProducts(productsFormated);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoad(false);
      });
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        free,
        handleAddNewProductInCart,
        updateProductAmount,
        removeProduct,
        products,
        load,
        addressValidation,
        handleOnChange,
        checkForEmptyFields,
        setAddressValidation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
