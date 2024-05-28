import { Flex } from '@/components/Core/Display'

export const SkeletonItemList = () => (
  <Flex className="board-card">
    <div className="animate-pulse bg-light-gray-500 w-32 h-2 rounded-lg" />
    <div className="animate-pulse bg-light-gray-500 w-32 h-4 rounded-lg" />
    <div className="animate-pulse bg-light-gray-500 w-32 h-2 rounded-lg" />
  </Flex>
)
