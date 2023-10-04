import { IFindProductById } from "./IFindProductById";
import { Product } from "../../Domain/Entities/Products";
import { BusinessError } from "../../errors/BusinessError";
import { IProductRepository } from "../../Domain/Repositories/IProductRepository";

export class FindProductByIdUseCase implements IFindProductById {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new BusinessError("Product not found");
    }

    return product;
  }
}
