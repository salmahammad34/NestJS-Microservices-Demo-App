import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {orderRepository} from './order.repository'
import {RedisModule} from '../common/redis/redis.module'
import { AuthModule } from 'src/common/AuthGuards/auth.module';


@Module({
  imports: [RedisModule,AuthModule],
  controllers: [OrderController],
  providers: [OrderService,orderRepository],
})
export class OrderModule {}
