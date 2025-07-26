import { Controller, Post, Get, Param, Body, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { loginDto } from './dtos/loginDto.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Get('login')
  async login(@Body() data: loginDto) {
    return this.userService.login(data)
  }

  @Get()
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Put(':userId')
  async updateUser(@Param() userId: string, @Body() data: updateUserDto) {
    return this.userService.update(userId, data)
  }
  @Delete(':id')
  async deleteAllUsers() {
    return this.userService.deleteAllUsers();
  }
}
