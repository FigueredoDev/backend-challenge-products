import { Router } from "express";
import { createProductController } from "../initApp";
import { checkEmptyBody } from "../utils/validations";
import { Request, Response, NextFunction, RequestHandler } from "express";

const router = Router();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

router.post(
  "/products",
  checkEmptyBody,
  asyncHandler((request: Request, response: Response) => createProductController.handle(request, response))
);

export default router;
