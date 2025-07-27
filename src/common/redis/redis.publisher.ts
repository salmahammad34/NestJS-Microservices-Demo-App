import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { PublishEventDto } from './publish-event.dto'

@Injectable()
export class RedisPublisherService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({ url: process.env.REDIS_URL });
    await this.client.connect();
    console.log('RedisPublisherService connected');
  }

  async onModuleDestroy() {
    await this.client.disconnect();
  }

  async publish<T>(eventDto: PublishEventDto<T>) {
    const message = {
      id: eventDto.id ?? null,
      event: eventDto.event,
      data: eventDto.data,
      timestamp: new Date().toISOString(),
      
    };
    await this.client.publish(eventDto.event,JSON.stringify(message));
    console.log(`Published event "${eventDto.event}"`, message);
  }
}
