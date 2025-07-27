import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productRepository } from './product.repository'
import { RedisModule } from '../common/redis/redis.module'
import { AuthModule } from 'src/common/AuthGuards/auth.module';

import { RedisSubscriberService } from 'src/common/redis/redis.subscriber';
import { ProductEventsListener } from './product-events.listener';


@Module({
  imports: [RedisModule,AuthModule],
  controllers: [ProductController],
  providers: [ProductService, productRepository,RedisSubscriberService,ProductEventsListener],
})
export class ProductModule { }
