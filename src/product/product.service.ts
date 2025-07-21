import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product';
import { productRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: productRepository) {}

  async create(data: CreateProductDto) {
    return this.productRepo.create(data);
  }

  async findAll() {
    return this.productRepo.findAll();
  }

  async findById(id: number) {
    return this.productRepo.findById(id);
  }

  async update(id: number, data: UpdateProductDto) {
    return this.productRepo.update(id, data);
  }

  async delete(id: number) {
    return this.productRepo.delete(id);
  }
}
