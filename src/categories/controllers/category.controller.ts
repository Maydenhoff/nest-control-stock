import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { CreateCategotyDto } from "../dtos/category.dto";
import { UUID } from "crypto";

@Controller('categories')
export class CategoryControllers {
    constructor(private categoryService: CategoryService){}

    @Get(':id')
    findById(@Param('id') id:UUID) {
        return this.categoryService.findById(id);
    }

    @Post()
    create(@Body() payload: CreateCategotyDto){
        return this.categoryService.create(payload);
    }
}