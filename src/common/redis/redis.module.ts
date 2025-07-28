import { Module } from '@nestjs/common';
import{RedisPublisherService} from './redis.publisher'
import {RedisClientProvider}  from  './redis-client.provider'

@Module({
  providers: [RedisPublisherService, RedisClientProvider],
  exports: [RedisPublisherService,RedisClientProvider], 
})
export class RedisModule {}

