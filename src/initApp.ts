import { CreateProductController } from "./Controllers/CreateProductController";
import { CreateProductUseCase } from "./UseCases/CreateProduct/CreateProductsUseCase";
import { PostgresProductRepository } from "./infrastructure/Database/Implementations/PostgresProductRepository";

function buildCreateProductController(): CreateProductController {
  const postgresProductRepository = new PostgresProductRepository();
  const createProductUseCase = new CreateProductUseCase(postgresProductRepository);
  return new CreateProductController(createProductUseCase);
}

export const createProductController = buildCreateProductController();
