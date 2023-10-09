import { UpdateProductDto } from "../UseCases/DTO/UpdateProductDto";
import { Product } from "../entities/Products";

export interface ProductRepositoryInterface {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  create(product: Product): Promise<Product>;
  update(id: string, product: UpdateProductDto): Promise<Product>;
  delete(id: string): Promise<void>;
}
