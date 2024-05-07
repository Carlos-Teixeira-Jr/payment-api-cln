import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { PaymentService } from './payment.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateChargeDto } from './dto/create-charge.dto'
import { PaginationQuery } from 'common/utils/paginagion.query'
import { RefundDto } from './dto/refund.dto'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { UpdateSubscriptionDto } from './dto/update-subscription.dto'

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Lista todas as cobranças' })
  @Get()
  async getCharges(@Query() query: PaginationQuery) {
    const charges = await this.paymentService.getCharges(query)
    return charges
  }

  @ApiOperation({ summary: 'Lista cobranças de um cliente' })
  @Get('charges-by-cpfcnpj/:cpfCnpj')
  async getChargeByCustomer(@Param('cpfCnpj') cpfCnpj: string) {
    const charges = await this.paymentService.getChargeByCustomer(cpfCnpj)
    return charges
  }

  @ApiOperation({ summary: 'Cria nova cobrança' })
  @Post('charge')
  async createCharge(@Body() charge: CreateChargeDto) {
    const createdCharge = await this.paymentService.createCharge(charge)
    return createdCharge
  }

  @ApiOperation({ summary: 'Verifica se cobrança foi paga' })
  @Get('charge/check/:payment_id')
  async getChargeStatus(@Param('payment_id') paymend_id: string) {
    const charges = await this.paymentService.getChargeStatus(paymend_id)
    return charges
  }

  @ApiOperation({ summary: 'Realiza estorno de uma cobrança' })
  @Post('charge/refund/:payment_id')
  async refundCharge(
    @Param('payment_id') paymend_id: string,
    @Body() refundDto: RefundDto,
  ) {
    const refund = await this.paymentService.refundCharge(paymend_id, refundDto)
    return refund
  }

  @Get('charge/:payment_id')
  async getCharge(@Param('payment_id') paymend_id: string) {
    const charges = await this.paymentService.getCharge(paymend_id)
    return charges
  }

    // To-do: tipar o dto
  @ApiOperation({ summary: 'Cria uma nova assinatura' })
  @Post('subscription')
  async createSubscription(@Body() subscription: any) {
    const createdSubscription = await this.paymentService.createSubscription(
      subscription,
    )
    return createdSubscription;
  }

  @Post('update-subscription/:subscription_id')
  async updateSubscription(
    @Param('subscription_id') subscription_id: string,
    @Body() subscription: any,
  ) {
    const updatedSubscription = await this.paymentService.updateSubscription(
      subscription_id,
      subscription,
    )
    return updatedSubscription
  }

  @Get('subscription/:subscription_id')
  async getSubscription(@Param('subscription_id') subscription_id: string) {
    const subscription = await this.paymentService.getSubscription(
      subscription_id,
    )
    return subscription
  }

  @Get('subscriptions')
  async getSubscriptions(@Query() query: PaginationQuery) {
    const subscriptions = await this.paymentService.getSubscriptions(query)
    return subscriptions
  }

  @Get('subscriptionsByCustomer/:customer_id')
  async getSubscriptionsByCustomer(@Param() customer_id: string) {
    const subscriptions = await this.paymentService.getSubscriptionsByCustomer(customer_id)
    return subscriptions;
  }

  @Delete('subscription/:subscription_id')
  async deleteSubscription(@Param('subscription_id') subscription_id: string) {
    const subscription = await this.paymentService.deleteSubscription(
      subscription_id,
    )
    return subscription
  }

  @Get('subscriptions/:subscription_id/payments')
  async getUnpaidCharges(@Param('subscription_id') subscription_id: string) {
    const unpaidCharges = await this.paymentService.getUnpaidCharges(subscription_id)
    return unpaidCharges;
  }

  @Post('tokenize')
  async tokenize(@Body() body: any) {
    const creditCardToken = await this.paymentService.tokenize(body);
    return creditCardToken
  }

  @Delete('charge/:charge_id')
  async deleteCharge(@Param('charge_id') charge_id: string) {
    const deletedCharge = await this.paymentService.deleteCharge(charge_id);

    return deletedCharge;
  }

  @Get('charges/:subscription_id')
  async getChargesBySubscription(@Param('subscription_id') subscription_id: string) {
    const charges = await this.paymentService.getChargesBySubscription(subscription_id);

    return charges;
  }

  @Post('charges/:charge_id')
  async payChargeWithCreditCard(@Param('charge_id') charge_id: string, @Body() body: any) {
    const payment = await this.paymentService.payChargeWithCreditCard(charge_id, body);

    return payment;
  }
}
