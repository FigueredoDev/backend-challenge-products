import { Request, Response } from "express";
import { IListProducts } from "../UseCases/ListProducts/IListProducts";
import { IController } from "./interfaces/IController";

export class ListProductsController implements IController {
  constructor(private listProductsUseCase: IListProducts) {}

  async handle(request: Request, response: Response) {
    try {
      const products = await this.listProductsUseCase.execute();
      return response.status(200).json(products);
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}
