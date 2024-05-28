import { apiGateway } from '@/configs/api'
import { ServiceOrderFields } from '@/types/forms'

export const createServiceOrders = (data: ServiceOrderFields) =>
  apiGateway.post({
    url: '/service-orders',
    body: {
      ...data,
      cost: Number(data.cost ?? 0),
      cost_estimated: Number(data.cost_estimated ?? 0),
      dt_order: new Date(data.dt_order),
    },
  })

export const updateServiceOrders = (
  id: string,
  data: Partial<ServiceOrderFields>
) =>
  apiGateway.put({
    url: `/service-orders/${id}`,
    body: {
      ...data,
      cost: Number(data.cost ?? 0),
      cost_estimated: Number(data.cost_estimated ?? 0),
      dt_order: new Date(data.dt_order ?? ''),
    },
  })
