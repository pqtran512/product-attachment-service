import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AttachmentModule } from './attachment/attachment.module';
import { product_management_db } from './config/ormconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: product_management_db,
    }),
    ProductModule, 
    AttachmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
