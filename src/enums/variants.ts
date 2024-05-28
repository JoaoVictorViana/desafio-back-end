import { VariantElement } from '../types/app'

const labelDefaultClasses = 'font-bold text-sm w-max whitespace-nowrap mb-2'

const helperDefaultClasses = 'font-semibold text-xs mt-2'

export default {
  labelVariant: {
    primary: `${labelDefaultClasses} text-dark-gray-700`,
    secondary: `${labelDefaultClasses} text-success-400`,
    error: `${labelDefaultClasses} text-danger-400`,
  },
  helperText: {
    primary: `${helperDefaultClasses} text-primary-300`,
    secondary: `${helperDefaultClasses} text-success-400`,
    error: `${helperDefaultClasses} text-danger-800`,
  },
} as Record<'helperText' | 'labelVariant', VariantElement>
