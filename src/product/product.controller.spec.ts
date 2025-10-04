import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';

const mockProduct: Product = {
  id: 1,
  alias: "iphone-15-pro-max",
  name: "iPhone 15 Pro Max",
  brand_id: 1,
  category_id: 2,
  price: 32990000,
  barcode: "1234567890123",
  description: "Điện thoại iPhone 15 Pro Max chính hãng VN/A",
  weight: 0.24,
  length: 15.9,
  width: 7.6,
  height: 0.82,
  created_at: new Date("2025-01-01T00:00:00Z"),
  created_by_uuid: "user-uuid-001",
  created_by_name: "Admin",
  updated_at: new Date("2025-01-10T12:00:00Z"),
  updated_by_uuid: "user-uuid-002",
  updated_by_name: "Editor",
  deleted_at: null,
  deleted_by_uuid: null,
  deleted_by_name: null,
  attachment: []
};

const mockUser = {
  uuid: '12345',
  username: 'User 1'
};

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockService = {
    findAll: jest.fn().mockResolvedValue([mockProduct]),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    create: jest.fn().mockResolvedValue(mockProduct),
    softDelete: jest.fn().mockResolvedValue(undefined),
    update: jest.fn().mockResolvedValue({ 
      ...mockProduct, 
      price: 40000000,
      barcode: "111111111" })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should create a product', async () => {
    const dto = {
      alias: "iphone-15-pro-max",
      name: "iPhone 15 Pro Max",
      brand_id: 1,
      category_id: 2,
      price: 30000000,
      barcode: "1234567890123",
      description: "Điện thoại iPhone 15 Pro Max chính hãng VN/A",
      weight: 0.24,
      length: 15.9,
      width: 7.6,
      height: 0.82
    }
    expect(await controller.create(dto as any)).toEqual(mockProduct);
    expect(service.create).toHaveBeenCalledWith(dto, mockUser.uuid, mockUser.username);
  });

  it('should return all products', async () => {
    expect(await controller.findAll()).toEqual([mockProduct]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one product', async () => {
    expect(await controller.findOne('1')).toEqual(mockProduct);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a product', async () => {
    const updateDto = {
      price: 40000000,
      barcode: "111111111"
    };
    await controller.update('1', updateDto);
    expect(service.update).toHaveBeenCalledWith(1, updateDto, mockUser.uuid, mockUser.username);
  });
});
