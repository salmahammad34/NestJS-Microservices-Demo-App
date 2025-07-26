import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productRepository } from './product.repository'
import { RedisModule } from '../common/redis/redis.module'
import { ProductSubscriber } from './ProductSubscriber';
import { AuthModule } from 'src/common/AuthGuards/auth.module';


@Module({
  imports: [RedisModule,AuthModule],
  controllers: [ProductController],
  providers: [ProductService, productRepository, ProductSubscriber],
})
export class ProductModule { }
