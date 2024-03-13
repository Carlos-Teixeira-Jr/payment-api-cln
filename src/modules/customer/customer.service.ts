import { Injectable } from '@nestjs/common'
import AssasAPI from 'common/apis/asaas.api'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { PaginationQuery } from 'common/utils/paginagion.query'

@Injectable()
export class CustomerService {
  constructor(private readonly asaasAPI: AssasAPI) {}

  async getCustomer(cpfCnpj: string) {
    return await this.asaasAPI.getCustomer(cpfCnpj)
  }

  async createCustomer(customer: CreateCustomerDto) {
    return await this.asaasAPI.createCustomer(customer)
  }

  async getCustomers(query: PaginationQuery) {
    return await this.asaasAPI.getCustomers(query)
  }

  async deleteCustomer(customerId: string) {
    return await this.asaasAPI.deleteCustomer(customerId)
  }
}
