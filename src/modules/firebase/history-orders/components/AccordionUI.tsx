import React from "react";
import Image from "next/image";

import { ICoffeCard } from "@/src/models/coffee-card";

type Props = {
  isOpen: boolean;
  setOpenOrderId: React.Dispatch<React.SetStateAction<string | null>>;

  header: string;
  orderId: string;
  totalSumWithDelivery: string;
  sumDelivery: string;
  totalItems: string;
  fullAddress: string;
  city: string;
  cartItems: ICoffeCard[];
};

const AccordionUI = ({ ...props }: Props) => {
  const {
    isOpen,
    setOpenOrderId,
    header,
    orderId,
    totalSumWithDelivery,
    sumDelivery,
    totalItems,
    fullAddress,
    city,
    cartItems,
  } = props;
  return (
    <div className="w-full mt-[10px]">
      <div
        onClick={() => setOpenOrderId(isOpen ? null : orderId)}
        className="flex justify-between p-5 border text-3xl text-gray-500 select-none rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <span>{header}</span>
        <span> {isOpen ? "▽" : "△"} </span>
      </div>

      {isOpen && (
        <div className="flex-col mt-2 p-5 border text-2xl text-gray-400 rounded-lg leading-relaxed">
          <div className="flex-col items-center">
            {cartItems.map((item) => (
              <div className="flex mb-2 justify-between items-center" key={item.id}>
                <div className="flex gap-5">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={50}
                    height={50}
                    priority
                    quality={100}
                  />

                  <span>
                    <strong>{item.title}</strong>
                  </span>
                </div>
                <div className="flex gap-5">
                  <span className="w-10 flex justify-center items-center">
                    <strong>{item.quantity}</strong>
                  </span>

                  <span className="w-10 flex justify-center items-center">
                    <strong>{item.priceFormatted}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <hr className="mt-3 mb-3" />

          <div className="flex-col gap-2">
            <div className="flex gap-5">
              <span>
                City: <strong>{city}</strong>
              </span>
              <span>
                Address: <strong>{fullAddress}</strong>
              </span>
            </div>
            <div className="flex gap-5">
              <span>
                Total items: <strong>{totalItems}</strong>
              </span>
              <span>
                Delivery: <strong>{sumDelivery}</strong>
              </span>
              <span>
                Total price: <strong>{totalSumWithDelivery}</strong>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionUI;
