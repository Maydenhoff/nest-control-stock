import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { Category } from "src/categories/entities/category.entity";

export class CreateCategotyDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
}

