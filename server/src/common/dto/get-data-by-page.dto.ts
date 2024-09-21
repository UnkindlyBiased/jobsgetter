import { IsNumber, IsOptional, IsPositive, } from 'class-validator'
import { Type } from 'class-transformer'

import { DEFAULT_PAGE_SIZE, DEFAULT_TAKE_SIZE } from '../../../utils/constants/query.constants'

export class GetDataByPageDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    page?: number = DEFAULT_PAGE_SIZE

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    take?: number = DEFAULT_TAKE_SIZE
}