import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
 
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());


  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
     host:'redis',
     port:Number(process.env.PORT)
    },
  });

  
  await app.startAllMicroservices();
  await app.listen(3000);  
}

bootstrap();
