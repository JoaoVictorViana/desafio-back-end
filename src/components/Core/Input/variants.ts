import { VariantElement } from '@/types/app'

const inputDefaultClasses =
  'rounded-[4px] py-3 w-full font-medium text-sm placeholder:text-[#b5b5b5] disabled:text-primary-950'

export const InputVariant: VariantElement = {
  primary: `${inputDefaultClasses} text-black hover:border-primary-950 border-ligth-gray-50 focus-visible:outline-primary-950`,
  secondary: `${inputDefaultClasses} text-success-400 hover:border-success-500 border-success-400 focus-visible:outline-success-400`,
  error: `${inputDefaultClasses} text-primary-950 bg-danger-200 hover:border-danger-800 border-danger-800 focus-visible:outline-danger-800`,
}

export const GridVariant: VariantElement = {
  primary: `text-black hover:border-primary-950 border-ligth-gray-50`,
  secondary: `text-success-400 border-success-400 hover:border-success-500`,
  error: `text-primary-950 bg-danger-200 hover:border-danger-800 border-danger-800 focus-visible:outline-danger-800`,
}

export const GridFocusVariant: VariantElement = {
  primary: `text-black hover:border-primary-950 border-ligth-gray-50`,
  secondary: `text-success-400 border-2 border-success-400`,
  error: `text-primary-950 bg-danger-200 hover:border-danger-800 border-danger-800 focus-visible:outline-danger-800`,
}
