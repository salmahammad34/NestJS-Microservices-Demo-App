import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const RedisClientProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });
  },
};
