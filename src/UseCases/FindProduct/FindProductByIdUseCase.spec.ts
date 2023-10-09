import { beforeEach, describe, expect, it, jest } from "bun:test";
import { ProductRepositoryMockInterface } from "../../mocks/ProductRepositoryMockInterface";
import { FindProductByIdInterface } from "./FindProductByIdInterface";
import { FindProductByIdUseCase } from "./FindProductByIdUseCase";
import { BusinessError } from "../../errors/BusinessError";

describe("FindProductByIdUseCase", () => {
  let productRepository: ProductRepositoryMockInterface;
  let findProductByIdUseCase: FindProductByIdInterface;

  beforeEach(() => {
    productRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByName: jest.fn(),
    };

    findProductByIdUseCase = new FindProductByIdUseCase(productRepository);
  });

  it("should find a product by id when valid id is provided", async () => {
    const productId = "some-uuid";
    const product = {
      id: "some-uuid",
      name: "Product name",
      description: "Product description",
      price: 100,
      stock: 10,
    };

    productRepository.findById.mockImplementation((inputId: string) => {
      return Promise.resolve(inputId === productId ? product : undefined);
    });

    const result = await findProductByIdUseCase.execute(productId);

    expect(result.id).toEqual(product.id);
    expect(findProductByIdUseCase.execute(productId)).resolves.toEqual(product);
  });

  it("should throw an error if product not found", async () => {
    const product = {
      id: "",
      name: "Product name",
      description: "Product description",
      price: 100,
      stock: 10,
    };

    productRepository.findById.mockImplementation((inputId: string) => {
      return Promise.resolve(inputId === product.id ? product : undefined);
    });

    try {
      await findProductByIdUseCase.execute("some-uuid");
    } catch (error) {
      expect(error).toBeInstanceOf(BusinessError);

      if (error instanceof BusinessError) {
        expect(error.message).toBe("Product not found");
      }

      return;
    }

    throw new Error("Expected an error to be thrown");
  });
});
