import { Request, Response } from "express";
import { BusinessError } from "../errors/BusinessError";
import { ICreateProductUseCase } from "../UseCases/CreateProduct/ICreateProduct";
import { IController } from "./interfaces/IController";

export class CreateProductController implements IController {
  constructor(private readonly createProductUseCase: ICreateProductUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const product = await this.createProductUseCase.execute(request.body);

      return response.status(201).json(product);
    } catch (error) {
      if (error instanceof BusinessError) {
        return response.status(400).json({
          message: error.message,
        });
      }

      return response.status(500).json({ message: "Internal server error" });
    }
  }
}
