import { IProductRepository } from "../../Domain/Repositories/IProductRepository";
import { BusinessError } from "../../errors/BusinessError";

export class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new BusinessError("Product not found");
    }

    await this.productRepository.delete(id);
  }
}
