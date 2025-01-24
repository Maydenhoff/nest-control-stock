import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { Category } from "src/categories/entities/category.entity";

export class CreateProductDto {   
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly price: number;
    
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly stock: number;
    
    
    @IsNotEmpty()
    @ApiProperty()
    readonly categoryId: number
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}