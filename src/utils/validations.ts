export function operatorAnd(
  conditionA: boolean,
  conditionB: boolean,
  a: any,
  b: any
) {
  return conditionA && conditionB ? a : b
}

export function operatorOr(
  conditionA: boolean,
  conditionB: boolean,
  a: any,
  b: any
) {
  return conditionA || conditionB ? a : b
}
