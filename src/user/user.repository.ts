import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { PrismaService } from "prisma/prisma.service";
import { updateUserDto } from "./dtos/update-user.dto";

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

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  

  async update(id: string, data: updateUserDto) {
    return await this.prisma.product.update({
      data,
      where: { id: Number(id) }

    })
  }

  async delete() {
    return await this.prisma.user.deleteMany()
  }
}
