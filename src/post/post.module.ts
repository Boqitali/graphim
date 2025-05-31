import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Posts } from "./entities/post.entity";
import { UsersResolver } from "../users/users.resolver";
import { UsersService } from "../users/users.service";
import { PostResolver } from "./post.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([User, Posts])],

  controllers: [PostController],
  providers: [PostService, UsersResolver, UsersService, PostResolver],
})
export class PostModule {}
