import { TableFetcherResponse } from '@/types/app'
import { apiGateway } from '@/configs/api'
import { QueryFunctionContext } from '@tanstack/react-query'
import { Client } from '@/core/entities'

export const getUser = (id: number) =>
  apiGateway.get<Client>({
    url: `/clients/${id}`,
  })

export const getUserQuery = ({
  queryKey,
}: QueryFunctionContext<[string, { id: number }]>) => {
  const [, { id }] = queryKey

  return getUser(id)
}
