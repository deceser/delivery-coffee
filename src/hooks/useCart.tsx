import { CartContext } from "@/src/context/ProvideContext";
import { useContext } from "react";

export const useCart = () => {
  const value = useContext(CartContext);

  return value;
};
