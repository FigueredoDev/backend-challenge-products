import { Request, Response } from "express";
import { ControllerInterface } from "./interfaces/ControllerInterface";
import { BusinessError } from "../errors/BusinessError";
import { DeleteProductUseCaseInterface } from "../UseCases/DeleteProduct/DeleteProductInterface";

export class DeleteProductController implements ControllerInterface {
  constructor(private readonly deleteProductUseCase: DeleteProductUseCaseInterface) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      await this.deleteProductUseCase.execute(request.params.id);

      return response.sendStatus(204);
    } catch (error) {
      if (error instanceof BusinessError) {
        return response.status(404).json({
          message: error.message,
        });
      }

      return response.status(500).json({ message: "Internal server error" });
    }
  }
}
