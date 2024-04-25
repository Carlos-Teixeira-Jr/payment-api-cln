import { Injectable } from '@nestjs/common'
import AssasAPI from 'common/apis/asaas.api'
import { ChargeStatusEnum, CreateChargeDto } from './dto/create-charge.dto'
import { PaginationQuery } from 'common/utils/paginagion.query'
import { RefundDto } from './dto/refund.dto'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { UpdateSubscriptionDto } from './dto/update-subscription.dto'

@Injectable()
export class PaymentService {
  constructor(private readonly asaasAPI: AssasAPI) {}

  async createCharge(charge: CreateChargeDto) {
    return await this.asaasAPI.createCharge(charge)
  }

  async getChargeStatus(payment_id: string) {
    const payment = await this.asaasAPI.getChargeStatus(payment_id)

    const paid = [
      ChargeStatusEnum.RECEIVED,
      ChargeStatusEnum.CONFIRMED,
      ChargeStatusEnum.RECEIVED_IN_CASH,
    ].includes(payment.status)

    return { paid }
  }

  async getCharge(payment_id: string) {
    return await this.asaasAPI.getCharge(payment_id)
  }

  async getCharges(query: PaginationQuery) {
    return await this.asaasAPI.getCharges(query)
  }

  async getChargeByCustomer(cpfCnpj: string) {
    return await this.asaasAPI.getChargeByCustomer(cpfCnpj)
  }

  async refundCharge(payment_id: string, refundDto: RefundDto) {
    const { value, description } = refundDto
    return await this.asaasAPI.refundCharge(payment_id, value, description)
  }

  // To-do: tipar o dto
  async createSubscription(subscription: CreateSubscriptionDto) {
    return await this.asaasAPI.createSubscription(subscription);
  }

  async updateSubscription(
    subscription_id: string,
    subscription: UpdateSubscriptionDto,
  ) {
    return await this.asaasAPI.updateSubscription(subscription_id, subscription)
  }

  async getSubscription(subscription_id: string) {
    return await this.asaasAPI.getSubscription(subscription_id)
  }

  async getSubscriptions(query: PaginationQuery) {
    return await this.asaasAPI.getSubscriptions(query)
  }

  async getSubscriptionsByCustomer(customer_id: string) {
    return await this.asaasAPI.getSubscriptionsByCustomer(customer_id)
  }

  async deleteSubscription(subscription_id: string) {
    return await this.asaasAPI.deleteSubscription(subscription_id)
  }

  async getUnpaidCharges(subscription_id: string) {
    return await this.asaasAPI.getUnpaidCharges(subscription_id)
  }

  async tokenize(body: any) {
    return await this.asaasAPI.tokenize(body)
  }

  async deleteCharge(charge_id: string) {
    return await this.asaasAPI.deleteCharge(charge_id);
  }

  async getChargesBySubscription(subscription_id: string) {
    return await this.asaasAPI.getChargesBySubscription(subscription_id);
  }

  async payChargeWithCreditCard(charge_id: string, body: any) {
    return await this.asaasAPI.payChargeWithCreditCard(charge_id, body)
  }
}
