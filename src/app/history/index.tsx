"use client";

import React from "react";

import { HistoryOrders } from "@/src/modules/firebase/history-orders";

type Props = {};

const HistoryOrder = ({ ...props }: Props) => {
  const {} = props;
  return (
    <>
      <section className="mt-[104px] ">
        <div className="flex justify-between w-full max-w-7xl mx-auto px-8 h-full">
          <div className="flex-1 lg:mr-[56px] mt-[55px]">
            <h1 className="text-[29px] sm:text-[36px]  lg:text-[48px]  font-extrabold text-gray-800 leading-[130%]">
              History of orders
            </h1>
            <p className="mt-[16px] font-roboto font-normal text-[18px] sm:text-[20px] text-brow-400">
              With Coffee Delivery you get your coffee wherever you are, anytime
            </p>
          </div>
        </div>
      </section>

      <section className="mt-[50px] flex justify-between w-full max-w-7xl mx-auto px-8 h-full ">
        <HistoryOrders />
      </section>
    </>
  );
};

export default HistoryOrder;
