import { Product } from "../../../Domain/Entities/Products";
import { IProductRepository } from "../../../Domain/Repositories/IProductRepository";
import { UpdateProductDto } from "../../../UseCases/dto/UpdateProductDto";
import { pool } from "../DatabaseConnection";

export class PostgresProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows as Product[];
  }

  async findById(id: string): Promise<Product | undefined> {
    const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    return rows[0] as Product;
  }

  async findByName(name: string): Promise<Product | undefined> {
    const { rows } = await pool.query("SELECT * FROM products WHERE name = $1", [name]);
    return rows[0] as Product;
  }

  async create(product: Product): Promise<Product> {
    const { rows } = await pool.query(
      "INSERT INTO products (id, name, description, price, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [product.id, product.name, product.description, product.price, product.stock]
    );

    return rows[0] as Product;
  }

  async update(id: string, product: UpdateProductDto): Promise<Product> {
    const { rows } = await pool.query(
      "UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *",
      [product.name, product.description, product.price, product.stock, id]
    );

    return rows[0] as Product;
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
  }
}
