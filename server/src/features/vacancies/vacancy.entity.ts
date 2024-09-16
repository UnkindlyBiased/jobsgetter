import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('vacancies')
export class VacancyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({
        name: 'vacancy_name',
    })
    name: string
}