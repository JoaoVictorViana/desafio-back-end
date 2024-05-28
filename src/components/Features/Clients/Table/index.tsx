'use client'

import { Flex } from '@/components/Core/Display'
import BaseTable from '@/components/Core/Table/BaseTable'
import columns from '@/tables/clients'
import { getClients } from '@/fetchers/client/list'
import { ClientsToolbar } from './Toolbar'

export const ClientTable = () => {
  return (
    <Flex className="flex-col gap-8 w-full">
      <BaseTable
        queryKey="clients"
        columns={columns}
        fetcher={getClients}
        emptyTitle="Ops..."
        emptyDescription="Ainda não há clientes cadastrados no sistema."
        renderControls={<ClientsToolbar />}
        rowsPerPage={15}
      />
    </Flex>
  )
}
