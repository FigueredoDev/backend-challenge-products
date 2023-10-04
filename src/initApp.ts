import { CreateProductController } from "./Controllers/CreateProductController";
import { DeleteProductController } from "./Controllers/DeleteProductController";
import { FindProductByIdController } from "./Controllers/FindProductByIdController";
import { ListProductsController } from "./Controllers/ListProductsController";
import { IController } from "./Controllers/interfaces/IController";
import { CreateProductUseCase } from "./UseCases/CreateProduct/CreateProductsUseCase";
import { DeleteProductUseCase } from "./UseCases/DeleteProduct/DeleteProductUseCase";
import { FindProductByIdUseCase } from "./UseCases/FindProduct/FindProductByIdUseCase";
import { ListProductsUseCase } from "./UseCases/ListProducts/ListProductsUseCase";
import { PostgresProductRepository } from "./infrastructure/Database/Implementations/PostgresProductRepository";

function buildCreateProductController(): IController {
  const postgresProductRepository = new PostgresProductRepository();
  const createProductUseCase = new CreateProductUseCase(postgresProductRepository);
  return new CreateProductController(createProductUseCase);
}

function buildListProductController(): IController {
  const postgresProductRepository = new PostgresProductRepository();
  const listProductsUseCase = new ListProductsUseCase(postgresProductRepository);
  return new ListProductsController(listProductsUseCase);
}

function buildDeleteProductController(): IController {
  const postgresProductRepository = new PostgresProductRepository();
  const deleteProductUseCase = new DeleteProductUseCase(postgresProductRepository);
  return new DeleteProductController(deleteProductUseCase);
}

function buildFindProductByIdController(): IController {
  const postgresProductRepository = new PostgresProductRepository();
  const findProductByIdUseCase = new FindProductByIdUseCase(postgresProductRepository);
  return new FindProductByIdController(findProductByIdUseCase);
}

export const createProductController = buildCreateProductController();
export const listProductsController = buildListProductController();
export const deleteProductController = buildDeleteProductController();
export const findProductByIdController = buildFindProductByIdController();
