import { Request, Response } from "express";
import { IController } from "./interfaces/IController";
import { IFindProductById } from "../UseCases/FindProduct/IFindProductById";
import { BusinessError } from "../errors/BusinessError";

export class FindProductByIdController implements IController {
  constructor(private readonly findProductByIdUseCase: IFindProductById) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const product = await this.findProductByIdUseCase.execute(id);

      return response.status(200).json(product);
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
