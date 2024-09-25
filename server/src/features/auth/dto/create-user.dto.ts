import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(3, { message: 'The given name is insufficently short' })
    @MaxLength(30, { message: 'The given name is insufficently long'})
    firstName: string

    @IsString()
    @MinLength(3, { message: 'The given surname is insufficently short' })
    @MaxLength(30, { message: 'The given surname is insufficently long' })
    lastName: string

    @IsEmail()
    emailAddress: string

    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 0
    })
    @MaxLength(32, { message: 'The given password is too long' })
    password: string
}