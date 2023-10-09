import { ProductRepositoryInterface } from "../../repositories/ProductRepositoryInterface";
import { BusinessError } from "../../errors/BusinessError";
import { DeleteProductUseCaseInterface } from "./DeleteProductInterface";

export class DeleteProductUseCase implements DeleteProductUseCaseInterface {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new BusinessError("Product not found");
    }

    await this.productRepository.delete(id);
  }
}
