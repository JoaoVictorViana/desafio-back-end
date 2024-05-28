import { Flex } from '@/components/Core/Display'
import { ClientTable } from '@/components/Features/Clients/Table'

export default function ClientListPage() {
  return (
    <Flex className="flex-col gap-4 h-full mt-28 mb-14 ml-4 mr-20">
      <h1 className="text-xl font-bold text-primary-950">Clientes</h1>

      <ClientTable />
    </Flex>
  )
}
