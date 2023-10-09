import { Product } from "../../entities/Products";
import { CreateProductDto } from "../DTO/CreateProductDto";

export interface CreateProductUseCaseInterface {
  execute(request: CreateProductDto): Promise<Product>;
}
