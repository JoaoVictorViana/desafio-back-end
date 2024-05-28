import { Flex, Grid } from '@/components/Core/Display'
import { Modal } from '@/components/Core/Modal'
import { Client } from '@/core/entities'
import { deleteClient } from '@/fetchers/client/delete'
import { faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { Input } from '@/components/Core/Input'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ClientForm } from '../../Form'

type Props = {
  client: Client
}

export const ClientTableActions = ({ client }: Props) => {
  const route = useRouter()
  const queryClient = useQueryClient()
  const [updateModal, setUpdateModal] = useState(false)
  const [infoModal, setInfoModal] = useState(false)

  const handleChangeUpdateModal = () => {
    setUpdateModal((prev) => !prev)
  }

  const handleChangeInfoModal = () => {
    setInfoModal((prev) => !prev)
  }

  const deleteClientMutation = useMutation({
    mutationFn: () => deleteClient(client.id?.toString() ?? ''),
  })

  const handleDelete = useCallback(() => {
    withReactContent(Swal)
      .fire({
        title: 'Deletar Cliente',
        text: 'Você realmente deseja deletar este cliente?',
        confirmButtonText: 'Sim',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        icon: 'question',
      })
      .then(async (value: any) => {
        if (!value.isConfirmed) return
        if (!client.id) return

        await deleteClientMutation.mutateAsync()
        toast('Cliente deletado com sucesso!')
      })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ['clients'],
        })
      })
      .catch(() =>
        toast.error(
          'Houve algum problema ao deletar esse cliente, tente novamente!'
        )
      )
  }, [client])

  return (
    <Flex className="justify-center items-center gap-3">
      <FontAwesomeIcon
        icon={faSearch}
        className="w-5"
        onClick={handleChangeInfoModal}
      />

      <FontAwesomeIcon
        icon={faPen}
        className="w-5"
        onClick={handleChangeUpdateModal}
      />

      <FontAwesomeIcon icon={faTrash} className="w-5" onClick={handleDelete} />

      <Modal
        open={updateModal}
        onChangeOpen={handleChangeUpdateModal}
        className="!w-auto !h-auto"
        title="Atualizar Cliente"
      >
        <ClientForm afterSubmit={handleChangeUpdateModal} data={client} />
      </Modal>

      <Modal
        open={infoModal}
        onChangeOpen={handleChangeInfoModal}
        className="!w-auto !h-auto"
        title="Dados do Cliente"
      >
        <Grid className="grid-cols-2 gap-5 p-8">
          <Input
            label="Nome"
            name="name"
            disabled
            readOnly
            containerProps={{ className: 'col-span-2' }}
            value={client.name}
          />
          <Input
            label="E-mail"
            name="email"
            disabled
            readOnly
            value={client.email}
          />
          <Input
            mask="(99) 99999-9999"
            label="Telefone"
            name="telephone"
            disabled
            readOnly
            defaultValue={client?.telephone}
          />
          <Input
            label="Endereço"
            name="address"
            disabled
            readOnly
            containerProps={{ className: 'col-span-2' }}
            value={client.address}
          />
        </Grid>
      </Modal>
    </Flex>
  )
}
