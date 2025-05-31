import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;
}
