import { jest } from "bun:test";
import { ProductRepositoryInterface } from "../repositories/ProductRepositoryInterface";

export interface ProductRepositoryMockInterface {
  findAll: jest.Mock<ProductRepositoryInterface["findAll"]>;
  findById: jest.Mock<ProductRepositoryInterface["findById"]>;
  findByName: jest.Mock<ProductRepositoryInterface["findByName"]>;
  create: jest.Mock<ProductRepositoryInterface["create"]>;
  update: jest.Mock<ProductRepositoryInterface["update"]>;
  delete: jest.Mock<ProductRepositoryInterface["delete"]>;
}
