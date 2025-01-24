import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { User } from "../entities/user.entity";

export class UserService{
    constructor(@InjectRepository(User) private userRepo: Repository<User>){

    }

    async findAll() {
        return await this.userRepo.find()
    }
    async findById(id: number) {

        
        const user = await this.userRepo.findOne({where:{id}})
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        
        return user;

    }

    async create(data: CreateUserDto){
        const user = await this.userRepo.findOneBy({email:data.email})

        
        if (user) {
            throw new NotFoundException(`User with email ${data.email} already exists.`)
        }
        const newUser = await this.userRepo.create(data);
        return this.userRepo.save(newUser);
    }


    async update(id: number, data: UpdateUserDto) {
        const user = await this.findById(id);
        this.userRepo.merge(user, data);
        return this.userRepo.save(user);


    }

    remove(id:number){
        const user = this.findById(id);
        return this.userRepo.delete(id)
    }
}