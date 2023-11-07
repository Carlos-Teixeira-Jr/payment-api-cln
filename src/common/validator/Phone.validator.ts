import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ name: 'PhoneValidator', async: false })
export class PhoneValidator implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments): boolean {
    return (
      value &&
      (value.length === 10 || value.length === 11 || value.length === 12)
    )
  }

  defaultMessage(_args?: ValidationArguments): string {
    return `Telefone inválido '${_args.property}: ${_args.value}', tente novamente com um valor válido!`
  }
}
