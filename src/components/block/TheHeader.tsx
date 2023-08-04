"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCartSimple } from "phosphor-react";

import { useCart } from "@/src/hooks/useCart";
import { LocationComponent } from "@/src/modules/location";
import { GoogleAuth } from "@/src/modules/firebase-auth";

type Props = {};

const TheHeader = (props: Props) => {
  const { cart } = useCart();

  return (
    <header className="w-full z-50 fixed left-0 top-0 bg-white  ">
      <div className="w-full max-w-7xl mx-auto px-8 h-[104px] flex items-center justify-between ">
        <Link href="/">
          <figure>
            <img
              src="/svg/logo.svg"
              alt="Logo Coffee delivery"
              className="h-[40px] object-cover shrink-0 select-none max-sm:h-[35px]"
            />
          </figure>
        </Link>

        <div className="flex items-center gap-[12px]">
          <LocationComponent />
          <GoogleAuth />
          <Link
            href="/cart"
            className=" bg-yellow-100 duration-400 origin-center  relative text-yellow-700 p-[8px] rounded-[6px] hover:brightness-90 transition-all"
          >
            <span className="absolute -right-2 -top-2 w-[20px] h-[20px] bg-yellow-700 text-white rounded-full flex items-center justify-center font-normal font-roboto text-[12px]">
              {cart?.length}
            </span>
            <ShoppingCartSimple size={22} weight="fill" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TheHeader;
