import { apiGateway } from '@/configs/api'

export const deleteClient = (id: string) =>
  apiGateway.delete({ url: `/clients/${id}` })
