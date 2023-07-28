import { CartContext } from "@/src/context/ProvideContext";
import { useContext } from "react";

export function useCart() {
  const value = useContext(CartContext);

  return value;
}
