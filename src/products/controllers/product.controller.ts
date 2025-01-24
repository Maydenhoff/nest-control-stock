import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";

@Controller('products')
export class ProductController{
    constructor(private productService:ProductService){}
    
    @Get('')
    findALl(){
        return this.productService.findAll();
    }

    @Post('')
    create(@Body(ValidationPipe) payload: CreateProductDto){
        return this.productService.create(payload);
    }

    @Put(':id')
    updateProduct(
    @Param('id') id:number,
    @Body(ValidationPipe) payload: UpdateProductDto) {
        return this.productService.update(id, payload)
    }

    @Delete(':id')
    remove(@Param('id') id:number){
        return this.productService.remove(id);
    }
}