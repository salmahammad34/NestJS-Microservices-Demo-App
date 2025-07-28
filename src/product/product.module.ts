import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productRepository } from './product.repository'
import { RedisModule } from '../common/redis/redis.module'
import { AuthModule } from 'src/common/AuthGuards/auth.module';
import {ProductEventsListener} from './ProductEventsListener.controller'



@Module({
  imports: [RedisModule,AuthModule],
  controllers: [ProductController,ProductEventsListener],
  providers: [ProductService, productRepository],
})
export class ProductModule { }
