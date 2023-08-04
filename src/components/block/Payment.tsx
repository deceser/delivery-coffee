import React from "react";
import { Bank, CreditCard, CurrencyDollar, Money } from "phosphor-react";

import InputRadioUI from "../ui/InputRadioUI";

type Props = {};

const Payment = ({ ...props }: Props) => {
  return (
    <div className="bg-gray-100 p-[40px] mt-[15px] rounded-[6px]">
      <div className="flex items-start gap-[8px]">
        <CurrencyDollar size={22} className="text-purple-500" />
        <div className="flex flex-col items-start font-roboto">
          <h1 className="text-[16px] text-brow-300">Payment</h1>
          <p className="text-[14px] text-brow-300">
            Payment is made on delivery. Choose the way you want to pay
          </p>
        </div>
      </div>

      <div className="mt-[48px] grid grid-cols-1 md:grid-cols-3 gap-[12px]">
        <InputRadioUI
          label="Credit card"
          htmlfor="creditCard"
          id="creditCard"
          value="creditCard"
          name="pay_method"
          image={<CreditCard size={16} className="text-purple-500" />}
        />

        <InputRadioUI
          label="Debit card"
          htmlfor="debitCard"
          id="debitCard"
          value="debitCard"
          name="pay_method"
          image={<Bank size={16} className="text-purple-500" />}
        />

        <InputRadioUI
          label="Money"
          htmlfor="money"
          id="money"
          value="money"
          name="pay_method"
          image={<Money size={16} className="text-purple-500" />}
        />
      </div>
    </div>
  );
};

export default Payment;
