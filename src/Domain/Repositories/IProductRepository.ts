import { UpdateProductDto } from "../../UseCases/dto/UpdateProductDto";
import { Product } from "../Entities/Products";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  create(product: Product): Promise<Product>;
  update(id: string, product: UpdateProductDto): Promise<Product>;
  delete(id: string): Promise<void>;
}
