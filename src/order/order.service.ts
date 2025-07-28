import { Injectable, NotFoundException } from '@nestjs/common';
import { orderRepository } from './order.repository';
import { CreateOrderDto } from './dtos/create-order.dto';
import { updateOrderDto } from './dtos/update-order.dto';
import { RedisPublisherService } from 'src/common/redis/redis.publisher';
import {PublishEventDto} from 'src/common/redis/publish-event.dto';
import {ORDER_CREATED_EVENT} from 'src/common/constants'


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
       
        await this.findById(Number(id));
        return this.orderRepository.delete(Number(id));
    }

    async save(Id:number,createdOrder: CreateOrderDto,updatedOrder:updateOrderDto){
        const order = await this.orderRepository.upsert(Id,createdOrder,updatedOrder);
        const event=new PublishEventDto(ORDER_CREATED_EVENT, order, order.id);
        await this.redisPublisher.publish(event);
        console.log('Published order_created',order);
        return { message: 'order_created', order };
    }
}
