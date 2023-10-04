import { Product } from "../../Domain/Entities/Products";
import { IProductRepository } from "../../Domain/Repositories/IProductRepository";
import { BusinessError } from "../../errors/BusinessError";
import { validateProductDescription, validateProductPrice, validateProductStock } from "../../utils/validations";
import { UpdateProductDto } from "../dto/UpdateProductDto";
import { IUpdateProduct } from "./IUpdateProduct";

export class UpdateProductUseCase implements IUpdateProduct {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string, updatedFields: UpdateProductDto): Promise<Product> {
    const { name, description, price, stock } = updatedFields;

    if (!name) {
      throw new BusinessError("Product name is required.");
    }

    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new BusinessError("Product not found");
    }

    const existingProduct = await this.productRepository.findByName(name);

    if (existingProduct && existingProduct.id !== id) {
      throw new BusinessError("A product with this name already exists.");
    }

    validateProductDescription(description);
    validateProductPrice(price ?? 0);
    validateProductStock(stock ?? 0);

    const updatedProduct: Product = await this.productRepository.update(id, updatedFields);

    return updatedProduct;
  }
}
