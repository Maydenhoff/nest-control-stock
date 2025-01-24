import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { User } from "../entities/user.entity";
import { UUID } from "crypto";

export class UserService{
    constructor(@InjectRepository(User) private userRepo: Repository<User>){

    }

    async findAll() {
        return await this.userRepo.find()
    }
    async findById(id: UUID) {
        const user = await this.userRepo.findOne({where:{id}})
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        
        return {user};

    }

    async create(data: CreateUserDto){
        const user = await this.userRepo.findOneBy({email:data.email})

        
        if (user) {
            throw new NotFoundException(`Product with email ${data.email} already exists.`)
        }
        const newUser = await this.userRepo.create(data);
        return this.userRepo.save(newUser);
    }


    async update(id: UUID, data: UpdateUserDto) {
        const user = await this.findById(id);
        this.userRepo.merge(user.user, data);
        return this.userRepo.save(user.user);


    }

    async remove(id:UUID){
        const user = this.findById(id);
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return this.userRepo.delete(id)
    }
}