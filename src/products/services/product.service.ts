import { InjectRepository } from '@nestjs/typeorm'

import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { NotFoundException } from '@nestjs/common';
import { CategoryService } from 'src/categories/services/category.service';
import { UUID } from 'crypto';

export class ProductService{
    constructor(
        @InjectRepository(Product) private productRepo: Repository<Product>,
        private categoryService:CategoryService,
) {

    }   

    findAll() {
        return this.productRepo.find({
            relations:['category']
        });
    }

    async findById(id:string) {
        const product = await this.productRepo.findOne({where:{id}});
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return product
    }
    async create(data: CreateProductDto ) {
        const product = await this.productRepo.findOne({where:{name:data.name}})
        if (product) {
            throw new NotFoundException(`User with name ${data.name} already exists.`)
        }
        const newProduct = await this.productRepo.create(data);
        if (data.categoryId){
            const category = await this.categoryService.findById(data.categoryId)
            newProduct.category = category
        }
        return this.productRepo.save(newProduct);
    }
    
    async update(id:UUID, data:UpdateProductDto){
        const product = await this.findById(id)
        if (!product) {
            throw new NotFoundException(`User with name ${data.name} not exists.`)
        }
        if (data.categoryId){
            const category = await this.categoryService.findById(data.categoryId)
            product.category = category
        }
        this.productRepo.merge(product, data);
        return this.productRepo.save(product)
        
        
    }
    
    async remove(id:UUID){
        const product = await this.findById(id)
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return this.productRepo.delete(id)
    }
}