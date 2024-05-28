'use client'

/* eslint-disable react/destructuring-assignment */
import * as LabelPrimitive from '@radix-ui/react-label'
import SelectBase, { MultiValue, SingleValue } from 'react-select'
import { Option, TestProperties, Variant } from '@/types/app'
import {
  FocusEvent,
  ForwardRefExoticComponent,
  HTMLProps,
  PropsWithChildren,
  Ref,
  forwardRef,
  useCallback,
} from 'react'
import variants from '@/enums/variants'
import { useSelectInput } from './hook'
import { Flex } from '../Display'

export type SelectInputProps = {
  name?: string
  containerProps?: HTMLProps<HTMLDivElement> & TestProperties
  disabled?: boolean
  label?: string
  helperText?: string | boolean
  labelProps?: LabelPrimitive.LabelProps & Ref<HTMLSpanElement> & TestProperties
  helperProps?: HTMLProps<HTMLSpanElement> & TestProperties
  limit?: number
  options?: Option[]
  error?: boolean
  multiple?: boolean
  pill?: boolean
  value?: Option
  width?: string
  placeholder?: string
  variant?: Variant
  required?: boolean
  cacheUniqs?: any
  noCacheOptions?: boolean
  className?: string
  onChange?: (v: SingleValue<Option> | MultiValue<Option>) => void
  onBlur?: (e: FocusEvent<any, Element>) => void
  onFocus?: (e: FocusEvent<any, Element>) => void
} & TestProperties

const NoOptions = () => 'Sem opções'

export const Select: ForwardRefExoticComponent<
  PropsWithChildren<SelectInputProps>
> = forwardRef((props) => {
  const { commonProps, options } = useSelectInput(props)
  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => props.onBlur && props.onBlur(e),
    [props]
  )

  return (
    <Flex
      {...props.containerProps}
      className={`${props.containerProps?.className} flex-col`}
    >
      {props.label && (
        <LabelPrimitive.Root
          className={`${variants.labelVariant[props.variant ?? 'primary']} ${
            props.labelProps?.className ?? ''
          }`}
          htmlFor={props.name}
          {...props.labelProps}
        >
          {props.label}
          {props.required && <span className="text-primary-100">*</span>}
        </LabelPrimitive.Root>
      )}

      {props.options && (
        <SelectBase
          {...props}
          {...commonProps}
          className={`${props.className ?? ''}  rounded-lg`}
          required={false}
          onBlur={handleBlur}
          options={options}
          inputId={props.name}
          instanceId={`react-select-${props.name}`}
          noOptionsMessage={NoOptions}
        />
      )}

      {props.helperText && (
        <span
          {...props.helperProps}
          className={`${variants.helperText[props.variant ?? 'primary']} ${
            props.helperProps?.className ?? ''
          }`}
        >
          {props.helperText}
        </span>
      )}
    </Flex>
  )
})
