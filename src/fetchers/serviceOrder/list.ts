import { apiGateway } from '@/configs/api'
import { TableFetcher, TableFetcherResponse } from '@/types/app'
import { ServiceOrder, ServiceOrderStatus } from '@/core/entities'
import { QueryFunctionContext } from '@tanstack/react-query'

export const getServiceOrders = () =>
  apiGateway.get<ServiceOrder[]>({
    url: '/service-orders',
  })

export const getServiceOrdersByStatus = (status: ServiceOrderStatus) =>
  apiGateway.get<ServiceOrder[]>({
    url: '/service-orders',
    query: {
      status,
    },
  })

export const getServiceOrdersByStatusQuery = ({
  queryKey,
}: QueryFunctionContext<[string, { status: ServiceOrderStatus }]>) => {
  const [, { status }] = queryKey

  return getServiceOrdersByStatus(status)
}
