import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { PrismaModule } from 'prisma/prisma.module';
import {RedisModule} from './common/redis/redis.module'
import { OrderService } from './order/order.service';
import { ProductService } from './product/product.service';
import { productRepository } from './product/product.repository';
import { orderRepository } from './order/order.repository';
import { AuthModule } from './common/AuthGuards/auth.module';
import { RedisPublisherService } from './common/redis/redis.publisher';




@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,    
    UserModule,
    ProductModule,
    OrderModule,
    RedisModule,AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,RedisPublisherService,OrderService,ProductService,productRepository,orderRepository
  ],
})
export class AppModule {}
