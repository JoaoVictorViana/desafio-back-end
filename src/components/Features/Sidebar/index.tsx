'use client'

import { Flex } from '@/components/Core/Display'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const StandarSidebar = () => {
  const pathname = usePathname()

  return (
    <Flex
      as="header"
      className="flex-col py-3 justify-between w-[15vw] items-center h-full shadow-[0px_0px_8px_#00000029] relative"
    >
      <Flex className="flex-col items-center w-full">
        <Link
          href="/"
          className="flex mt-10 items-center justify-center text-3xl font-bold pb-10 border-b border-b-primary-950 w-full"
        >
          Sys.SO
        </Link>
        <Link
          href="/clients"
          className={`${
            pathname === '/clients' && 'menu-item--active'
          } menu-item group`}
        >
          Clientes
        </Link>
        <Link
          href="/service-orders"
          className={`${
            pathname === '/service-orders' && 'menu-item--active'
          } menu-item group`}
        >
          Ordem de Serviços
        </Link>
      </Flex>
    </Flex>
  )
}
