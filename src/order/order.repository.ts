import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { plainToInstance } from "class-transformer";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { updateOrderDto } from "./dtos/update-order.dto";
import { OrderEntity } from "./entities/order.entity"; // adjust path if needed

@Injectable()
export class orderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsert(id: number, createData: CreateOrderDto, updateData: updateOrderDto) {
    const order = await this.prisma.order.upsert({
      where: { id },
      create: createData,
      update: updateData,
      include: { user: true }, 
    });

    return plainToInstance(OrderEntity, order, { excludeExtraneousValues: true });
  }

  async create(data: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data,
      include: { user: true },
    });

    return plainToInstance(OrderEntity, order, { excludeExtraneousValues: true });
  }

  async findAllByUserId(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId: Number(userId) },
      include: { user: true },
    });

    return plainToInstance(OrderEntity, orders, { excludeExtraneousValues: true });
  }

  async findById(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: Number(id) },
      include: { user: true },
    });

    return plainToInstance(OrderEntity, order, { excludeExtraneousValues: true });
  }

  async update(id: string, data: updateOrderDto) {
    const order = await this.prisma.order.update({
      data,
      where: { id: Number(id) },
      include: { user: true },
    });

    return plainToInstance(OrderEntity, order, { excludeExtraneousValues: true });
  }

  async delete(id: number) {
    const order = await this.prisma.order.delete({
      where: { id: Number(id) },
      include: { user: true },
    });

    return plainToInstance(OrderEntity, order, { excludeExtraneousValues: true });
  }
}
