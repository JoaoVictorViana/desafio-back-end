import {
  Select as SelectBase,
  SelectInputProps,
} from '@/components/Core/Select'
import { Option } from '@/types/app'
import { getFieldError } from '@/utils/form'
import { FC, useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

export const Select: FC<SelectInputProps> = ({ name = '', ...selectProps }) => {
  const { register, formState } = useFormContext()
  const values = useWatch()

  const error = useMemo(() => getFieldError(formState, name), [formState, name])

  const data = register(name, { onChange: selectProps.onChange })

  const value = useMemo(() => {
    if (values[name]) return values[name] as Option

    const getValue = (
      items: any,
      indexes: Array<string>
    ): { message: string } | undefined => {
      if (!items) return undefined

      if (!indexes.length) return items as { message: string }

      const [index, ...restIndexes] = indexes

      return getValue(items[index], restIndexes) as { message: string }
    }

    return getValue(values, name.split('.'))
  }, [name, values])

  return (
    <SelectBase
      {...selectProps}
      {...data}
      value={value as Option}
      onChange={(v) => data.onChange({ target: { value: v, name } })}
      variant={error ? 'error' : 'primary'}
      helperText={error?.message?.toString() ?? selectProps?.helperText}
    />
  )
}
