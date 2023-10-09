import { beforeEach, describe, expect, it, jest } from "bun:test";
import { ProductRepositoryMockInterface } from "../../mocks/ProductRepositoryMockInterface";
import { ListProductsUseCase } from "./ListProductsUseCase";

import { Product } from "../../entities/Products";
import { ListProductsUseCaseInterface } from "./ListProductsInterface";

describe("ListProductsUseCase", () => {
  let productRepository: ProductRepositoryMockInterface;
  let listProductsUseCase: ListProductsUseCaseInterface;

  beforeEach(() => {
    productRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    listProductsUseCase = new ListProductsUseCase(productRepository);
  });

  it("should list all products", async () => {
    const products = [
      {
        id: "1",
        name: "Product name",
        description: "Product description",
        price: 100,
        stock: 10,
      },
      {
        id: "2",
        name: "Product name",
        description: "Product description",
        price: 100,
        stock: 10,
      },
    ];

    productRepository.findAll.mockResolvedValue(products);

    const result = await listProductsUseCase.execute();
    expect(result).toEqual(products);
  });

  it("should return an empty array when there are no products in database", async () => {
    const products: Product[] = [];

    productRepository.findAll.mockResolvedValue(products);

    const result = await listProductsUseCase.execute();
    expect(result).toEqual(products);
  });
});
