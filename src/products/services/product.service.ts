import { InjectRepository } from '@nestjs/typeorm'

import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';

export class ProductService{
    constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {

    }   

    findAll() {
        return this.productRepo.find();
    }
}