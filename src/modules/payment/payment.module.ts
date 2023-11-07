import { Module } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { PaymentController } from './payment.controller'
import AssasAPI from 'common/apis/asaas.api'

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, AssasAPI],
})
export class PaymentModule {}
