import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./servicies/user.service";

@Module({
    imports: [ TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],

})
export class UserModule{}