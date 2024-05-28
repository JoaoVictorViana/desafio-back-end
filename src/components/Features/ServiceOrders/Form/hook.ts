import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-toastify'
import { Option } from '@/types/app'
import { createClient, updateClient } from '@/fetchers/client/store'
import { ServiceOrderFields } from '@/types/forms'
import { getClientsList } from '@/fetchers/client/list'
import {
  createServiceOrders,
  updateServiceOrders,
} from '@/fetchers/serviceOrder/store'

type Props = {
  afterSubmit?: () => void
}

export function useServiceOrderForm({ afterSubmit }: Props) {
  const queryClient = useQueryClient()

  const { data: clients } = useQuery({
    queryKey: ['clients-list'],
    queryFn: getClientsList,
  })

  const clientsOptions = useMemo(() => {
    if (!clients) return []

    return clients.map((item) => ({ label: item.name, value: item.id ?? '' }))
  }, [clients])

  const serviceOrderMutation = useMutation({
    mutationFn: (data: ServiceOrderFields) =>
      data.id
        ? updateServiceOrders(data.id, {
            ...data,
          })
        : createServiceOrders({
            ...data,
            client_id: data.client?.value ?? '',
            status: 'todo',
          }),
  })

  const handleSubmit = useCallback((data: ServiceOrderFields) => {
    serviceOrderMutation
      .mutateAsync({ ...data })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ['service-orders'],
        })
        toast(
          `Ordem de Serviço ${data.id ? 'atualizado' : 'cadastrado'} com sucesso!`
        )
        afterSubmit && afterSubmit()
      })
      .catch(() =>
        toast.error(
          `Error ao ${data.id ? 'atualizar' : 'cadastrar'} ordem de serviço, tente novamente!`
        )
      )
  }, [])

  return {
    handleSubmit,
    clientsOptions,
  }
}
