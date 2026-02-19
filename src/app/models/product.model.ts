import { category } from "./category.model";
import { shop } from "./shop.model";

export interface Product {
  _id?: string;
  code: string;
  name: string;
  description: string;
  unit_price: number;
  discount_rate: number;
  shop_id: shop;
  category_id: category;
  image: string;
}