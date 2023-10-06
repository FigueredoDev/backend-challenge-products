import { it, jest, expect, beforeEach, describe } from "bun:test";
import { CreateProductUseCase } from "./CreateProductsUseCase";
import { CreateProductDto } from "../dto/CreateProductDto";
import { BusinessError } from "../../errors/BusinessError";
import { ProductRepositoryMockInterface } from "../../mocks/ProductRepositoryMockInterface";

describe("CreateProductUseCase", () => {
  let productRepositoryMock: ProductRepositoryMockInterface;
  let createProductUseCase: CreateProductUseCase;

  beforeEach(() => {
    productRepositoryMock = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    createProductUseCase = new CreateProductUseCase(productRepositoryMock);
  });

  it("should create a new product with valid input", async () => {
    const request: CreateProductDto = {
      name: "Product name",
      description: "Product description",
      price: 100,
      stock: 10,
    };

    productRepositoryMock.create.mockResolvedValue({
      id: "some-uuid",
      ...request,
    });

    const product = await createProductUseCase.execute(request);

    expect(productRepositoryMock.create).toHaveBeenCalled();
    expect(product).toEqual({
      id: expect.any(String),
      ...request,
    });
  });

  it("should throw an error if product name is empty", async () => {
    const requestWithoutName: CreateProductDto = {
      name: "",
      description: "Product description",
      price: 100,
      stock: 10,
    };

    try {
      await createProductUseCase.execute(requestWithoutName);
    } catch (error) {
      expect(error).toBeInstanceOf(BusinessError);

      if (error instanceof BusinessError) {
        expect(error.message).toBe("Product name is required.");
      }

      return;
    }

    throw new Error("Expected an error to be thrown");
  });

  it("should throw an error if product whit the same name already exists", async () => {
    const request: CreateProductDto = {
      name: "Product name",
      description: "Product description",
      price: 100,
      stock: 10,
    };

    const existingProduct = {
      id: "some-uuid",
      ...request,
    };

    productRepositoryMock.findByName.mockResolvedValue(existingProduct);

    try {
      await createProductUseCase.execute(request);
    } catch (error) {
      expect(error).toBeInstanceOf(BusinessError);

      if (error instanceof BusinessError) {
        expect(error.message).toBe("A product with this name already exists.");
      }

      return;
    }

    throw new Error("Expected an error to be thrown");
  });

  it("should throw an error if product description is longer than 500 characters", async () => {
    const request: CreateProductDto = {
      name: "Product name",
      description: "Product description".repeat(500),
      price: 100,
      stock: 10,
    };

    try {
      await createProductUseCase.execute(request);
    } catch (error) {
      expect(error).toBeInstanceOf(BusinessError);

      if (error instanceof BusinessError) {
        expect(error.message).toBe("Product description must be under 500 characters.");
      }

      return;
    }

    throw new Error("Expected an error to be thrown");
  });

  it("should throw an error if product price is negative", async () => {
    const request: CreateProductDto = {
      name: "Product name",
      description: "Product description",
      price: -1,
      stock: 1,
    };

    try {
      await createProductUseCase.execute(request);
    } catch (error) {
      expect(error).toBeInstanceOf(BusinessError);

      return;
    }

    throw new Error("Expected an error to be thrown");
  });

  it("should throw an error when product stock is negative", async () => {
    const request: CreateProductDto = {
      name: "Product name",
      description: "Product description",
      price: 100,
      stock: -1,
    };

    try {
      await createProductUseCase.execute(request);
    } catch (error) {
      expect(error).toBeInstanceOf(BusinessError);

      if (error instanceof BusinessError) {
        expect(error.message).toBe("Product stock must be a positive integer.");
      }

      return;
    }

    throw new Error("Expected an error to be thrown");
  });
});
