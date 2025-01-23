import { Controller, Get } from "@nestjs/common";

@Controller('category')
export class CategoryControllers {

    @Get()
    findAll() {
        return "funciona";
    }
}