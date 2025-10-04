import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_PRODUCT__HOST,
  port: +(process.env.DB_PRODUCT__PORT ?? 3306),
  username: process.env.DB_PRODUCT__USERNAME,
  password: process.env.DB_PRODUCT__PASSWORD,
  database: process.env.DB_PRODUCT__DATABASE,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/**/*.ts'],
  migrationsRun: false,
  synchronize: false,
  timezone: "Z"
});