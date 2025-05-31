import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.preload({id, ...updateUserDto})

    if(!user){
      console.log(id)
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    await this.userRepo.delete({id})
    return id
  }
}
