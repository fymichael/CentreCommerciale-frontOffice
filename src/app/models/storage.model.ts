import { Product } from "./product.model";

export interface StorageModel {
    _id?: string;
    product: Product;
    quantity: number;
}