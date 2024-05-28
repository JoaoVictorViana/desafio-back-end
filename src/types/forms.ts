import { Option } from '@/types/app'

export type ClientFields = {
  id?: string | null
  name: string
  email: string
  telephone: string | number
  address: string
}

export type ServiceOrderFields = {
  id?: string | null
  client_id?: string | null
  client?: Option<string> | null
  description: string
  status: string
  cost?: string | number | null
  cost_estimated: string | number
  observation: string
  dt_order: string | Date
}
