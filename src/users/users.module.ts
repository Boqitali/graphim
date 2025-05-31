import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { Posts } from '../post/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Posts])],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
