import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ProductService } from "./product.service";
import { createClient, RedisClientType } from "redis";

@Injectable()
export class ProductSubscriber implements OnModuleInit, OnModuleDestroy {
    private subscriber: RedisClientType;
    constructor(private readonly productservice: ProductService) { }
    async onModuleInit() {
        try {
            this.subscriber = createClient({ url: process.env.REDIS_URL })
            await this.subscriber.connect()
            await this.subscriber.subscribe('order_created', async (message: string) => {
                const order = JSON.parse(message)
                console.log('Received order_created event:', order);
                // delegate to the product service to update the stock(fake update)
                await this.productservice.updateStock(order.id)
            })
        } catch (error) {
            console.log(error);
        }
        console.log('ProductSubscriber is listening to order_created events');
    }

    async onModuleDestroy() {
        await this.subscriber.disconnect()
    }
}