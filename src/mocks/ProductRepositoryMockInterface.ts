import { jest } from "bun:test";
import { IProductRepository } from "../Domain/Repositories/IProductRepository";

export interface ProductRepositoryMockInterface {
  findAll: jest.Mock<IProductRepository["findAll"]>;
  findById: jest.Mock<IProductRepository["findById"]>;
  findByName: jest.Mock<IProductRepository["findByName"]>;
  create: jest.Mock<IProductRepository["create"]>;
  update: jest.Mock<IProductRepository["update"]>;
  delete: jest.Mock<IProductRepository["delete"]>;
}
