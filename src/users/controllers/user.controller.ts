import { Controller, Get } from "@nestjs/common";

@Controller('users')
export class UserController{
    
    @Get('')
    get() {
        return "hola "
    }
}