import { Flex } from '@/components/Core/Display'
import { ServiceOrderBoard } from '@/components/Features/ServiceOrders/Board'

export default function ServiceOrderListPage() {
  return (
    <Flex className="flex-col gap-4 h-full mt-28 mb-14 ml-4 mr-20">
      <h1 className="text-xl font-bold text-primary-950">Ordem de Serviços</h1>

      <ServiceOrderBoard />
    </Flex>
  )
}
