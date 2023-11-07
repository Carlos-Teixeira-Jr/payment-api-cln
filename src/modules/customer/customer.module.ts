import { Module } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { CustomerController } from './customer.controller'
import AssasAPI from 'common/apis/asaas.api'

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, AssasAPI],
})
export class CustomerModule {}
