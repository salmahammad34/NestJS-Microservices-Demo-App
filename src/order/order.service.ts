import { Injectable, NotFoundException } from '@nestjs/common';
import { orderRepository } from './order.repository';
import { CreateOrderDto } from './dtos/create-order.dto';
import { updateOrderDto } from './dtos/update-order.dto';
import { RedisPublisherService } from 'src/common/redis/redis.publisher';
import {PublishEventDto} from 'src/common/redis/publish-event.dto'


@Injectable()
export class OrderService {
  

    constructor(private readonly orderRepository: orderRepository,
         private readonly redisPublisher:RedisPublisherService) {
       
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
        const event=new PublishEventDto('order_created', order, order.id);
        await this.redisPublisher.publish(event);
        console.log('Published order_created',order);
        return { message: 'order_created', order };
    }
}
