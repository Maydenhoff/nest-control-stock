import { InjectRepository } from '@nestjs/typeorm'

import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/product.dto';
import { NotFoundException } from '@nestjs/common';

export class ProductService{
    constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {

    }   

    findAll() {
        return this.productRepo.find();
    }

    async findById(id:number) {
        const product = await this.productRepo.findOneBy({id});
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
        return this.productRepo.save(newProduct);
    }
    
    async update(id, data){
        const product = await this.findById(id)
        if (!product) {
            throw new NotFoundException(`User with name ${data.name} not exists.`)
        }
        this.productRepo.merge(product, data);
        return this.productRepo.save(product)
        
        
    }
    
    async remove(id){
        const product = await this.findById(id)
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return this.productRepo.delete(id)
    }
}