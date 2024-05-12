import { AxiosResponse } from "axios";

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  SKU: string;
  grams: number;
  stock: number;
  price: number;
  comparePrice: number;
  barcode: string;
}

export interface ProductData {
  product: Product[];
  loading: boolean;
  getProduct: () => Promise<void | AxiosResponse<any, any>>;
}
