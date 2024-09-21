import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

import { PositionLevels } from "../../../utils/enums/vacancy-positions.enum";
import { JobOccupancy } from "../../../utils/enums/job-occupancy.enum";

@Entity('vacancies')
export class VacancyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({
        name: 'vacancy_name',
    })
    name: string

    @Column({
        name: 'vacancy_description',
        type: 'text',
        nullable: true
    })
    description: string

    @CreateDateColumn({
        name: 'creation_date'
    })
    creationDate: Date

    @Column({
        name: 'position_level',
        type: 'enum',
        enum: PositionLevels,
        nullable: true
    })
    positionLevel: PositionLevels

    @Column({
        type: 'enum',
        enum: JobOccupancy,
        default: JobOccupancy.FULLTIME
    })
    occupancy: JobOccupancy

    @Column({
        name: 'is_closed',
        default: false
    })
    isClosed: boolean
}