import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { setupGlobalPipes } from './common/pipes/setup-global-pipes';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupGlobalPipes(app); 

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });
  

  await app.startAllMicroservices();
  await app.listen(3000);  
}
bootstrap();
