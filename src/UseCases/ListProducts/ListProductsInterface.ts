import { Product } from "../../entities/Products";

export interface ListProductsUseCaseInterface {
  execute(): Promise<Product[]>;
}
