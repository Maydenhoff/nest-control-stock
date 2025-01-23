import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { CategoryControllers } from "./controllers/category.controller";
import { CategoryService } from "./services/category.service";

@Module({
    imports: [ TypeOrmModule.forFeature([Category])],
    controllers: [CategoryControllers],
    providers: [CategoryService],

})
export class CategoryModule{}