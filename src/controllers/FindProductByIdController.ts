import { Request, Response } from "express";
import { ControllerInterface } from "./interfaces/ControllerInterface";
import { FindProductByIdInterface } from "../UseCases/FindProduct/FindProductByIdInterface";
import { BusinessError } from "../errors/BusinessError";

export class FindProductByIdController implements ControllerInterface {
  constructor(private readonly findProductByIdUseCase: FindProductByIdInterface) {}

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
