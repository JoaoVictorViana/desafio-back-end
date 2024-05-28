import { TableProvider } from '@/contexts/table'
import * as React from 'react'
import { Column, TableFetcher } from '@/types/app'
import { Table } from '.'
import Pagination from './Pagination'

type BaseTableProps<T, F> = {
  queryKey: string | any[]
  columns: Column<T>[]
  emptyTitle: string
  fetcher: TableFetcher<T, F>
  emptyDescription: string
  textsCardTableMobile?: Column<T>[]
  className?: string
  bodyClassName?: string
  title?: string
  rowsPerPage?: number
  renderAfterRows?: () => React.ReactElement
  renderControls?: React.ReactElement
  onRowClick?: (i: T) => void
  renderReplaceMessage?: () => React.ReactElement
  renderInRow?: (row: any) => React.ReactNode
  withPagination?: boolean
  // renderStatusRow?: (row: any) => React.ReactNode
}

const BaseTable = <T, F>({
  queryKey,
  className,
  columns,
  title,
  emptyTitle,
  emptyDescription,
  fetcher,
  renderControls,
  onRowClick,
  renderAfterRows,
  renderReplaceMessage,
  renderInRow,
  textsCardTableMobile,
  rowsPerPage,
  withPagination = true,
  bodyClassName,
}: // renderStatusRow,
BaseTableProps<T, F>) => {
  return (
    <TableProvider
      id={queryKey}
      fetcher={fetcher}
      columns={columns}
      textsCardTableMobile={textsCardTableMobile}
      limit={rowsPerPage ?? 10}
    >
      {title && (
        <h1 className="mb-4 text-title-sm font-bold text-dark-gray-500">
          {title}
        </h1>
      )}

      {renderControls}

      <Table
        className={className}
        onRowClick={onRowClick as never}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
        renderAfterRows={renderAfterRows}
        renderReplaceCenterMessage={renderReplaceMessage}
        renderInRow={renderInRow}
        bodyClassName={bodyClassName}
      />
      {withPagination && <Pagination />}
    </TableProvider>
  )
}

export default BaseTable
