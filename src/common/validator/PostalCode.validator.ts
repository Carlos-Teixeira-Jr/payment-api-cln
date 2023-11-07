import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ name: 'PostalCodeValidator', async: false })
export class PostalCodeValidator implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments): boolean {
    const regexCEP = /^\d{5}-\d{3}$/
    return regexCEP.test(value)
  }

  defaultMessage(_args?: ValidationArguments): string {
    return `CEP inválido '${_args.property}: ${_args.value}', tente novamente com um valor válido!`
  }
}
