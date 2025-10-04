import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from 'typeorm';
import { join } from 'path';

export const product_management_db = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_PRODUCT__HOST'),
  port: +(configService.get<number>('DB_PRODUCT__PORT') ?? 3306),
  username: configService.get<string>('DB_PRODUCT__USERNAME'),
  password: configService.get<string>('DB_PRODUCT__PASSWORD'),
  database: configService.get<string>('DB_PRODUCT__DATABASE'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [join(__dirname, '../migrations/**/*{.ts,.js}')],
  migrationsRun: false, // Không tự động chạy migration khi khởi động ứng dụng
  synchronize: false,
  timezone: "Z"
});
// console.log("process.env: ", process.env)
// // Cấu hình DataSource cho CLI migration
// export default new DataSource({
//   type: 'mysql',
//   host: process.env.DB_PRODUCT__HOST,
//   port: +(process.env.DB_PRODUCT__PORT ?? 3306),
//   username: process.env.DB_PRODUCT__USERNAME,
//   password: process.env.DB_PRODUCT__PASSWORD,
//   database: process.env.DB_PRODUCT__DATABASE,
//   entities: [],
//   migrations: [join(__dirname, '../migrations/**/*{.ts,.js}')],
//   migrationsRun: false,
//   synchronize: false,
//   timezone: "Z"
// });
