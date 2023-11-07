import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  ValidateIf,
  Validate,
  IsEmail,
  IsNotEmpty,
  IsCreditCard,
  IsEnum,
  ValidateNested,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { PostalCodeValidator } from 'common/validator/PostalCode.validator'
import { CPFCNPJValidator } from 'common/validator/CPFCNPJ.validator'
import { PhoneValidator } from 'common/validator/Phone.validator'

enum BillingType {
  BOLETO = 'BOLETO',
  CREDIT_CARD = 'CREDIT_CARD',
  PIX = 'PIX',
  UNDEFINED = 'UNDEFINED',
}

enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

class Discount {
  @ApiProperty({
    description:
      'Valor percentual ou fixo de desconto a ser aplicado sobre o valor da cobrança',
    example: 10.0,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  value?: number

  @ApiProperty({
    description:
      'Dias antes do vencimento para aplicar desconto. Ex: 0 = até o vencimento, 1 = até um dia antes, 2 = até dois dias antes, e assim por diante',
    example: 3,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  dueDateLimitDays?: number

  @ApiProperty({
    description: 'Tipo de desconto a ser aplicado',
    example: DiscountType.PERCENTAGE,
    enum: DiscountType,
    required: false,
  })
  @IsString()
  @IsOptional()
  type?: DiscountType
}

export enum ChargeStatusEnum {
  PENDING = 'PENDING', // - Aguardando pagamento
  RECEIVED = 'RECEIVED', // - Recebida (saldo já creditado na conta)
  CONFIRMED = 'CONFIRMED', // - Pagamento confirmado (saldo ainda não creditado)
  OVERDUE = 'OVERDUE', // - Vencida
  REFUNDED = 'REFUNDED', // - Estornada
  RECEIVED_IN_CASH = 'RECEIVED_IN_CASH', // - Recebida em dinheiro (não gera saldo na conta)
  REFUND_REQUESTED = 'REFUND_REQUESTED', // - Estorno Solicitado
  REFUND_IN_PROGRESS = 'REFUND_IN_PROGRESS', // - Estorno em processamento (liquidação já está agendada, cobrança será estornada após executar a liquidação)
  CHARGEBACK_REQUESTED = 'CHARGEBACK_REQUESTED', // - Recebido chargeback
  CHARGEBACK_DISPUTE = 'CHARGEBACK_DISPUTE', // - Em disputa de chargeback (caso sejam apresentados documentos para contestação)
  AWAITING_CHARGEBACK_REVERSAL = 'AWAITING_CHARGEBACK_REVERSAL', // - Disputa vencida, aguardando repasse da adquirente
  DUNNING_REQUESTED = 'DUNNING_REQUESTED', // - Em processo de negativação
  DUNNING_RECEIVED = 'DUNNING_RECEIVED', // - Recuperada
  AWAITING_RISK_ANALYSIS = 'AWAITING_RISK_ANALYSIS', // - Pagamento em análise
}

class Interest {
  @ApiProperty({
    description:
      'Percentual de juros ao mês sobre o valor da cobrança para pagamento após o vencimento',
    example: 2.0,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  value?: number
}

class Fine {
  @ApiProperty({
    description:
      'Percentual de multa sobre o valor da cobrança para pagamento após o vencimento',
    example: 2.0,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  value?: number
}

class CreditCard {
  @ApiProperty({
    description: 'Nome impresso no cartão',
    example: 'João da Silva',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  holderName: string

  @ApiProperty({
    description: 'Número do cartão',
    example: '4111111111111111',
    required: true,
  })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsCreditCard({ message: 'Número de cartão inválido' })
  @IsNotEmpty()
  number: string

  @ApiProperty({
    description: 'Mês de expiração do cartão',
    example: '12',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  expiryMonth: string

  @ApiProperty({
    description: 'Ano de expiração do cartão',
    example: '2022',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  expiryYear: string

  @ApiProperty({
    description: 'Código de segurança do cartão',
    example: '123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  ccv: string
}

class CreditCardHolderInfo {
  @ApiProperty({
    description: 'Nome do titular do cartão',
    example: 'João da Silva',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'Email do titular do cartão',
    example: 'joao.silva@gmail.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'CPF ou CNPJ do titular do cartão',
    example: '12345678901',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Validate(CPFCNPJValidator)
  @Transform(({ value }) => value.replace(/\D/g, ''))
  cpfCnpj: string

  @ApiProperty({
    description: 'CEP do titular do cartão',
    example: '89223-005',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    value.replace(/\D/g, '')?.replace(/^(\d{5})(\d)/, '$1-$2'),
  )
  @Validate(PostalCodeValidator)
  postalCode: string

  @ApiProperty({
    description: 'Número do endereço do titular do cartão',
    example: '123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  addressNumber: string

  @ApiProperty({
    description: 'Complemento do endereço do titular do cartão',
    example: 'Casa',
    required: false,
  })
  @IsString()
  @IsOptional()
  addressComplement?: string

  @ApiProperty({
    description: 'Fone com DDD do titular do cartão',
    example: '4738010919',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Validate(PhoneValidator)
  phone: string

  @ApiProperty({
    description: 'Fone celular do titular do cartão',
    example: '47998781877',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Validate(PhoneValidator)
  mobilePhone?: string
}

export class CreateChargeDto {
  @ApiProperty({
    description: 'Id do cliente',
    example: 'cus_000005321521',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  customer: string

  @ApiProperty({
    description: 'Tipo de cobrança',
    example: BillingType.BOLETO,
    enum: BillingType,
    required: true,
  })
  @IsEnum(BillingType, {
    message: `Os tipos disponíveis são: ${Object.keys(BillingType).map(
      key => BillingType[key],
    )}`,
  })
  @IsNotEmpty()
  billingType: BillingType

  @ApiProperty({
    description: 'Data de vencimento',
    example: '2021-06-10',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  dueDate: string

  @ApiProperty({
    description: 'Valor da cobrança',
    example: 100.0,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  value: number

  @ApiProperty({
    description: 'Descrição da cobrança',
    example: 'Pedido 056984',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({
    description: 'Referência externa',
    example: '056984',
    required: false,
  })
  @IsString()
  @IsOptional()
  externalReference?: string

  @ApiProperty({
    description: 'Número de parcelas',
    example: 2,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  installmentCount?: number

  @ApiProperty({
    description: 'Valor de cada parcela',
    example: 50.0,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  installmentValue?: number

  @ApiProperty({
    description: 'Define se a cobrança será enviada via Correios',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  postalService?: boolean = false

  @ApiProperty({
    description: 'Informações de desconto',
    required: false,
    type: Discount,
  })
  @IsOptional()
  @Type(() => Discount)
  discount?: Discount

  @ApiProperty({
    description: 'Informações de juros para pagamento após o vencimento',
    required: false,
    type: Interest,
  })
  @IsOptional()
  @Type(() => Interest)
  interest?: Interest

  @ApiProperty({
    description: 'Informações de multa para pagamento após o vencimento',
    required: false,
    type: Fine,
  })
  @IsOptional()
  @Type(() => Fine)
  fine?: Fine

  @ApiProperty({
    description:
      'Token do cartão de crédito para uso da funcionalidade de tokenização de cartão de crédito',
    example: 'tok_000',
    required: false,
  })
  @IsString()
  @IsOptional()
  creditCardToken?: string

  @ApiProperty({
    description:
      'IP de onde o cliente está fazendo a compra. Não deve ser informado o IP do servidor',
    example: '192.0.0.168',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @ValidateIf(obj => obj.billingType === BillingType.CREDIT_CARD)
  remoteIp?: string

  @ApiProperty({
    description: 'Informações do cartão de crédito',
    required: false,
    type: CreditCard,
  })
  @Type(() => CreditCard)
  @IsNotEmpty()
  @ValidateNested()
  @ValidateIf(obj => obj.billingType === BillingType.CREDIT_CARD)
  creditCard?: CreditCard

  @ApiProperty({
    description: 'Informações do titular do cartão de crédito',
    required: false,
    type: CreditCardHolderInfo,
  })
  @Type(() => CreditCardHolderInfo)
  @IsNotEmpty()
  @ValidateNested()
  @ValidateIf(obj => obj.billingType === BillingType.CREDIT_CARD)
  creditCardHolderInfo?: CreditCardHolderInfo
}
