import { Product } from "../../Domain/Entities/Products";
import { IProductRepository } from "../../Domain/Repositories/IProductRepository";
import { IListProducts } from "./IListProducts";

export class ListProductsUseCase implements IListProducts {
  constructor(private productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    const products = await this.productRepository.findAll();
    return products;
  }
}
