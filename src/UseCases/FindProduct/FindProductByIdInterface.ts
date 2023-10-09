import { Product } from "../../entities/Products";

export interface FindProductByIdInterface {
  execute(id: string): Promise<Product>;
}
