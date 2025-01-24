import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { UserService } from "../servicies/user.service";
import { UUID } from "crypto";

@Controller('users')
export class UserController{
    constructor(private userService: UserService){

    }

    @Get('')
    findALl() {
        return this.userService.findAll()
    }
    @Post('')
    createUser(@Body(ValidationPipe) payload: CreateUserDto){
        return this.userService.create(payload);

    }

    @Get('/:id')
    findByUser(@Param('id') id:UUID){
        return this.userService.findById(id);
    }

    @Put(':id')
    update(
        @Param('id') id:UUID,
        @Body() payload: UpdateUserDto,
    ) {
        return this.userService.update(id, payload)
    }

    @Delete(':id')
    remove(@Param('id') id:UUID){

        return this.userService.remove(id);
    }
}