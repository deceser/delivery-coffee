import React from "react";
import { MapPinLine } from "phosphor-react";

import InputUi from "../ui/InputUi";

type Props = {};

const DeliveryAddress = ({ ...props }: Props) => {
  return (
    <div className="bg-gray-100 p-[40px] mt-[15px] rounded-[6px]">
      <div className="flex items-start gap-[8px]">
        <MapPinLine size={22} className="text-yellow-700" />
        <div className="flex flex-col items-start font-roboto">
          <h1 className="text-[16px] text-brow-300">Delivery address</h1>
          <p className="text-[14px] text-brow-300">
            Enter the address where you want to receive your order
          </p>
        </div>
      </div>

      <form className="mt-[32px] font-roboto text-gray-300 flex flex-col gap-[16px]">
        <div className="flex items-center gap-[16px]">
          <InputUi placeholder="City" />
          <InputUi placeholder="Post code" />
        </div>
        <InputUi placeholder="Full Address" />
      </form>
    </div>
  );
};

export default DeliveryAddress;
