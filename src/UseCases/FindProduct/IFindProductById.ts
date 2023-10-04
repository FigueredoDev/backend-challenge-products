import { Product } from "../../Domain/Entities/Products";

export interface IFindProductById {
  execute(id: string): Promise<Product>;
}
