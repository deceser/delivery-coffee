"use client";

import React from "react";
import Image from "next/image";

import { Coffee, Package, ShoppingCart, Timer } from "phosphor-react";

import { useCart } from "@/src/hooks/useCart";
import CoffeeCard from "@/src/components/block/CoffeeCard";

type Props = {};

const HomePage: React.FC = ({ ...props }: Props) => {
  const {} = props;
  const { products, load } = useCart();

  return (
    <>
      <section className="mt-[104px] bg-banner bg-cover bg-top bg-no-repeat w-full h-[600px] md:h-[calc(100vh-105px)]">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-8 h-full">
          <div className="flex-1 lg:mr-[56px] mt-[55px]">
            <h1 className="text-[29px] sm:text-[36px]  lg:text-[48px]  font-extrabold text-gray-800 leading-[130%]">
              Find the perfect coffee for any time of day
            </h1>
            <p className="mt-[16px] font-roboto font-normal text-[18px] sm:text-[20px] text-brow-400">
              With Coffee Delivery you get your coffee wherever you are, anytime
            </p>

            <div className="flex flex-col md:flex-row md:items-center gap-[20px] md:gap-[40px] mt-[50px] md:mt-[71px] font-roboto text-brow-300">
              <div className="flex flex-col gap-[20px]">
                <div className="flex items-center gap-[12px]">
                  <span className="p-[8px] rounded-full shrink-0 text-white bg-yellow-700">
                    <ShoppingCart size={16} weight="fill" />
                  </span>
                  <h4>Simple and secure purchase</h4>
                </div>
                <div className="flex items-center gap-[12px]">
                  <span className="p-[8px] rounded-full shrink-0 text-white bg-yellow-500">
                    <Timer size={16} weight="fill" />
                  </span>
                  <h4>Fast and tracked delivery</h4>
                </div>
              </div>

              <div className="flex flex-col gap-[20px]">
                <div className="flex items-center gap-[12px]">
                  <span className="p-[8px] rounded-full shrink-0 text-white bg-brow-300">
                    <Package size={16} weight="fill" />
                  </span>
                  <h4>Packaging keeps the coffee intact</h4>
                </div>

                <div className="flex items-center gap-[12px]">
                  <span className="p-[8px] rounded-full shrink-0 text-white bg-purple-500">
                    <Coffee size={16} weight="fill" />
                  </span>
                  <h4>Coffee arrives fresh to you</h4>
                </div>
              </div>
            </div>
          </div>

          <figure className="flex-1 hidden lg:flex justify-end">
            <Image
              priority={true}
              quality={100}
              src="/svg/hero-coffee.svg"
              alt="Coffee delivery"
              width={476}
              height={360}
            />
          </figure>
        </div>
      </section>

      <section className="mb-20">
        <div className="flex flex-col  justify-between w-full max-w-7xl mx-auto px-8 h-full">
          <h1 className="text-brow-400 text-[32px]">Our coffee</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[60px] md:gap-[32px] mt-[62px]">
            {load || products.length === 0
              ? Array.from({ length: 7 }, (_, index) => (
                  <div
                    key={index}
                    className=" bg-gray-100 rounded-tl-[6px] rounded-tr-[36px] rounded-bl-[36px] rounded-br-[6px] pb-[23px] h-[400px] w-[280px]"
                  ></div>
                ))
              : products.map((product) => (
                  <CoffeeCard
                    key={product.id}
                    id={product.id}
                    imageUrl={product.imageUrl}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    priceFormatted={product.priceFormatted}
                    slug={product.slug}
                    active={product.active}
                    tags={product.tags}
                    images={product.images}
                    quantity={product.quantity}
                    subTotal={""}
                  />
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
