import { Request, Response } from "express";
import { ControllerInterface } from "./interfaces/ControllerInterface";
import { BusinessError } from "../errors/BusinessError";
import { UpdateProductUseCaseInterface } from "../UseCases/UpdateProduct/UpdateProductInterface";

export class UpdateProductController implements ControllerInterface {
  constructor(private updateProductUseCase: UpdateProductUseCaseInterface) {}

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
