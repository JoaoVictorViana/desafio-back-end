import { apiGateway } from '@/configs/api'
import { TableFetcher, TableFetcherResponse } from '@/types/app'
import { Client } from '@/core/entities'

export const getClients: TableFetcher<Client, null> = ({ page }) =>
  apiGateway.get<TableFetcherResponse<Client>>({
    url: '/clients',
    query: {
      page,
    },
  })

export const getClientsList = () =>
  apiGateway.get<Client[]>({
    url: '/clients',
  })
