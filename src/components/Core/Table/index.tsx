'use client'

import { FC, MouseEvent, useCallback, useMemo } from 'react'
import ArrowSortIcon from '@/assets/icons/table/arrowSort.svg'
import ArrowDownIcon from '@/assets/icons/table/arrowDown.svg'
import ArrowUpIcon from '@/assets/icons/table/arrowUp.svg'
import EmptyIcon from '@/assets/icons/table/empty.svg'
import { useTable } from './hook'
import { Input } from '../Input'

export type TableProps = {
  className?: string
  bodyClassName?: string
  emptyTitle?: string
  emptyDescription?: string
  withCheckbox?: boolean
  renderReplaceCenterMessage?: () => React.ReactNode
  renderAfterRows?: () => React.ReactNode
  renderInRow?: (row: any) => React.ReactNode
  onRowClick?: (row: unknown) => void
}

const emptyTitleClassName =
  'text-center text-title-xs font-bold text-dark-gray-500'
const emptyDescriptionClassName =
  'whitespace-pre-line text-center text-body-md font-medium'
const emptyIconClassName = 'h-8 w-8 text-light-gray-500'

const alignHeaderWithSortClass: { [key: string]: string } = {
  right: 'justify-end',
  left: 'justify-start',
  center: 'justify-center',
}

