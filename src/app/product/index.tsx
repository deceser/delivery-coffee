"use client";

import React from "react";

import { useCart } from "@/src/hooks/useCart";

import { ArrowRight, Minus, Phone, Plus, ShareNetwork, ShoppingCartSimple } from "phosphor-react";
import { toast } from "react-toastify";
import { formatPrice } from "@/src/helpers/farmatPrice";

type Props = {
  id: string;
  imageUrl: string;
  tags: string[];
  title: string;
  description: string;
  price: number;
  active: boolean;
  slug: string;
  priceFormatted: string;
  images: string[];
};

const Product = ({ ...props }: Props) => {
  const { id, imageUrl, tags, title, description, price, priceFormatted, slug, images, active } =
    props;

  const { handleAddNewProductInCart } = useCart();
  const [count, setCount] = React.useState(1);

  const handleIncrementProduct = () => {
    setCount(count + 1);
  };

  const handleDecrementProduct = () => {
    if (count < 2) {
      return toast.warning("To add to cart you need at least one quantity!");
    }

    setCount(count - 1);
  };

  const handleCreateNewProductInCart = (product: any) => {
    handleAddNewProductInCart(product);
    setCount(1);
  };

  const handleShareProduct = async () => {};

  return (
    <section className="bg-banner bg-cover bg-top bg-no-repeat w-full">
      <div className="w-full  relative max-w-7xl mx-auto px-8 mt-[104px] min-h-[calc(100vh-104px)] flex flex-col md:flex-row gap-[32px] items-center justify-between py-[72px] ">
        <div className="grid grid-cols-2 gap-5">
          {images.map((image) => {
            return (
              <div key={image} className="w-[250px] h-[250px] overflow-hidden rounded-[6px]">
                <img
                  className="w-full h-full object-cover hover:scale-125 transition-all duration-300"
                  src={image}
                  alt={title}
                />
              </div>
            );
          })}
        </div>

        <div className="flex-1 px-5">
          <div className="leading-[230%]">
            <h1 className="text-brow-400 text-[35px]">{title}</h1>
            <p className="text-brow-300 font-roboto font-normal text-[19px]">{description}</p>

            {tags.map((tag) => {
              return (
                <span
                  className="bg-yellow-100 select-none py-[4px] mr-[4px] px-[8px] text-yellow-700 rounded-full font-roboto font-bold uppercase text-[10px]"
                  key={tag}
                >
                  {tag}
                </span>
              );
            })}

            <div className="flex items-center gap-[15px] mt-5">
              <strong className="flex items-end leading-3 text-brow-300 text-[24px]">
                {priceFormatted}
              </strong>

              <div className="bg-purple-500 w-[72px] h-[38px]  flex items-center justify-evenly rounded-[6px] font-roboto text-white">
                <button type="button">
                  <Minus onClick={handleDecrementProduct} size={14} weight="fill" />
                </button>
                <span className="text-white select-none">{count}</span>
                <button onClick={handleIncrementProduct} type="button">
                  <Plus size={14} weight="fill" />
                </button>
              </div>
            </div>

            <div className="flex items-end gap-4">
              <button
                type="button"
                title="Clique para comprar"
                onClick={() =>
                  handleCreateNewProductInCart({
                    id: id,
                    imageUrl: imageUrl,
                    tags: tags,
                    title: title,
                    description: description,
                    price: price,
                    active: active,
                    quantity: count,
                  })
                }
                className="flex items-center gap-[15px] px-10 bg-orange-500 text-center text-white rounded-[6px] mt-10 font-roboto font-normal py-2 hover:brightness-90 transition-all"
              >
                <ShoppingCartSimple size={22} weight="fill" />
                Add to cart
              </button>

              <button
                type="button"
                onClick={() => handleShareProduct()}
                title="Clique para compartilhar página"
                className="text-white bg-purple-500 w-f px-2 py-2 rounded-full w-[50px] h-[50px] flex items-center justify-center hover:brightness-90 transition-all"
              >
                <ShareNetwork size={22} />
              </button>
            </div>

            <div className="flex flex-col mt-10 leading-5 text-sm text-brow-300 font-roboto font-bold">
              <span className="flex items-center gap-2">
                <ArrowRight size={16} />
                5% discount on the purchase of 10 coffees
              </span>
              <span className="flex items-center gap-2">
                <ArrowRight size={16} />
                10% discount on the purchase of 15 coffees
              </span>
            </div>

            <div className="border-t border-gray-200 mt-10 leading-none pt-5 flex items-center gap-4 text-brow-400 font-bold text-md">
              <div className="bg-purple-500 w-10 h-10 flex items-center justify-center text-white rounded-full shrink-0">
                <Phone size={20} />
              </div>
              If you have any questions, please contact us using the Whatsapp icon on the side or
              call for us.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
