import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { orderRepository } from './order.repository';
import { CreateOrderDto } from './dtos/create-order.dto';
import { updateOrderDto } from './dtos/update-order.dto';
import { createClient, RedisClientType } from 'redis';


@Injectable()
export class OrderService {
    private publisher: RedisClientType;

    constructor(private readonly orderRepository: orderRepository) {
        this.publisher = createClient({ url: process.env.REDIS_URL });
        this.publisher.connect().then(() => {
            console.log('Redis Publisher connected');
        }).catch(console.error);
    }


    async findAll(userId: string) {
        return this.orderRepository.findAllByUserId(userId);
    }

    async findById(id: number) {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }

    async update(id: string, data: updateOrderDto) {
        // Check existence before update
        await this.findById(Number(id));
        return this.orderRepository.update(id, data);
    }

    async delete(id: string) {
        // Check existence before delete
        await this.findById(Number(id));
        return this.orderRepository.delete(Number(id));
    }

    async save(id: number, createData: CreateOrderDto, updateData: updateOrderDto){
        const order = await this.orderRepository.upsert(id, createData, updateData);
        await this.publisher.publish('order_created', JSON.stringify(order));
        console.log('Published order_created',order);
        return { message: 'order_created', order };
    }
}
