import { Request, Response } from "express";
import { BusinessError } from "../errors/BusinessError";
import { ICreateProductUseCase } from "../UseCases/CreateProduct/ICreateProduct";

export class CreateProductController {
  constructor(private readonly createProductUseCase: ICreateProductUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      console.log(request.body);

      const product = await this.createProductUseCase.execute(request.body);
      console.log(product);

      return response.status(201).json(product);
    } catch (error) {
      if (error instanceof BusinessError) {
        return response.status(400).json({
          message: error.message,
        });
      }

      console.log(error);

      return response.status(500).json({ message: "Internal server error" });
    }
  }
}
