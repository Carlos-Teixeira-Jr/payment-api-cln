import { IsBoolean } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'
import { CommonSubscriptionDto } from './common-subscription.dto'

export class UpdateSubscriptionDto extends CommonSubscriptionDto {
  @ApiProperty({
    description:
      'Data limite para atualizar mensalidades já existentes com o novo valor ou forma de pagamento das mensalidades',
    example: true,
    required: false,
  })
  @IsBoolean()
  updatePendingPayment?: boolean = false
}
