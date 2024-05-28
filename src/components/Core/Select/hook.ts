import { useMemo } from 'react'
import { operatorAnd, operatorOr } from '@/utils/validations'
import {
  defaultTheme,
  StylesConfig,
  ThemeConfig,
  GroupBase,
} from 'react-select'
import { Option, Variant } from '@/types/app'
import { SelectInputProps } from '.'

import twcss from '../../../../tailwind.config'

const themeColors: any = twcss.theme?.extend?.colors

const mapVariants: Record<Variant, string> = {
  primary: 'primary',
  secondary: 'secondary',
  error: 'danger',
}

export const useSelectInput = ({
  onChange,
  onFocus,
  onBlur,
  disabled,
  error,
  value,
  pill,
  placeholder,
  options,
  width,
  variant = 'primary',
}: SelectInputProps) => {
  const theme = useMemo<ThemeConfig>(
    () => ({
      ...defaultTheme,
      colors: {
        ...defaultTheme.colors,
        primary: themeColors.primary['400'],
        primary75: themeColors.primary['700'],
        primary50: themeColors.primary['500'],
        primary25: themeColors.primary['200'],
      },
    }),
    []
  )

  const styles = useMemo<
    StylesConfig<Option, false, GroupBase<Option>> | undefined
  >(
    () => ({
      control: (style, state) => {
        const errorBoxShadow = operatorOr(
          !!error,
          variant === 'error',
          `0 0 0 1px ${themeColors.danger['400']}`,
          'none'
        )
        const boxShadow = operatorAnd(
          state.menuIsOpen,
          true,
          `0 0 0 1px ${themeColors['dark-gray']['500']}`,
          errorBoxShadow
        )

        const errorBorderColor = operatorOr(
          !!error,
          variant === 'error',
          themeColors.danger['400'],
          themeColors['dark-gray']['700']
        )
        const borderColor = operatorAnd(
          state.menuIsOpen,
          true,
          '#f0f0f0',
          '#f0f0f0'
        )
        return {
          ...style,
          ...operatorAnd(!!pill, true, { paddingRight: 8 }, {}),
          ...operatorAnd(
            !!state.isDisabled,
            true,
            {
              backgroundColor: 'white',
              borderColor: '#f0f0f0',
              cursor: 'not-allowed',
            },
            {
              boxShadow,
              cursor: 'pointer',
              backgroundColor: 'white',
              borderColor,
              ':hover': {
                borderColor: '#f0f0f0',
              },
            }
          ),
          borderRadius: pill ? 10000 : 8,
          borderWidth: 1,
          borderStyle: 'solid',
          width,
        }
      },
      indicatorSeparator: () => ({}),

      dropdownIndicator: (style, state) => {
        const colorError =
          error || variant === 'error'
            ? themeColors.danger[400]
            : themeColors['dark-gray']['700']
        const color = state.isDisabled
          ? themeColors['light-gray']['300']
          : colorError
        return {
          ...style,
          color,
        }
      },

      placeholder: (style) => ({
        ...style,
        marginLeft: 8,
        color: themeColors['dark-gray']['700'],
        fontWeight: 500,
      }),

      singleValue: (style, state) => ({
        ...style,
        fontWeight: 500,
        paddingLeft: 8,
        color: !state.isDisabled
          ? themeColors['dark-gray']['800']
          : themeColors['light-gray']['500'],
      }),

      input: (style) => ({
        ...style,
        padding: '8px 8px',
      }),

      option: (style, state) => {
        let color =
          state.isSelected || state.isFocused
            ? 'white'
            : themeColors['dark-gray']['800']

        if (state.isDisabled) {
          color = themeColors['dark-gray']['700']
        }

        return {
          ...style,
          paddingLeft: 16,
          paddingRight: 16,
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: 14,
          color,
          ':hover': {
            color: 'white',
          },
        }
      },
      menu: (base) => ({ ...base, zIndex: 300 }),
    }),
    [pill, error, variant]
  )

  const commonProps = useMemo(
    () => ({
      onChange,
      onFocus,
      onBlur,
      isDisabled: disabled,
      placeholder: placeholder || 'Selecione...',
      value,
      theme,
      styles,
    }),
    [onChange, onBlur, onFocus, value, theme, styles, disabled, placeholder]
  )

  return { commonProps, options }
}
