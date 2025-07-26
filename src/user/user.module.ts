import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from 'src/common/AuthGuards/auth.module';



@Module({
  imports:[AuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository,PrismaService],
  exports:[UserRepository]
})
export class UserModule {}
