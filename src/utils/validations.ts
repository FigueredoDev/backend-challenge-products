import { NextFunction, Request, Response } from "express";
import { BusinessError } from "../errors/BusinessError";

export const validateProductDescription = (description?: string): void => {
  if (description && description.length > 500) {
    throw new BusinessError("Product description must be under 500 characters.");
  }
};

export const validateProductPrice = (price: number): void => {
  if (price <= 0) {
    throw new BusinessError("Product price must be a positive value.");
  }
};

export const validateProductStock = (stock: number): void => {
  if (stock < 0 || !Number.isInteger(stock)) {
    throw new BusinessError("Product stock must be a positive integer.");
  }
};

export const checkEmptyBody = (request: Request, response: Response, next: NextFunction) => {
  if (Object.keys(request.body).length === 0) {
    return response.status(400).json({ error: "Request body is empty" });
  }
  next();
};
