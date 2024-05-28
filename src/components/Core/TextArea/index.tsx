import { ForwardRefExoticComponent, HTMLProps, Ref, forwardRef } from 'react'
import { TestProperties, Variant } from '@/types/app'
import * as LabelPrimitive from '@radix-ui/react-label'
import variants from '@/enums/variants'
import { Flex } from '../Display'
import { TextAreaVariant } from './variants'

export type TextAreaProps = HTMLProps<HTMLTextAreaElement> & {
  name?: string
  variant?: Variant
  label?: string
  helperText?: string | boolean
  labelProps?: LabelPrimitive.LabelProps & Ref<HTMLSpanElement> & TestProperties
  helperProps?: HTMLProps<HTMLSpanElement> & TestProperties
  containerProps?: HTMLProps<HTMLDivElement>
} & TestProperties

export const TextArea: ForwardRefExoticComponent<TextAreaProps> = forwardRef(
  (
    {
      name,
      variant,
      label,
      helperText,
      helperProps,
      labelProps,
      containerProps,
      ...props
    },
    ref: Ref<HTMLTextAreaElement>
  ) => {
    return (
      <Flex
        {...containerProps}
        className={`flex-col ${containerProps?.className}`}
      >
        {label && (
          <LabelPrimitive.Root
            className={`${variants.labelVariant[variant ?? 'primary']} ${
              labelProps?.className ?? ''
            }`}
            htmlFor={name}
            {...labelProps}
          >
            {props.required && <span className="text-primary-100">*</span>}
            {label}
          </LabelPrimitive.Root>
        )}

        <textarea
          {...props}
          className={`${TextAreaVariant[variant ?? 'primary']} ${
            props.className ?? ''
          }`}
          ref={ref}
          name={name}
          required={false}
        />

        {helperText && (
          <span
            {...helperProps}
            className={`${variants.helperText[variant ?? 'primary']} ${
              helperProps?.className ?? ''
            }`}
          >
            {helperText}
          </span>
        )}
      </Flex>
    )
  }
)
