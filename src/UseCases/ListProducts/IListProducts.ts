import { Product } from "../../Domain/Entities/Products";

export interface IListProducts {
  execute(): Promise<Product[]>;
}
