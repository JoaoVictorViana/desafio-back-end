import { FieldValues, FormState } from 'react-hook-form'

export function getFieldError<T extends FieldValues>(
  formState: FormState<T>,
  field: string
) {
  if (!field.match(/\./)) return formState.errors?.[field]

  const getError = (
    data: any,
    indexes: Array<string>
  ): { message: string } | null => {
    if (!data) return null

    if (!indexes.length) return data as { message: string }

    const [index, ...restIndexes] = indexes

    return getError(data[index], restIndexes) as { message: string }
  }

  return getError(formState.errors, field.split('.'))
}

export function getFieldValue<T extends FieldValues>(values: T, field: string) {
  if (!field.match(/\./)) return values?.[field]

  const getValue = (
    data: any,
    indexes: Array<string>
  ): { message: string } | null => {
    if (!data) return null

    if (!indexes.length) return data as { message: string }

    const [index, ...restIndexes] = indexes

    return getValue(data[index], restIndexes)
  }

  return getValue(values, field.split('.'))
}
