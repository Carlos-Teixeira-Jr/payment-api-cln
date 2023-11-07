import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { isValidCNPJ } from 'common/utils/isValidCNPJ'
import { isValidCPF } from 'common/utils/isValidCPF'

@ValidatorConstraint({ name: 'CPFCNPJValidator', async: false })
export class CPFCNPJValidator implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments): boolean {
    return isValidCPF(value) || isValidCNPJ(value)
  }

  defaultMessage(_args?: ValidationArguments): string {
    return `CPF ou CNPJ inválido '${_args.property}: ${_args.value}', tente novamente com um valor válido!`
  }
}
