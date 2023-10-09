import { Product } from "../../entities/Products";
import { ProductRepositoryInterface } from "../../repositories/ProductRepositoryInterface";
import { ListProductsUseCaseInterface } from "./ListProductsInterface";

export class ListProductsUseCase implements ListProductsUseCaseInterface {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(): Promise<Product[]> {
    const products = await this.productRepository.findAll();
    return products;
  }
}
