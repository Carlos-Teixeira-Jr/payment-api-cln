import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  IsEmail,
  Validate,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { CPFCNPJValidator } from 'common/validator/CPFCNPJ.validator'
import { PhoneValidator } from 'common/validator/Phone.validator'
import { PostalCodeValidator } from 'common/validator/PostalCode.validator'

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'Marcelo Almeida',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    description: 'E-mail do cliente',
    example: 'marcelo.almeida@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Telefone do cliente',
    example: '4738010919',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Validate(PhoneValidator)
  phone: string

  @ApiProperty({
    description: 'Celular do cliente',
    example: '4799376637',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Validate(PhoneValidator)
  mobilePhone?: string

  @ApiProperty({
    description: 'CPF ou CNPJ do cliente',
    example: '24971563792',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Validate(CPFCNPJValidator)
  cpfCnpj: string

  @ApiProperty({
    description: 'CEP do cliente',
    example: '01310-000',
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
    description: 'Endereço do cliente',
    example: 'Av. Paulista',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string

  @ApiProperty({
    description: 'Número do endereço do cliente',
    example: '150',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  addressNumber: string

  @ApiProperty({
    description: 'Complemento do endereço do cliente',
    example: 'Sala 201',
    required: false,
  })
  @IsString()
  @IsOptional()
  complement?: string

  @ApiProperty({
    description: 'Bairro do cliente',
    example: 'Bela Vista',
    required: false,
  })
  @IsString()
  @IsOptional()
  province?: string

  @ApiProperty({
    example: '12987382',
    required: false,
  })
  @IsString()
  @IsOptional()
  externalReference?: string

  @ApiProperty({
    description: 'Notificações desabilitadas',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  notificationDisabled?: boolean

  @ApiProperty({
    description: 'Emails adicionais',
    example: 'marcelo.almeida2@gmail.com,marcelo.almeida3@gmail.com',
    required: false,
  })
  @IsString()
  @IsOptional()
  additionalEmails?: string

  @ApiProperty({
    description: 'Inscrição municipal',
    example: '46683695908',
    required: false,
  })
  @IsString()
  @IsOptional()
  municipalInscription?: string

  @ApiProperty({
    description: 'Inscrição estadual',
    example: '646681195275',
    required: false,
  })
  @IsString()
  @IsOptional()
  stateInscription?: string

  @ApiProperty({
    description: 'Observações',
    example: 'ótimo pagador, nenhum problema até o momento',
    required: false,
  })
  @IsString()
  @IsOptional()
  observations?: string
}
