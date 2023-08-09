import React from "react";
import { MapPinLine } from "phosphor-react";

import { useCart } from "@/src/hooks/useCart";

import InputUi from "../ui/InputUi";

type Props = {};

const PersonalData = ({ ...props }: Props) => {
  const { addressValidation, handleOnChange } = useCart();

  return (
    <div className="bg-gray-100 p-[40px] mt-[15px] rounded-[6px] flex-col items-center justify-between">
      <div className="flex items-start gap-[8px]">
        <MapPinLine size={22} className="text-yellow-700" />
        <div className="flex flex-col items-start font-roboto">
          <h1 className="text-[16px] text-brow-300">Personal data</h1>
          <p className="text-[14px] text-brow-300">Enter the your data</p>
        </div>
      </div>

      <form className="mt-[32px] font-roboto text-gray-300 flex flex-col gap-[16px]">
        <div className="flex items-center gap-[16px]">
          <InputUi
            name="firstName"
            placeholder="First Name"
            value={addressValidation.firstName}
            handleOnChange={handleOnChange}
          />
          <InputUi
            name="secondName"
            placeholder="Second Name (optional)"
            value={addressValidation.secondName}
            handleOnChange={handleOnChange}
          />
        </div>
        <InputUi
          name="mobileNumber"
          placeholder="Mobile number"
          value={addressValidation.mobileNumber}
          handleOnChange={handleOnChange}
          read={true}
        />
      </form>
    </div>
  );
};

export default PersonalData;
