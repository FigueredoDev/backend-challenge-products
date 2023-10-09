import { Request, Response } from "express";
import { ControllerInterface } from "./interfaces/ControllerInterface";
import { ListProductsUseCaseInterface } from "../UseCases/ListProducts/ListProductsInterface";

export class ListProductsController implements ControllerInterface {
  constructor(private listProductsUseCase: ListProductsUseCaseInterface) {}

  async handle(request: Request, response: Response) {
    try {
      const products = await this.listProductsUseCase.execute();
      return response.status(200).json(products);
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}
