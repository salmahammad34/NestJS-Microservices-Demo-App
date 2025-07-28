import { ClientProxyFactory, Transport, RedisOptions } from '@nestjs/microservices';
import {REDIS_CLIENT} from 'src/common/constants'

export const RedisClientProvider = {
  provide: REDIS_CLIENT,
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: process.env.REDIS_URL,
      },
    } as RedisOptions); 
  },
};
