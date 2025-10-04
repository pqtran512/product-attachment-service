import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ description: 'Alias of the product', example: 'Bàn phím cơ Corsair K68 RGB Blue Switch' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  alias: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  @ApiProperty({ description: 'Name of the product', example: 'Bàn phím cơ Corsair K68 RGB Blue Switch' })
  name: string;

  @ApiProperty({ description: 'ID of the brand', example: 1 })
  @IsInt()
  brand_id: number;

  @ApiPropertyOptional({ description: 'ID of the category', example: 5 })
  @IsOptional()
  @IsInt()
  category_id?: number;

  @ApiProperty({ description: 'Price of the product', example: 2590000 })
  @IsInt()
  price: number;

  @ApiPropertyOptional({ description: 'Barcode of the product', example: '8934567890123' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  barcode?: string;

  @ApiPropertyOptional({ description: 'Detailed description of the product', example: 'Bàn phím cơ chống nước, switch Blue, hỗ trợ RGB đa màu.' })
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;

  @ApiPropertyOptional({ description: 'Weight of the product (kg)', example: 1.2 })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiPropertyOptional({ description: 'Length of the product (cm)', example: 45 })
  @IsOptional()
  @IsNumber()
  length?: number;

  @ApiPropertyOptional({ description: 'Width of the product (cm)', example: 15 })
  @IsOptional()
  @IsNumber()
  width?: number;

  @ApiPropertyOptional({ description: 'Height of the product (cm)', example: 4 })
  @IsOptional()
  @IsNumber()
  height?: number;
}