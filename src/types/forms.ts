import { Option } from '@/types/app'

export type ClientFields = {
  id: string
  name: string
  email: string
  telephone: string
  address: string
}

export type ServiceOrderFields = {
  id: string
  client_id: string
  client?: Option<string>
  description: string
  status: string
  cost: string
  cost_estimated: string
  observation: string
  dt_order: string
}
