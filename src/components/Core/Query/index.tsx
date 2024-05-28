'use client'

import { queryClient } from '@/configs/api'
import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

export const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
