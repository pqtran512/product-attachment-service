import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { Product } from 'src/product/product.entity';
import { FindOptionsOrder, IsNull, Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ) { }

    async create(createDto: CreateProductDto, userUuid: string, username: string): Promise<Product> {
        const create_product = {
            ...createDto,
            created_by_uuid: userUuid,
            created_by_name: username
        }

        try {
            const product = this.productRepo.create(create_product)
            return this.productRepo.save(product)

        } catch (error) {
            console.error('Error in create Product', error)
            throw new InternalServerErrorException(error.message || 'Unexpected error occurred')
        }
    }

    async findAll(skip = 0, limit = 30, order: FindOptionsOrder<Product> = {})
    : Promise<{data: Product[]; meta: any}> {
        try {
            const [data, total] = await this.productRepo.findAndCount({
                skip, 
                take: limit, 
                order,
                where: {
                    deleted_at: IsNull(),
                }
            });

            return {
                data,
                meta: {
                    total,
                    skip,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };

        } catch (error) {
            console.error('Error in find all Products', error)
            throw new InternalServerErrorException(error.message || 'Unexpected error occurred')
        }
    }

    async findOne(id: number): Promise<Product> {
        try {
            const product = await this.productRepo.findOne({
                where: { id, deleted_at: null } as any
            })

            if (!product) throw new NotFoundException(`Product ${id} not found`)
            return product

        } catch (error) {
            console.error('Error in find Product by id', error)
            throw new InternalServerErrorException(error.message || 'Unexpected error occurred')
        }
    }

    async update(id: number, updateDto: UpdateProductDto, userUuid: string, username: string): Promise<Product> {
        try {
            const product = await this.findOne(id)
            Object.assign(product, updateDto)

            product.updated_by_uuid = userUuid
            product.updated_by_name = username
            
            return this.productRepo.save(product)

        } catch (error) {
            console.error('Error in update Product', error)
            throw new InternalServerErrorException(error.message || 'Unexpected error occurred')
        }
    }

    async softDelete(id: number, userUuid: string, username: string) {

        const date = new Date()
        const deletedByUuid = userUuid
        const deletedByName = username

        try {
            await this.productRepo.update(id, {
                deleted_at: date,
                deleted_by_uuid: deletedByUuid,
                deleted_by_name: deletedByName,

                updated_by_uuid: deletedByUuid,
                updated_by_name: deletedByName,
            });

            return {
                message: `Product ${id} is deleted.`,
                id,
                deleted_at: date
            };

        } catch (error) {
            console.error(`Error in soft delete Product:`, error);
            throw new InternalServerErrorException(error.message || 'Unexpected error occurred');

        }
    }

}
