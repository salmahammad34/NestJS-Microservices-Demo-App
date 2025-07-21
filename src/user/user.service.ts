import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(data: CreateUserDto) {
        return this.userRepository.create(data);
    }

    async findAllUsers() {
        return this.userRepository.findAll();
    }

    async findUserById(id: string) {
        return this.userRepository.findById(id);
    }

    async deleteAllUsers() {
        return this.userRepository.delete();
    }
}
