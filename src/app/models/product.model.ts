import { Category } from "./category.model";
import { Shop } from "./shop.model";

export interface Product {
  _id?: string;
  code: string;
  name: string;
  description: string;
  unit_price: number;
  discount_rate: number;
  shop_id: Shop;
  category_id: Category;
  image: string;
}