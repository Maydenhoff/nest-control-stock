import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

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
}