import { Client, ServiceOrder, ServiceOrderStatus } from '@/core/entities'
import { deleteServiceOrder } from '@/fetchers/serviceOrder/delete'
import { getServiceOrdersByStatusQuery } from '@/fetchers/serviceOrder/list'
import { updateServiceOrders } from '@/fetchers/serviceOrder/store'
import { ServiceOrderFields } from '@/types/forms'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

const STATUS_NAME: Record<ServiceOrderStatus, string> = {
  'in progress': 'Em progresso',
  done: 'Concluído',
  impediment: 'Impedimento',
  todo: 'A fazer',
}

type ItemType = {
  id: string
  description: string
  client: Client
  dt_order: Date
}

export function useBoard() {
  const [updateModal, setUpdateModal] = useState(false)
  const [serviceOrderSelected, setServiceOrder] = useState<ServiceOrder>()

  const queryClient = useQueryClient()

  const { data: serviceOrdersTodo } = useQuery({
    queryKey: ['service-orders', { status: 'todo' }],
    queryFn: getServiceOrdersByStatusQuery,
  })

  const { data: serviceOrdersInProgress } = useQuery({
    queryKey: ['service-orders', { status: 'in progress' }],
    queryFn: getServiceOrdersByStatusQuery,
  })

  const { data: serviceOrdersImpediment } = useQuery({
    queryKey: ['service-orders', { status: 'impediment' }],
    queryFn: getServiceOrdersByStatusQuery,
  })

  const { data: serviceOrdersDone } = useQuery({
    queryKey: ['service-orders', { status: 'done' }],
    queryFn: getServiceOrdersByStatusQuery,
  })

  const updateServiceOrderMutation = useMutation({
    mutationFn: (serviceOrder: ServiceOrderFields) =>
      updateServiceOrders(serviceOrder.id?.toString() ?? '', serviceOrder),
  })

  const deleteServiceOrderMutation = useMutation({
    mutationFn: (id: string) => deleteServiceOrder(id),
  })

  const serviceOrdersTodoItems = useMemo(() => {
    if (!serviceOrdersTodo) return []

    return serviceOrdersTodo.map(
      (item): ItemType => ({
        id: item.id ?? '',
        client: item.client as Client,
        description: item.description,
        dt_order: new Date(item.dt_order),
      })
    )
  }, [serviceOrdersTodo])

  const serviceOrdersInProgressItems = useMemo(() => {
    if (!serviceOrdersInProgress) return []

    return serviceOrdersInProgress.map(
      (item): ItemType => ({
        id: item.id ?? '',
        client: item.client as Client,
        description: item.description,
        dt_order: new Date(item.dt_order),
      })
    )
  }, [serviceOrdersInProgress])

  const serviceOrdersImpedimentItems = useMemo(() => {
    if (!serviceOrdersImpediment) return []

    return serviceOrdersImpediment.map(
      (item): ItemType => ({
        id: item.id ?? '',
        client: item.client as Client,
        description: item.description,
        dt_order: new Date(item.dt_order),
      })
    )
  }, [serviceOrdersImpediment])

  const serviceOrdersDoneItems = useMemo(() => {
    if (!serviceOrdersDone) return []

    return serviceOrdersDone.map(
      (item): ItemType => ({
        id: item.id ?? '',
        client: item.client as Client,
        description: item.description,
        dt_order: new Date(item.dt_order),
      })
    )
  }, [serviceOrdersDone])

  const handleUpdateStatus = useCallback(
    (id: string, status: ServiceOrderStatus) => {
      const serviceOrder = [
        ...(serviceOrdersTodo ?? []),
        ...(serviceOrdersInProgress ?? []),
        ...(serviceOrdersImpediment ?? []),
        ...(serviceOrdersDone ?? []),
      ]?.find((item) => item.id === id)

      if (!serviceOrder) return

      queryClient.setQueriesData(
        {
          queryKey: ['service-orders', { status: serviceOrder.status }],
        },
        null
      )

      updateServiceOrderMutation
        .mutateAsync({
          id: serviceOrder.id ?? '',
          cost: serviceOrder.cost.toString(),
          cost_estimated: serviceOrder.cost_estimated.toString(),
          observation: serviceOrder.observation?.toString() ?? '',
          dt_order: new Date(serviceOrder.dt_order).toDateString(),
          client_id: serviceOrder.client_id,
          description: serviceOrder.description,
          status,
        })
        .then(() => {
          queryClient.removeQueries({
            queryKey: ['service-orders', { status }],
          })

          queryClient.refetchQueries({
            queryKey: ['service-orders', { status: serviceOrder.status }],
          })
          toast(`Ordem de serviço alterado para "${STATUS_NAME[status]}"!`)
        })
        .catch(() =>
          toast.error(
            `Error ao para "${STATUS_NAME[status]}", tente novamente!`
          )
        )
    },
    [
      serviceOrdersTodo,
      serviceOrdersInProgress,
      serviceOrdersImpediment,
      serviceOrdersDone,
    ]
  )

  const handleDeleteOrderService = useCallback(
    (id: string) => {
      const serviceOrder = [
        ...(serviceOrdersTodo ?? []),
        ...(serviceOrdersInProgress ?? []),
        ...(serviceOrdersImpediment ?? []),
        ...(serviceOrdersDone ?? []),
      ]?.find((item) => item.id === id)

      if (!serviceOrder) return

      queryClient.setQueriesData(
        {
          queryKey: ['service-orders', { status: serviceOrder.status }],
        },
        null
      )

      deleteServiceOrderMutation
        .mutateAsync(id)
        .then(() => {
          queryClient.refetchQueries({
            queryKey: ['service-orders', { status: serviceOrder.status }],
          })
          toast(`Ordem de serviço deletada com sucesso!`)
        })
        .catch(() =>
          toast.error(
            `Error ao para deletar essa ordem de serviço, tente novamente!`
          )
        )
    },
    [
      serviceOrdersTodo,
      serviceOrdersInProgress,
      serviceOrdersImpediment,
      serviceOrdersDone,
    ]
  )

  const handleChangeUpdateModal = () => {
    setUpdateModal((prev) => !prev)
  }

  const handleClickCard = (id: string) => {
    const serviceOrder = [
      ...(serviceOrdersTodo ?? []),
      ...(serviceOrdersInProgress ?? []),
      ...(serviceOrdersImpediment ?? []),
      ...(serviceOrdersDone ?? []),
    ]?.find((item) => item.id === id)

    if (!serviceOrder) return

    setServiceOrder(serviceOrder)
    handleChangeUpdateModal()
  }

  return {
    serviceOrdersTodo,
    serviceOrdersTodoItems,
    serviceOrdersDone,
    serviceOrdersDoneItems,
    serviceOrdersImpediment,
    serviceOrdersImpedimentItems,
    serviceOrdersInProgress,
    serviceOrdersInProgressItems,
    handleUpdateStatus,
    handleDeleteOrderService,
    handleChangeUpdateModal,
    handleClickCard,
    updateModal,
    serviceOrderSelected,
  }
}
