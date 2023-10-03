import { Product } from "../Entities/Products";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findByName(name: string): Promise<Product | undefined>;
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}
