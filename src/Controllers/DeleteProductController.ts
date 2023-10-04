import { Request, Response } from "express";
import { IController } from "./interfaces/IController";
import { BusinessError } from "../errors/BusinessError";
import { IDeleteProduct } from "../UseCases/DeleteProduct/IDeleteProduct";

export class DeleteProductController implements IController {
  constructor(private readonly deleteProductUseCase: IDeleteProduct) {}

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