export const Table: FC<TableProps> = ({
  className,
  emptyTitle,
  emptyDescription,
  onRowClick,
  renderInRow,
  renderAfterRows,
  renderReplaceCenterMessage,
  withCheckbox,
  bodyClassName,
}) => {
  const {
    data,
    columns,
    filters,
    limit,
    // headerCheckboxIndeterminate,
    headerCheckboxChecked,
    selectedRows,
    sortColumn,
    order,
    // promptSelectAll,
    handleHeaderCheckboxChange,
    toggleRowSelected,
    handleHeaderClick,
    // setPromptSelectAll,
  } = useTable()

  const searchkeys = useMemo(
    () => Object.keys(filters as Record<string, unknown>).length,
    [filters]
  )

  const handleClick = useCallback(
    (evt: MouseEvent<HTMLInputElement>) => evt.stopPropagation(),
    []
  )

  return (
    <div className="relative">
      <div className={`overflow-auto ${className}`}>
        <table cellPadding={0} className="w-full border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="">
              {withCheckbox && (
                <th align="center" className="w-[30px] px-2">
                  <Input
                    type="checkbox"
                    name="oz-table-select-all"
                    checked={headerCheckboxChecked}
                    onChange={handleHeaderCheckboxChange}
                  />
                </th>
              )}

              {columns.map((column) => {
                return (
                  <th
                    key={String(column.accessor)}
                    align={column.align || 'center'}
                    onClick={() => handleHeaderClick(column)}
                    style={{ width: column.width }}
                    className={`2xl:!w-auto ${!column.isAction && 'p-4'} ${
                      column.sort && 'cursor-pointer'
                    }`}
                  >
                    {!column.sort ? (
                      <p className="text-sm font-bold overflow-hidden text-ellipsis text-dark-gray-950">
                        {column.Header}
                      </p>
                    ) : (
                      <div
                        className={`flex items-center ${
                          alignHeaderWithSortClass[column.align ?? 'left']
                        } space-x-2`}
                      >
                        <p className="text-sm font-bold overflow-hidden text-ellipsis text-dark-gray-950">
                          {column.Header}
                        </p>
                        {(order === undefined ||
                          sortColumn !== column.Header) && (
                          <span className="table-sort-icon w-8 h-8 bg-light-gray-50 rounded-full flex items-center justify-center">
                            <ArrowSortIcon />
                          </span>
                        )}
                        {sortColumn === column.Header && (
                          <>
                            {order === 'ASC' && (
                              <span className="table-sort-icon w-8 h-8 bg-light-gray-50 rounded-full flex items-center justify-center">
                                <ArrowDownIcon />
                              </span>
                            )}
                            {order === 'DESC' && (
                              <span className="table-sort-icon w-8 h-8 bg-light-gray-50 rounded-full flex items-center justify-center">
                                <ArrowUpIcon />
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody className={`${bodyClassName ?? ''} w-full`}>
            {!data &&
              [...new Array(limit)].map((_, k) => (
                <tr key={`table_row_${k + 1}`} className="h-16">
                  {[...new Array(columns.length + (renderInRow ? 2 : 1))].map(
                    (item, l) => (
                      <td key={`row_${l + 1}`} className="relative">
                        <div className="absolute inset-x-0 inset-y-2 animate-pulse bg-light-gray-200" />
                      </td>
                    )
                  )}
                </tr>
              ))}

            {data &&
              data.map((row, rowI) => (
                <tr
                  key={`r-${rowI + 1}`}
                  className="w-full cursor-pointer first:border-t-0 last:border-b-0  border-y border-light-gray-50 relative after:absolute after:inset-y-2 after:inset-x-0 after:z-[-1] after:rounded-lg after:bg-[transparent] after:content-[''] hover:bg-primary-400 hover:text-white group"
                >
                  {renderInRow && renderInRow(row)}
                  {withCheckbox && (
                    <td
                      align="center"
                      className="py-4 px-2 text-light-gray-500"
                    >
                      <Input
                        type="checkbox"
                        name={`ava-table-checkbox-${rowI}`}
                        onClick={handleClick}
                        onChange={() => toggleRowSelected(row)}
                        checked={selectedRows.includes(row)}
                      />
                    </td>
                  )}

                  {columns.map(
                    (
                      {
                        accessor,
                        truncate,
                        align,
                        withClick = true,
                        isAction,
                        width,
                        tooltip,
                      },
                      cellI
                    ) => {
                      const text = accessor(row)

                      return (
                        <td
                          aria-hidden="true"
                          onClick={() =>
                            withClick && onRowClick && onRowClick(row)
                          }
                          key={`c-${cellI + 1}`}
                          align={align || 'center'}
                          style={{
                            width: tooltip || !width ? 'auto' : width,
                          }}
                          className={`text-primary-gray-950 2xl:text-sm text-xs  ${
                            isAction
                              ? 'table-action--invisible group-hover:table-action--visible w-20 h-15'
                              : 'py-4 px-2 2xl:!w-auto'
                          }`}
                        >
                          {truncate && typeof text === 'string' && !tooltip && (
                            <span
                              title={text}
                              className="flex items-center justify-center"
                            >
                              {text}
                            </span>
                          )}

                          {typeof text === 'string' && tooltip && text}

                          {(!truncate || typeof text !== 'string') &&
                            !tooltip &&
                            text}
                        </td>
                      )
                    }
                  )}
                </tr>
              ))}

            {data && data.length > 0 && renderAfterRows && renderAfterRows()}
          </tbody>
        </table>
      </div>

      {data && data.length < 1 && (
        <span className="sticky left-0 block">
          <section className="mx-auto flex max-w-md flex-col items-center justify-center space-y-4 py-12 px-6">
            {!renderReplaceCenterMessage &&
              searchkeys < 1 &&
              (emptyTitle || emptyDescription) && (
                <>
                  <span className={emptyIconClassName}>
                    <EmptyIcon />
                  </span>
                  {emptyTitle && (
                    <h2 className={emptyTitleClassName}>{emptyTitle}</h2>
                  )}
                  {emptyDescription && (
                    <p className={emptyDescriptionClassName}>
                      {emptyDescription}
                    </p>
                  )}
                </>
              )}

            {!renderReplaceCenterMessage && searchkeys > 0 && (
              <>
                <h2 className={emptyTitleClassName}>Sem registro</h2>
                <p className={emptyDescriptionClassName}>
                  Não foi encontrado nenhum registro no sistema.
                </p>
              </>
            )}

            {renderReplaceCenterMessage && renderReplaceCenterMessage()}
          </section>
        </span>
      )}
    </div>
  )
}
