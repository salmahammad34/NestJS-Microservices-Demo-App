import { Injectable,Inject} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';


import { PublishEventDto } from './publish-event.dto'

@Injectable()
export class RedisPublisherService {
 constructor( @Inject('REDIS_CLIENT') private readonly client:ClientProxy){}

 async publish<T>(eventDto: PublishEventDto<T>) {
  const message = {
    id: eventDto.id ?? null,
    data: eventDto.data,
    timestamp: new Date().toISOString(),
  };

  await firstValueFrom(this.client.emit(eventDto.event, message));
  console.log(`Emitted event "${eventDto.event}"`, message);
}
}
