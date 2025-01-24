import { InjectRepository } from '@nestjs/typeorm'

import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/product.dto';

export class ProductService{
    constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {

    }   

    findAll() {
        return this.productRepo.find();
    }

    create(data: CreateProductDto ) {
        const newProduct = this.productRepo.create(data);
        return this.productRepo.save(newProduct);
    }
}