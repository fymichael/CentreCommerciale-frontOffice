import { Product } from "./product.model";

export interface Order {
  _id?: string;
  reference: string;
  user_id: string;
  product_id: Product;
  unit_price: number;
  quantity: number;
  specifications?: string;
  state: number;
}