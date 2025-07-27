
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

type RedisMessageHandler = (message: any) => Promise<void>;

@Injectable()
export class RedisSubscriberService implements OnModuleInit, OnModuleDestroy {
  private subscriber: RedisClientType;
  private handlers: Record<string, RedisMessageHandler> = {};

  async onModuleInit() {
    this.subscriber = createClient({ url: process.env.REDIS_URL });
    await this.subscriber.connect();
    console.log('RedisSubscriberService connected');
  }

  async subscribe(event: string, handler: RedisMessageHandler) {
    this.handlers[event] = handler;
    await this.subscriber.subscribe(event, async (message: string) => {
      try {
        const parsed = JSON.parse(message);
        console.log(`Event "${event}" received:`, parsed);
        await handler(parsed);
      } catch (err) {
        console.error(`Error handling event "${event}":`, err);
      }
    });
    console.log(`Subscribed to Redis event: ${event}`);
  }

  async onModuleDestroy() {
    await this.subscriber.disconnect();
  }
}
