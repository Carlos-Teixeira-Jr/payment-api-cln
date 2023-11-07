import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional } from 'class-validator'

export class PaginationQuery {
  @ApiProperty({
    description: 'Number of items to be returned',
    default: 25,
    required: false,
  })
  @Transform(element =>
    element &&
    element.value &&
    Number(element.value) >= 0 &&
    Number(element.value) <= 25
      ? Number(element.value)
      : 25,
  )
  @IsOptional()
  limit?: number = 25

  @ApiProperty({
    description: 'Page number to be returned',
    default: 1,
    required: false,
  })
  @IsOptional()
  @Transform(element =>
    element && element.value && Number(element.value) > 0
      ? Number(element.value)
      : 0,
  )
  page?: number = 0
}
