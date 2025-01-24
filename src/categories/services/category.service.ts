import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../entities/category.entity";
import { Repository } from "typeorm";
import { Controller } from "@nestjs/common";
import { CreateCategotyDto } from "../dtos/category.dto";

export class CategoryService {
    constructor(
        @InjectRepository(Category) private categoryRepo: Repository<Category>,
    ) {}
    
    async findById(id){
        return  await this.categoryRepo.findOne({
            relations: ['products'],
             where: {id}});
    }

    async create(data: CreateCategotyDto) {
        const newCategory = await this.categoryRepo.create(data);
        return this.categoryRepo.save(newCategory);
        
    }


}