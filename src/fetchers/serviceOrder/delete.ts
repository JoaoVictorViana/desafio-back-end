import { apiGateway } from '@/configs/api'

export const deleteServiceOrder = (id: string) =>
  apiGateway.delete({ url: `/service-orders/${id}` })
