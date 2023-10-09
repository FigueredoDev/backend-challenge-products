import { Product } from "../../entities/Products";

import { v4 as uuidV4 } from "uuid";
import { BusinessError } from "../../errors/BusinessError";
import { CreateProductDto } from "../DTO/CreateProductDto";
import { CreateProductUseCaseInterface } from "./CreateProductInterface";
import { validateProductDescription, validateProductPrice, validateProductStock } from "../../utils/validations";
import { ProductRepositoryInterface } from "../../repositories/ProductRepositoryInterface";

export class CreateProductUseCase implements CreateProductUseCaseInterface {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(request: CreateProductDto): Promise<Product> {
    const { name, description, price, stock } = request;

    if (!name) {
      throw new BusinessError("Product name is required.");
    }

    const existingProduct = await this.productRepository.findByName(name);

    if (existingProduct) {
      throw new BusinessError("A product with this name already exists.");
    }

    validateProductDescription(description);
    validateProductPrice(price);
    validateProductStock(stock);

    const product: Product = {
      id: uuidV4(),
      name,
      description,
      price,
      stock,
    };

    const savedProduct = await this.productRepository.create(product);

    return savedProduct;
  }
}
