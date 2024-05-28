import { apiGateway } from '@/configs/api'
import { Client } from '@/core/entities'
import { ClientFields } from '@/types/forms'

export const createClient = (data: ClientFields) =>
  apiGateway.post({ url: '/clients', body: data })

export const updateClient = (id: string, data: Partial<ClientFields>) =>
  apiGateway.put({ url: `/clients/${id}`, body: data })
