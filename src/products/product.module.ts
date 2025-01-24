import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ProductController } from "./controllers/product.controller";
import { ProductService } from "./services/product.service";
import { Category } from "src/categories/entities/category.entity";
import { CategoryService } from "src/categories/services/category.service";

@Module({
    imports: [ TypeOrmModule.forFeature([Product, Category])],
    controllers: [ProductController],
    providers: [ProductService, CategoryService],

})
export class ProductModule{}