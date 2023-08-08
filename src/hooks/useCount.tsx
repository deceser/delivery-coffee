import React from "react";
import { toast } from "react-toastify";

export const useCount = (initialValue: number) => {
  const [count, setCount] = React.useState<number>(initialValue);

  const handleIncrementProduct = () => {
    setCount(count + 1);
  };

  const handleDecrementProduct = () => {
    if (count < 2) {
      return toast.warning("To add to cart you need at least one quantity!");
    }

    setCount(count - 1);
  };

  return {
    count,
    setCount,
    handleDecrementProduct,
    handleIncrementProduct,
  };
};
