import { ReactElement } from 'react'

export type Adornment = {
  element: ReactElement
  props?: React.HTMLProps<HTMLDivElement>
}
