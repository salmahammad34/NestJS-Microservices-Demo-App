import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return await this.prisma.user.findMany()
  } 
  async create(data: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
      }
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id: Number(id) },
    })
  }

  async delete() {
    return await this.prisma.user.deleteMany()
  }
}
