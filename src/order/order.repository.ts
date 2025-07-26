import { PrismaService } from "prisma/prisma.service";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { Injectable } from "@nestjs/common";
import { updateOrderDto } from "./dtos/update-order.dto";
@Injectable()
export class orderRepository {
    constructor(private readonly prisma: PrismaService) { }

    async upsert(id:number,createData:CreateOrderDto,updateData:updateOrderDto){
        return await this.prisma.order.upsert({
                where: { id: Number(id) },
                create: createData,
                update: updateData,
              })
    }
    async create(data: CreateOrderDto) {
        return await this.prisma.order.create({ data })
    }
    async findAllByUserId(userId:string) {
        return await this.prisma.order.findMany({
            where:{userId:Number(userId)}
        })
    }
    async findById(id: number) {
        return await this.prisma.order.findUnique({
            where: { id: Number(id) }
        })
    }
    async update(id: string, data: updateOrderDto) {
        return await this.prisma.order.update({
            data,
            where: { id: Number(id) }
        })
    }
    async delete(id: number) {
        return await this.prisma.order.delete({
            where: { id: Number(id) }
        })
    }

}