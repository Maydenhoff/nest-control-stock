import { Controller, Get } from "@nestjs/common";
import { ProductService } from "../services/product.service";

@Controller('product')
export class ProductController{
    constructor(private productService:ProductService){}
    
    @Get('')
    findALl(){
        return this.productService.findAll();
    }
}