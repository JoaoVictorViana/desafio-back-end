import { Button } from '@/components/Core/Button'
import { Flex } from '@/components/Core/Display'
import { Modal } from '@/components/Core/Modal'
import { useState } from 'react'
import { ClientForm } from '../../Form'

export const ClientsToolbar = () => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleOpenChangeModal = (open: boolean) => {
    setOpenModal(open)
  }

  return (
    <Flex className="w-full justify-end">
      <Button
        className="cursor-pointer flex items-center gap-1"
        onClick={handleOpenModal}
      >
        <span>Adicionar</span>
      </Button>

      <Modal
        open={openModal}
        onChangeOpen={handleOpenChangeModal}
        className="!w-auto !h-auto"
        title="Cadastrar Cliente"
      >
        <ClientForm afterSubmit={() => setOpenModal(false)} />
      </Modal>
    </Flex>
  )
}
