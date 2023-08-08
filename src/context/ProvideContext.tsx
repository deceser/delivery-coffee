"use client";

import React from "react";
import { toast } from "react-toastify";

import { api } from "@/src/lib/axios";
import { formatPrice } from "@/src/helpers/farmatPrice";
import { ICoffeCard } from "@/src/models/coffee-card";

interface CartContextData {
  free: number;
  load: boolean;
  cart: ICoffeCard[];
  products: ICoffeCard[];

  handleAddNewProductInCart: (product: ICoffeCard) => void;
  updateProductAmount: ({ productId, amount }: { productId: string; amount: number }) => void;
  removeProduct: (productId: string) => void;
}

export const CartContext = React.createContext({} as CartContextData);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = React.useState<ICoffeCard[]>([]);
  const [free, setFree] = React.useState<number>(7.8);
  const [products, setProducts] = React.useState<ICoffeCard[]>([]);
  const [load, setLoad] = React.useState<boolean>(false);

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
