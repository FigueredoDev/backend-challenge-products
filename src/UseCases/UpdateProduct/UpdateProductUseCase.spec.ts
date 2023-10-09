import { beforeEach, describe, expect, it, jest } from "bun:test";
import { ProductRepositoryMockInterface } from "../../mocks/ProductRepositoryMockInterface";
import { IUpdateProduct } from "./IUpdateProduct";
import { UpdateProductUseCase } from "./UpdateProductUseCase";
import { UpdateProductDto } from "../dto/UpdateProductDto";
import { Product } from "../../Domain/Entities/Products";
import { BusinessError } from "../../errors/BusinessError";

describe("UpdateProductUseCase", () => {
  let productRepository: ProductRepositoryMockInterface;
  let updateProductUseCase: IUpdateProduct;

  const id = "some-uuid";
  const product = {
    id,
    name: "old name",
    description: "Product description",
    price: 100,
    stock: 10,
  };

  beforeEach(() => {
    productRepository = {
      findAll: jest.fn(),
      findById: jest.fn().mockImplementation((inputId: string) => {
        return Promise.resolve(inputId === id ? product : undefined);
      }),
      findByName: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    updateProductUseCase = new UpdateProductUseCase(productRepository);
  });

  it("should update a product with valid input", async () => {
    const updatedFields = {
      name: "new name",
      description: "Product description",
      price: 100,
      stock: 10,
    };

    productRepository.update.mockImplementation((id: string, updatedFields: UpdateProductDto) => {
      return Promise.resolve({ id, ...updatedFields } as Product);
    });

    const updatedProduct = await updateProductUseCase.execute(id, updatedFields);

    expect(updatedProduct).toEqual({
      id,
      ...updatedFields,
    });
  });

  it("should update a product with only required fields", async () => {
    const updatedFields: UpdateProductDto = {
      name: "New product",
      price: 100,
    };

    productRepository.update.mockImplementation((id: string, updatedFields: UpdateProductDto) => {
      return Promise.resolve({ id, ...updatedFields } as Product);
    });

    const updatedProduct = await updateProductUseCase.execute(id, updatedFields);

    expect(updatedProduct).toEqual({
      id,
      ...updatedFields,
    });
  });

  it("should throw BusinessError if product name is not provided", async () => {
    const id = "some-uuid";
    const updatedFields = {
      name: "",
      description: "Product description",
      price: 100,
      stock: 10,
    };

    productRepository.findById.mockImplementation((inputId: string) => {
      return Promise.resolve(inputId === id ? product : undefined);
    });

    try {
      await updateProductUseCase.execute(id, updatedFields);
    } catch (error) {
      expect(error).toBeInstanceOf(BusinessError);

      if (error instanceof BusinessError) {
        expect(error.message).toBe("Product name is required.");
      }

      return;
    }

    throw new Error("Expected an error to be throw");
  });

  it("should throw BusinessError if product not found", async () => {
    const updatedFields = {
      name: "Product name",
      price: 100,
    };

    productRepository.findById.mockResolvedValue(undefined);

    try {
      await updateProductUseCase.execute(id, updatedFields);
    } catch (error) {
      expect(error).toBeInstanceOf(BusinessError);

      if (error instanceof BusinessError) {
        expect(error.message).toBe("Product not found");
      }

      return;
    }

    throw new Error("Expected an error to be throw");
  });

  it("should throw BusinessError if another product with the same name already exists", async () => {
    const updatedFields = {
      name: "New Product",
      price: 100,
    };

    const existingProduct = {
      id: "2",
      name: "New Product",
      description: "Existing description",
      price: 20,
      stock: 10,
    };

    productRepository.findByName.mockResolvedValue(existingProduct);

    try {
      await updateProductUseCase.execute(id, updatedFields);
    } catch (error) {
      expect(error).toBeInstanceOf(BusinessError);

      if (error instanceof BusinessError) {
        expect(error.message).toBe("A product with this name already exists.");
      }

      return;
    }

    throw new Error("Expected an error to be throw");
  });
});
