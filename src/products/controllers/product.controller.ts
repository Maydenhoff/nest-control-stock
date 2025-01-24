import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";
import { UUID } from "crypto";

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
    @Param('id') id:UUID,
    @Body(ValidationPipe) payload: UpdateProductDto) {
        return this.productService.update(id, payload)
    }

    @Delete(':id')
    remove(@Param('id') id:UUID){
        return this.productService.remove(id);
    }
}