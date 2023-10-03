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
