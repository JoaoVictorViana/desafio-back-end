import { Option } from '@/types/app'
import { FC, useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { getFieldError } from '@/utils/form'
import { TextArea as TextAreaBase, TextAreaProps } from '../../TextArea'

export const TextArea: FC<TextAreaProps> = ({
  name = '',
  ...textAreaProps
}) => {
  const { register, formState } = useFormContext()
  const values = useWatch()

  const error = useMemo(() => getFieldError(formState, name), [formState, name])

  const data = register(name, { onChange: textAreaProps.onChange })

  return (
    <TextAreaBase
      {...textAreaProps}
      {...data}
      value={values[name]}
      // onChange={(v) => data.onChange({ target: { value: v, name } })}
      variant={error ? 'error' : 'primary'}
      helperText={error?.message?.toString() ?? textAreaProps?.helperText}
    />
  )
}
