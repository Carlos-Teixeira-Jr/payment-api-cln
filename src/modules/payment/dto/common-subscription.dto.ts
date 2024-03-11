import {
  IsString,
  IsNumber,
  IsOptional,
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

enum CycleType {
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMIANNUALLY = 'SEMIANNUALLY',
  YEARLY = 'YEARLY',
}

export class CommonSubscriptionDto {
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
    description: 'Valor da assinatura',
    example: 100.0,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  value: number

  @ApiProperty({
    description: 'Data de vencimento',
    example: '2021-06-10',
    required: true,
  })
  //@IsString()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  nextDueDate: Date
  

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
    description: 'Periodicidade da cobrança',
    example: CycleType.MONTHLY,
    enum: CycleType,
    required: true,
  })
  @IsEnum(CycleType, {
    message: `Os tipos disponíveis são: ${Object.keys(CycleType).map(
      key => CycleType[key],
    )}`,
  })
  @IsNotEmpty()
  cycle: CycleType

  @ApiProperty({
    description: 'Descrição da assinatura (máx. 500 caracteres)',
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
