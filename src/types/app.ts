import { GroupBase } from 'react-select'
import { ReactElement, ReactNode } from 'react'

export type TestProperties = {
  'data-testid'?: string
}

export type Variant = 'primary' | 'secondary' | 'error'

export interface VariantElement {
  primary: string
  secondary: string
  error: string
}

export type Menu = {
  label: string
  href: string
  permissions?: string[]
}[]

export type Option<Value = string | number> = {
  label: string
  value: Value
  name?: string
  disabled?: boolean
}

export type TableFetcherResponse<T> = {
  data: T[]
  current_page: number
  first_page_url?: string
  prev_page_url?: string
  next_page_url?: string
  last_page_url?: string
  last_page: number
  per_page: number
  total: number
  path: string
}

export type TableFetcher<T, F, O = 'ASC' | 'DESC'> = (p: {
  page: number
  limit: number
  order?: O
  sort?: string
  filters: F
  search?: string
}) => Promise<TableFetcherResponse<T>> | TableFetcherResponse<T>

export interface Column<T = any> {
  Header: string
  align?: 'center' | 'left' | 'right'
  sort?: string
  accessor: (v: T) => ReactNode
  tooltip?: boolean
  truncate?: boolean
  copy?: boolean
  width?: string
  tooltipWidth?: string
  withClick?: boolean
  isAction?: boolean
  tooltipText?: string
}
