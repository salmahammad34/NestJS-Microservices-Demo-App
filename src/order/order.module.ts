import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {orderRepository} from './order.repository'
import {RedisModule} from '../common/redis/redis.module'
import { AuthModule } from 'src/common/AuthGuards/auth.module';
import { RedisPublisherService } from 'src/common/redis/redis.publisher';


@Module({
  imports: [RedisModule,AuthModule],
  controllers: [OrderController],
  providers: [OrderService,orderRepository,RedisPublisherService],
})
export class OrderModule {}
