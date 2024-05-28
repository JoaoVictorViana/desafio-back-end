import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-toastify'
import { Option } from '@/types/app'
import { createClient, updateClient } from '@/fetchers/client/store'
import { ClientFields } from '@/types/forms'

type Props = {
  afterSubmit?: () => void
}

export function useClientForm({ afterSubmit }: Props) {
  const queryClient = useQueryClient()

  const clientMutation = useMutation({
    mutationFn: (data: ClientFields) =>
      data.id
        ? updateClient(data.id, {
            ...data,
            telephone: data.telephone.toString().replace(/\D/g, ''),
          })
        : createClient({
            ...data,
            telephone: data.telephone.toString().replace(/\D/g, ''),
          }),
  })

  const handleSubmit = useCallback((data: ClientFields) => {
    clientMutation
      .mutateAsync({ ...data })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ['clients'],
        })
        queryClient.removeQueries({
          queryKey: ['clients-list'],
        })
        toast(`Cliente ${data.id ? 'atualizado' : 'cadastrado'} com sucesso!`)
        afterSubmit && afterSubmit()
      })
      .catch(() =>
        toast.error(
          `Error ao ${data.id ? 'atualizar' : 'cadastrar'} cliente, tente novamente!`
        )
      )
  }, [])

  return {
    handleSubmit,
  }
}
