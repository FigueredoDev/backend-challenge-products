import { checkEmptyBody } from "../utils/validations";
import {
  createProductController,
  deleteProductController,
  findProductByIdController,
  listProductsController,
  updateProductController,
} from "../initApp";
import { NextFunction, Request, RequestHandler, Response, Router } from "express";

const router = Router();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

router.get(
  "/products",
  asyncHandler((request: Request, response: Response) => listProductsController.handle(request, response))
);

router.get(
  "/products/:id",
  asyncHandler((request: Request, response: Response) => findProductByIdController.handle(request, response))
);

router.post(
  "/products",
  checkEmptyBody,
  asyncHandler((request: Request, response: Response) => createProductController.handle(request, response))
);

router.put(
  "/products/:id",
  asyncHandler((request: Request, response: Response) => updateProductController.handle(request, response))
);

router.delete(
  "/products/:id",
  asyncHandler((request: Request, response: Response) => deleteProductController.handle(request, response))
);

export default router;
