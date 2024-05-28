import { ApiGateway } from '@/core/services/ApiGateway/gateway'
import { QueryClient } from '@tanstack/react-query'

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export const apiGateway = new ApiGateway()

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
})
