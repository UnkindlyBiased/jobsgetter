import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        name: 'first_name'
    })
    firstName: string

    @Column({
        name: 'last_name'
    })
    lastName: string

    @Column({
        name: 'email_address'
    })
    emailAddress: string

    @Column()
    password: string

    @Column({
        name: 'is_verified',
        default: false
    })
    isVerified: boolean
}