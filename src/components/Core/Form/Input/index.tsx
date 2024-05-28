import { Input as InputBase, InputProps } from '@/components/Core/Input'
import { getFieldError } from '@/utils/form'
import { FC, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

export const Input: FC<InputProps> = ({ name = '', ...inputProps }) => {
  const { register, formState, watch } = useFormContext()

  const error = useMemo(() => getFieldError(formState, name), [formState, name])

  const data = register(name, {
    onChange: inputProps.onChange,
    // value: inputProps.value,
  })

  return (
    <InputBase
      {...inputProps}
      {...data}
      variant={error ? 'error' : 'primary'}
      helperText={error?.message?.toString() ?? inputProps?.helperText}
    />
  )
}
