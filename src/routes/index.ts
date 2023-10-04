import { checkEmptyBody } from "../utils/validations";
import { createProductController, listProductsController } from "../initApp";
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

router.post(
  "/products",
  checkEmptyBody,
  asyncHandler((request: Request, response: Response) => createProductController.handle(request, response))
);

export default router;
