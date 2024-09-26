import { IsEmail, IsStrongPassword, MaxLength } from "class-validator";

export class UserLoginDto {
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