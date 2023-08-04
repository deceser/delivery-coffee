export interface ICoffeCard {
  subTotal: string;
  id: string;
  imageUrl: string;
  tags: string[];
  title: string;
  description: string;
  price: number;
  slug: string;
  active: boolean;
  images: string[];
  quantity: number;
  priceFormatted: string;
}
