// Reject common values.
const REJECT_LIST = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
]

const LOOSE_STRIP_REGEX = /[^\d]/g

export function verifierDigit(numbers: string): number {
  let index = 2
  const reverse = numbers
    .split('')
    .reduce((buffer, number) => [parseInt(number, 10)].concat(buffer), [])

  const sum = reverse.reduce((buffer, number) => {
    buffer += number * index
    index = index === 9 ? 2 : index + 1
    return buffer
  }, 0)

  const mod = sum % 11
  return mod < 2 ? 0 : 11 - mod
}

export function format(cnpj: string): string {
  return strip(cnpj).replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5',
  )
}

export function strip(cnpj: string): string {
  const regex = LOOSE_STRIP_REGEX
  return (cnpj || '').toString().replace(regex, '')
}

export function isValidCNPJ(cnpj: string): boolean {
  const stripped = strip(cnpj)

  if (!stripped) {
    return false
  }

  if (stripped.length !== 14) {
    return false
  }

  if (REJECT_LIST.includes(stripped)) {
    return false
  }

  let numbers = stripped.substring(0, 12)
  numbers += verifierDigit(numbers)
  numbers += verifierDigit(numbers)

  return numbers.substring(-2) === stripped.substring(-2)
}
