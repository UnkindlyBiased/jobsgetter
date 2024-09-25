import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { UserEntity } from "../user.entity";

@Entity('user_verifications')
export class UserVerificationEntity {
    @PrimaryGeneratedColumn('uuid', {
        name: 'verification_link'
    })
    verificationLink: string

    @Column({
        name: 'is_active',
        default: true
    })
    isActive: boolean

    @ManyToOne(() => UserEntity)
    user: UserEntity
}