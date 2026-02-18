export interface Product {
  _id?: string;
  code: string;
  name: string;
  description: string;
  unit_price: number;
  discount_rate: number;
  shop_id: string;
  category_id: string;
  image: string;
}