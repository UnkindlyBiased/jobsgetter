import { Expose } from "class-transformer"

export class UserPayloadDto {
    @Expose()
    id: string

    @Expose()
    firstName: string

    @Expose()
    lastName: string

    @Expose()
    emailAddress: string

    @Expose()
    isVerified: boolean
}