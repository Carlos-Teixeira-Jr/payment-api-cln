import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { PaginationQuery } from 'common/utils/paginagion.query'

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Carrega cliente por CPF ou CNPJ' })
  @Get(':cpfCnpj')
  async getCustomer(@Param('cpfCnpj') cpfCnpj: string) {
    const customer = await this.customerService.getCustomer(cpfCnpj)
    return customer
  }

  @ApiOperation({ summary: 'Lista todos os clientes' })
  @Get()
  async getCustomers(@Query() query: PaginationQuery) {
    const customers = await this.customerService.getCustomers(query)
    return customers
  }

  @ApiOperation({ summary: 'Cria novo cliente' })
  @Post()
  async createCustomer(@Body() customer: CreateCustomerDto) {
    const createdCustomer = await this.customerService.createCustomer(customer)
    return createdCustomer
  }
}
