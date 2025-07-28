import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import {ORDER_CREATED_EVENT} from 'src/common/constants'

@Controller()
export class ProductEventsListener {
  constructor(private readonly productService: ProductService) {}

  @EventPattern(ORDER_CREATED_EVENT)
  async handleOrderCreated(@Payload() message: any) {
    console.log('Received order_created event:', message);
    await this.productService.updateStock(message.id);
  }
}
