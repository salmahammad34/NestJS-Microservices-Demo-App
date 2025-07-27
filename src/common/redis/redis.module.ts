
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import{RedisPublisherService} from './redis.publisher'


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REDIS_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'redis',   
          port: 6379,
        },
      },
    ]),
  ],providers:[RedisPublisherService],
  exports: [ClientsModule],
})
export class RedisModule {}
