import { beforeEach, describe, expect, it, jest } from "bun:test";
import { ProductRepositoryMockInterface } from "../../mocks/ProductRepositoryMockInterface";
import { DeleteProductUseCase } from "./DeleteProductUseCase";
import { BusinessError } from "../../errors/BusinessError";
import { DeleteProductUseCaseInterface } from "./DeleteProductInterface";

describe("DeleteProductUseCase", () => {
  let productRepositoryMock: ProductRepositoryMockInterface;
  let deleteProductUseCase: DeleteProductUseCaseInterface;

  beforeEach(() => {
    productRepositoryMock = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    deleteProductUseCase = new DeleteProductUseCase(productRepositoryMock);
  });

  it("should delete a product when um valid id is provided", async () => {
    const id = "some-uuid";

    productRepositoryMock.findById.mockResolvedValue({
      id,
      name: "Product name",
      description: "Product description",
      price: 100,
      stock: 10,
    });

    await deleteProductUseCase.execute(id);

    expect(productRepositoryMock.findById).toHaveBeenCalled();
    expect(productRepositoryMock.delete).toHaveBeenCalled();
  });

  it("should throw an error if product not found", async () => {
    const id = "non-existent-id";

    try {
      await deleteProductUseCase.execute(id);
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
