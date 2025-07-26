
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  ],
  exports: [ClientsModule],
})
export class RedisModule {}
