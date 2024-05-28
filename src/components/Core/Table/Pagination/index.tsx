'use client'

import { useTableState } from '@/contexts/table'
import { FC, useCallback, useMemo } from 'react'
import ReactPaginate from 'react-paginate'
import ArrowRightIcon from '@/assets/icons/table/arrowRight.svg'
import ArrowLeftIcon from '@/assets/icons/table/arrowLeft.svg'

const BaseTablePagination: FC = () => {
  const [{ count, page, limit }, dispatch] = useTableState()

  const pageCount = useMemo(() => Math.ceil(count / limit), [count, limit])

  const handlePageChange = useCallback(
    ({ selected }: { selected: number }) => {
      dispatch({ page: selected + 1 })
    },
    [dispatch]
  )

  const handleZeroPageCount = useCallback(() => null, [])

  if (!count) return null

  return (
    <div className="py-6">
      <ReactPaginate
        pageCount={pageCount}
        forcePage={page - 1}
        previousLabel={<ArrowLeftIcon className="table-pagination-icon" />}
        nextLabel={<ArrowRightIcon className="table-pagination-icon" />}
        previousLinkClassName="border text-primary-950 border-dark-gray-300 dark: w-8 h-8 mr-2 rounded-full block flex items-center justify-center select-none"
        nextLinkClassName="border border-dark-gray-300 w-8 h-8 ml-2 rounded-full block flex items-center justify-center select-none"
        onPageChange={handlePageChange}
        renderOnZeroPageCount={handleZeroPageCount}
        containerClassName="flex w-full justify-center space-x-2 items-center"
        activeLinkClassName="[color:white] bg-primary-300 border-none"
        breakLinkClassName="text-light-gray-500 select-none"
        pageLinkClassName="select-none text-body-sm text-light-gray-500 rounded-full w-8 h-8 flex items-center justify-center border border-light-gray-300"
      />
    </div>
  )
}

export default BaseTablePagination
