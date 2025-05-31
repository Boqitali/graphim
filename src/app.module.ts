import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dirname } from "path";
import { UsersModule } from "./users/users.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloConfig } from "@apollo/server";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { PostModule } from './post/post.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true
    }),


    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<"postgres">("DB_CONNECTION"),
        host: config.get<string>("DB_HOST"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        port: config.get<number>("DB_PORT"),
        database: config.get<string>("DB_NAME"),
        entities: [__dirname + "dist/**/*.entity{.ts,.js"],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    UsersModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
