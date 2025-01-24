import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, isString, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    readonly userName : string;
    
    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(20, { message: 'La contraseña no puede tener más de 20 caracteres' })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?.&])/,
      { message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial' }
    )
    readonly password: string;

    @IsString()
    readonly role: string;
    
    @IsEmail()
    @IsNotEmpty()
    readonly email:string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}