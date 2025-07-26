import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product";
import { PrismaService } from "prisma/prisma.service";


@Injectable()
export class productRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateProductDto) {
        return await this.prisma.product.create({ data });
    }

    async findAll() {
        return await this.prisma.product.findMany();
    }

    async findById(id: number) {
        return await this.prisma.product.findUnique({ where: { id } });
    }

    async update(id: number, data: UpdateProductDto) {
        return await this.prisma.product.update({ where: { id }, data });
    }

    async delete(id: number) {
        return await this.prisma.product.delete({ where: { id } });
    }
}