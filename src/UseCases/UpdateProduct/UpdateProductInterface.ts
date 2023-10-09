import { Product } from "../../entities/Products";
import { UpdateProductDto } from "../DTO/UpdateProductDto";

export interface UpdateProductUseCaseInterface {
  execute(id: string, updatedFields: UpdateProductDto): Promise<Product>;
}
