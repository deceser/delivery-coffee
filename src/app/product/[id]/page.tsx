import React from "react";
import { Metadata } from "next";

import Product from "..";
import { api } from "@/src/lib/axios";
import { ICoffeCard } from "@/src/models/coffee-card";
import { formatPrice } from "@/src/helpers/farmatPrice";

type Props = {
  params: {
    id: string;
  };
};

const getProduct = async (id: string) => {
  try {
    const response = await api.get(`products/${id}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const generateMetadata = async ({ params: { id } }: Props): Promise<Metadata> => {
  const product = await getProduct(id);

  return {
    title: product.title, // dynamic SEO optimization, this is the name of the post
  };
};

const ProductPage = async ({ params: { id } }: Props) => {
  // const id = params.id;
  const product: ICoffeCard = await getProduct(id);

  const priceFormatted = formatPrice(product.price);

  return (
    <Product
      id={product.id}
      imageUrl={product.imageUrl}
      tags={product.tags}
      title={product.title}
      description={product.description}
      price={product.price}
      active={product.active}
      slug={product.slug}
      priceFormatted={priceFormatted}
      images={product.images}
    />
  );
};

export default ProductPage;
