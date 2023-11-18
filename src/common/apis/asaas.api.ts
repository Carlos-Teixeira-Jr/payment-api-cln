import axios from 'axios'
import { PaginationQuery } from 'common/utils/paginagion.query'
import { CreateCustomerDto } from 'modules/customer/dto/create-customer.dto'
import { CreateChargeDto } from 'modules/payment/dto/create-charge.dto'
import { CreateSubscriptionDto } from 'modules/payment/dto/create-subscription.dto'
import { UpdateSubscriptionDto } from 'modules/payment/dto/update-subscription.dto'

class AssasAPI {
  private assasApi: any

  constructor() {
    this.assasApi = axios.create({
      baseURL: process.env.ASAAS_URL,
      headers: {
        access_token: process.env.ASAAS_API_KEY,
      },
    })
  }

  async getCustomer(cpfCnpj: string) {
    try {
      const customer = await this.assasApi.get(`/customers?cpfCnpj=${cpfCnpj}`)

      return customer?.data?.data?.[0]
    } catch (error) {
      const errors = error?.response?.data?.errors

      throw new Error(
        errors ? JSON.stringify(errors) : 'Ocorreu um erro ao criar a cobrança',
      )
    }
  }

  async getCustomers(query: PaginationQuery) {
    try {
      const { page, limit } = query
      const offset = page * limit

      const customer = await this.assasApi.get(
        `/customers?offset=${offset}&limit=${limit}`,
      )

      return customer?.data?.data
    } catch (error) {
      const errors = error?.response?.data?.errors

      throw new Error(
        errors ? JSON.stringify(errors) : 'Ocorreu um erro ao criar a cobrança',
      )
    }
  }

  async createCustomer(customer: CreateCustomerDto) {
    try {
      const asaasCustomer = await this.getCustomer(customer.cpfCnpj)

      if (asaasCustomer) return asaasCustomer

      const createdCustomer = await this.assasApi.post(`/customers`, customer)

      return createdCustomer?.data
    } catch (error) {
      const errors = error?.response?.data?.errors

      throw new Error(
        errors ? JSON.stringify(errors) : 'Ocorreu um erro ao criar a cobrança',
      )
    }
  }

  async createCharge(charge: CreateChargeDto) {
    try {
      const createdCharge = await this.assasApi.post(`/payments`, charge)

      return createdCharge?.data
    } catch (error) {
      const errors = error?.response?.data?.errors

      throw new Error(
        errors ? JSON.stringify(errors) : 'Ocorreu um erro ao criar a cobrança',
      )
    }
  }

  async getChargeStatus(payment_id: string) {
    try {
      const charge = await this.assasApi.get(`/payments/${payment_id}`)

      return charge?.data
    } catch (error) {
      const errors = error?.response?.data?.errors

      throw new Error(
        errors ? JSON.stringify(errors) : 'Ocorreu um erro ao criar a cobrança',
      )
    }
  }

  async getCharge(payment_id: string) {
    try {
      const charge = await this.assasApi.get(`/payments/${payment_id}`)

      return charge?.data
    } catch (error) {
      const errors = error?.response?.data?.errors

      throw new Error(
        errors ? JSON.stringify(errors) : 'Ocorreu um erro ao criar a cobrança',
      )
    }
  }

  async getCharges(query: PaginationQuery) {
    try {
      const { page, limit } = query
      const offset = page * limit

      const charges = await this.assasApi.get(
        `/payments?offset=${offset}&limit=${limit}`,
      )

      return charges?.data?.data
    } catch (error) {
      throw error
    }
  }

  async getChargeByCustomer(cpfCnpj: string) {
    try {
      const customer = await this.getCustomer(cpfCnpj)

      const charges = await this.assasApi.get(
        `/payments?customer=${customer.id}`,
      )

      return charges?.data?.data
    } catch (error) {
      throw error
    }
  }

  async refundCharge(payment_id: string, value: number, description: string) {
    try {
      const charge = await this.assasApi.post(
        `/payments/${payment_id}/refund`,
        {
          value,
          description,
        },
      )

      return charge?.data
    } catch (error) {
      throw error
    }
  }

  async createSubscription(subscription: CreateSubscriptionDto) {
    try {
      const createdSubscription = await this.assasApi.post(
        `/subscriptions`,
        subscription,
      )

      return createdSubscription?.data
    } catch (error) {
      throw error
    }
  }

  async updateSubscription(
    subscription_id: string,
    subscription: UpdateSubscriptionDto,
  ) {
    try {
      const updatedSubscription = await this.assasApi.post(
        `/subscriptions/${subscription_id}`,
        subscription,
      )

      return updatedSubscription?.data
    } catch (error) {
      throw error
    }
  }

  async getSubscription(subscription_id: string) {
    try {
      const subscription = await this.assasApi.get(
        `/subscriptions/${subscription_id}`,
      )

      return subscription?.data
    } catch (error) {
      throw error
    }
  }

  async getSubscriptions(query: PaginationQuery) {
    try {
      const { page, limit } = query
      const offset = page * limit

      const subscriptions = await this.assasApi.get(
        `/subscriptions?offset=${offset}&limit=${limit}`,
      )

      return subscriptions?.data?.data
    } catch (error) {
      throw error
    }
  }

  async deleteSubscription(subscription_id: string) {
    try {
      const subscription = await this.assasApi.delete(
        `/subscriptions/${subscription_id}`,
      )

      return subscription?.data
    } catch (error) {
      throw error
    }
  }

  async getUnpaidCharges(subscription_id: string) {
    try {
      const unpaidCharges = await this.assasApi.get(`/subscriptions/${subscription_id}/payments`)

      return unpaidCharges?.data
    } catch (error) {
      throw error
    }
  }

  async tokenize(body: any) {
    try {
      const creditCardToken = await this.assasApi.post(`/creditCard/tokenize`, body)

      return creditCardToken?.data
    } catch (error) {
      throw error
    }
  }
}

export default AssasAPI
