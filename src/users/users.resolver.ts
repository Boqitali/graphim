import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";

@Resolver("users")
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  findOneUser(@Args("id", { type: () => ID }) id: number) {
    return this.usersService.findOne(+id);
  }

  @Mutation(() => User)
  createUser(@Args("createUser") createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Mutation(() => User)
  updateUser(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateUser") updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Mutation(() => Number)
  removeUser(@Args("id", { type: () => ID }) id: number) {
    return this.usersService.remove(+id);
  }
}
