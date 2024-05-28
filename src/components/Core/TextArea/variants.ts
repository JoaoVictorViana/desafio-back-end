import { VariantElement } from '@/types/app'

const textAreaDefaultClasses =
  'border rounded-lg px-4 py-3 placeholder:text-base placeholder:font-semibold placeholder:text-light-gray-400'

export const TextAreaVariant: VariantElement = {
  primary: `${textAreaDefaultClasses} border-dark-gray-700 text-dark-gray-950`,
  secondary: `${textAreaDefaultClasses} border-secondary-700 text-secondary-400`,
  error: `${textAreaDefaultClasses} border-danger-700 text-danger-400`,
}
