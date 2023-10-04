import { Request, Response } from "express";
import { IController } from "./interfaces/IController";
import { BusinessError } from "../errors/BusinessError";
import { IUpdateProduct } from "../UseCases/UpdateProduct/IUpdateProduct";

export class UpdateProductController implements IController {
  constructor(private updateProductUseCase: IUpdateProduct) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const product = await this.updateProductUseCase.execute(id, request.body);

      return response.status(200).json(product);
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
