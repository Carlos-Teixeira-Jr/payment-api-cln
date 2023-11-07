import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class RefundDto {
  @ApiProperty({
    description: 'Valor a ser estornado',
    example: 10.5,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  value: number

  @ApiProperty({
    description: 'Motivo do estorno',
    example: 'Produto não entregue',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string
}
