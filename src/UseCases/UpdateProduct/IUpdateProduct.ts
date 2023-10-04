import { Product } from "../../Domain/Entities/Products";
import { UpdateProductDto } from "../dto/UpdateProductDto";

export interface IUpdateProduct {
  execute(id: string, updatedFields: UpdateProductDto): Promise<Product>;
}
