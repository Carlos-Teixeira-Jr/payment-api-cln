import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { CommonSubscriptionDto } from './common-subscription.dto'

export class CreateSubscriptionDto extends CommonSubscriptionDto {
  @ApiProperty({
    description: 'Id do cliente',
    example: 'cus_000005321521',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  customer: string

  @ApiProperty({
    description: 'Data limite para vencimento das mensalidades',
    example: '2021-06-10',
    required: false,
  })
  @IsString()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  endDate?: Date

  @ApiProperty({
    description:
      'Número máximo de mensalidades a serem geradas para esta assinatura',
    example: 12,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  maxPayments?: number
}
