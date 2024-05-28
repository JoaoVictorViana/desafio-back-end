'use client'

import {
  FC,
  HTMLProps,
  InputHTMLAttributes,
  useCallback,
  ChangeEvent,
  forwardRef,
  Ref,
} from 'react'
import { TestProperties, Variant } from '@/types/app'
import * as LabelPrimitive from '@radix-ui/react-label'
import InputMask from 'react-input-mask'
import { Flex, Grid } from '@/components/Core/Display'
import { Adornment } from '@/types/elements'
import variants from '@/enums/variants'
import { InputHook } from './hook'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name?: string
  helperText?: string
  containerProps?: HTMLProps<HTMLDivElement> & TestProperties
  labelProps?: LabelPrimitive.LabelProps & TestProperties
  helperProps?: HTMLProps<HTMLSpanElement> & TestProperties
  label?: string
  startAdornment?: Adornment
  endAdornment?: Adornment
  variant?: Variant
  mask?: string
}

export const Input: FC<InputProps> = forwardRef(
  (
    {
      containerProps,
      labelProps,
      label,
      name,
      startAdornment,
      endAdornment,
      helperText,
      variant,
      helperProps,
      mask,
      ...props
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const { handleActiveFocus, classes } = InputHook({
      startAdornment,
      endAdornment,
      variant,
    })

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (props.type === 'number') {
          const newEvent = { ...e }
          newEvent.target.value = newEvent.target.value.replace(/\D+/, '')

          props?.onChange && props.onChange(newEvent)
          return
        }

        props?.onChange && props?.onChange(e)
      },
      [props.type, props.onChange]
    )

    return (
      <Flex
        {...containerProps}
        className={`flex-col ${containerProps?.className ?? ''} w-full`}
      >
        {label && (
          <LabelPrimitive.Root
            className={`${variants.labelVariant.primary} ${
              labelProps?.className ?? ''
            }`}
            htmlFor={name}
            {...labelProps}
          >
            {label}
            {props.required && <span className=" text-primary-100">*</span>}
          </LabelPrimitive.Root>
        )}

        <Grid className={`${classes.gridClass} ${props.className ?? ''}`}>
          {startAdornment && (
            <div {...startAdornment.props}>{startAdornment.element}</div>
          )}

          {mask && (
            <InputMask
              value={props.value}
              defaultValue={props.defaultValue}
              onChange={props.onChange}
              mask={mask}
              name={name}
              className={`${props.className} ${classes.inputClass}`}
              disabled={props.disabled}
              readOnly={props.readOnly}
              // onFocus={(e) => handleActiveFocus(true, e, props.onFocus)}
              // onBlur={(e) => {
              //   handleActiveFocus(false, e, props.onBlur)
              //   if (!props.onBlur) return
              //   props.onBlur(e)
              // }}
              inputRef={ref}
            />
          )}
          {!mask && (
            <input
              {...props}
              ref={ref}
              onChange={handleChange}
              type={props.type === 'number' ? 'text' : props.type}
              onFocus={(e) => handleActiveFocus(true, e, props.onFocus)}
              onBlur={(e) => {
                handleActiveFocus(false, e, props.onFocus)
                if (!props.onBlur) return
                props.onBlur(e)
              }}
              className={`${props.className ?? ''} ${classes.inputClass}`}
              name={name}
              required={false}
            />
          )}
          {endAdornment && (
            <div {...endAdornment.props}>{endAdornment.element}</div>
          )}
        </Grid>

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
