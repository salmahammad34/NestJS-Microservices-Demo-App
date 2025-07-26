import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './user.repository';
import { updateUserDto } from './dtos/update-user.dto';
import { loginDto } from './dtos/loginDto.dto';


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService:JwtService ,
  ) {}

  async createUser(data: CreateUserDto) {
 
    return this.userRepository.create(data);
  }

  async findAllUsers() {
    return this.userRepository.findAll();
  }

  async findUserById(id: string) {
    return this.userRepository.findById(id);
  }

  async update(id: string, data: updateUserDto) {
    return this.userRepository.update(id, data);
  }

  async deleteAllUsers() {
    return this.userRepository.delete();
  }


  async login(data:loginDto) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email};
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
