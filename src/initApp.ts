import { CreateProductController } from "./controllers/CreateProductController";
import { DeleteProductController } from "./controllers/DeleteProductController";
import { FindProductByIdController } from "./controllers/FindProductByIdController";
import { ListProductsController } from "./controllers/ListProductsController";
import { UpdateProductController } from "./controllers/UpdateProductController";
import { ControllerInterface } from "./controllers/interfaces/ControllerInterface";
import { CreateProductUseCase } from "./UseCases/CreateProduct/CreateProductsUseCase";
import { DeleteProductUseCase } from "./UseCases/DeleteProduct/DeleteProductUseCase";
import { FindProductByIdUseCase } from "./UseCases/FindProduct/FindProductByIdUseCase";
import { ListProductsUseCase } from "./UseCases/ListProducts/ListProductsUseCase";
import { UpdateProductUseCase } from "./UseCases/UpdateProduct/UpdateProductUseCase";
import { PostgresProductRepository } from "./infrastructure/database/Implementations/PostgresProductRepository";

function buildCreateProductController(): ControllerInterface {
  const postgresProductRepository = new PostgresProductRepository();
  const createProductUseCase = new CreateProductUseCase(postgresProductRepository);
  return new CreateProductController(createProductUseCase);
}

function buildListProductController(): ControllerInterface {
  const postgresProductRepository = new PostgresProductRepository();
  const listProductsUseCase = new ListProductsUseCase(postgresProductRepository);
  return new ListProductsController(listProductsUseCase);
}

function buildDeleteProductController(): ControllerInterface {
  const postgresProductRepository = new PostgresProductRepository();
  const deleteProductUseCase = new DeleteProductUseCase(postgresProductRepository);
  return new DeleteProductController(deleteProductUseCase);
}

function buildFindProductByIdController(): ControllerInterface {
  const postgresProductRepository = new PostgresProductRepository();
  const findProductByIdUseCase = new FindProductByIdUseCase(postgresProductRepository);
  return new FindProductByIdController(findProductByIdUseCase);
}

function buildUpdateProductController(): ControllerInterface {
  const postgresProductRepository = new PostgresProductRepository();
  const updateProductUseCase = new UpdateProductUseCase(postgresProductRepository);
  return new UpdateProductController(updateProductUseCase);
}

export const createProductController = buildCreateProductController();
export const listProductsController = buildListProductController();
export const deleteProductController = buildDeleteProductController();
export const findProductByIdController = buildFindProductByIdController();
export const updateProductController = buildUpdateProductController();
