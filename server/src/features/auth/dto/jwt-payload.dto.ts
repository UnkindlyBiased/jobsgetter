import { UserPayloadDto } from "./user-payload.dto";

export class JwtPayloadDto {
    sub: UserPayloadDto
    iat?: number
    exp?: number
}