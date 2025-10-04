import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { ProductService } from 'src/product/product.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
    private uuid: string
    private username: string

    constructor(private readonly productService: ProductService) {
        // TODO: Hardcode thông tin user
        this.uuid = '12345'
        this.username = 'User 1'
    }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    create(@Body() createDto: CreateProductDto) {
        return this.productService.create(createDto, this.uuid, this.username)
    }

    @Get()
    @ApiOperation({ summary: 'Find all products' })
    findAll() {
        return this.productService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find a product by id' })
    findOne(@Param('id') id: string) {
        return this.productService.findOne(+id)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a product' })
    update(@Param('id') id: string, @Body() updateDto: UpdateProductDto) {
        return this.productService.update(+id, updateDto, this.uuid, this.username)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Soft delete a product' })
    softDelete(@Param('id') id: string) {
        return this.productService.softDelete(+id, this.uuid, this.username)
    }
}
