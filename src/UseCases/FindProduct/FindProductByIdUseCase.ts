import { FindProductByIdInterface } from "./FindProductByIdInterface";
import { Product } from "../../entities/Products";
import { BusinessError } from "../../errors/BusinessError";
import { ProductRepositoryInterface } from "../../repositories/ProductRepositoryInterface";

export class FindProductByIdUseCase implements FindProductByIdInterface {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new BusinessError("Product not found");
    }

    return product;
  }
}
