import { Product } from "../../Domain/Entities/Products";
import { CreateProductDto } from "../dto/CreateProductDto";

export interface ICreateProductUseCase {
  execute(request: CreateProductDto): Promise<Product>;
}
