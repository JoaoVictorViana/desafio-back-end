import {
  ButtonHTMLAttributes,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean
  isSubmitted?: boolean
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  isSubmitted,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      disabled={disabled}
      className={`${buttonProps.className} disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed bg-primary-500 text-sm px-4 py-3 rounded-[20px] hover:bg-primary-300 active:bg-primary-800 text-[#eee]`}
    >
      {children}
    </button>
  )
}
