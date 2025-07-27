// product-events.listener.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProductService } from './product.service';
import { RedisSubscriberService } from 'src/common/redis/redis.subscriber' 

@Injectable()
export class ProductEventsListener implements OnModuleInit {
  constructor(
    private readonly redisSubscriber: RedisSubscriberService,
    private readonly productService: ProductService,
  ) {}

  async onModuleInit() {
    await this.redisSubscriber.subscribe('order_created', async (message) => {
      // cleanly handle logic here
      await this.productService.updateStock(message.id);
    });
  }
}
