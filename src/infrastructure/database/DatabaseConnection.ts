import { Pool } from "pg";
import { dataBaseConfig } from "./config/databaseConfig";

export const pool = new Pool(dataBaseConfig);
