import { useTableState } from '@/contexts/table'
import { Column } from '@/types/app'
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export const useTable = () => {
  const [
    {
      data,
      count,
      columns,
      filters,
      limit,
      order,
      sortColumn,
      page,
      selectedRows,
      isFetching,
      selectAll,
      textsCardTableMobile,
    },
    dispatch,
  ] = useTableState()
  const [headerCheckboxChecked, setHeaderCheckboxChecked] = useState(false)
  const headerCheckboxRef = useRef<HTMLInputElement>()

  const [promptSelectAll, setPromptSelectAll] = useState(false)

  const pageCount: number = useMemo(
    () => Math.ceil(count / limit),
    [count, limit]
  )

  const headerCheckboxIndeterminate = useMemo(
    () =>
      Boolean(selectedRows.length && selectedRows.length < count) && !selectAll,
    [selectedRows, count, selectAll]
  )

  const concatSelectedRowsDedup = useCallback(
    (rows: any[]) => {
      const toinsert: any[] = []

      rows.forEach((d) => {
        if (selectedRows.includes(d)) return
        toinsert.push(d)
      })

      dispatch({ selectedRows: selectedRows.concat(toinsert) })
    },
    [selectedRows]
  )

  const handleHeaderCheckboxChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      if (!data?.length) return

      setHeaderCheckboxChecked(evt.target.checked)
      setPromptSelectAll(evt.target.checked && pageCount > 1)

      if (evt.target.checked) {
        dispatch({ selectedRows: data })
      } else {
        dispatch({ selectedRows: [], selectAll: false })
      }
    },
    [data, pageCount]
  )

  const toggleRowSelected = useCallback(
    (row: any) => {
      const checked = selectedRows.includes(row)
      dispatch({ selectAll: false })

      if (checked) {
        dispatch({ selectedRows: selectedRows.filter((v) => v !== row) })
      } else {
        concatSelectedRowsDedup([row])
      }
    },
    [selectedRows]
  )

  const handlePageChange = useCallback(({ selected }: { selected: number }) => {
    dispatch({ page: selected + 1 })
  }, [])

  const handleHeaderClick = useCallback(
    (c: Column) => {
      if (isFetching || !c.sort) return

      const diff = c.Header !== sortColumn

      switch (order) {
        case undefined:
          dispatch({ sort: c.sort, sortColumn: c.Header, order: 'ASC' })
          break

        case 'ASC':
          dispatch({
            sort: c.sort,
            sortColumn: c.Header,
            order: diff ? 'ASC' : 'DESC',
          })
          break

        case 'DESC':
          dispatch({
            sort: diff ? c.sort : undefined,
            sortColumn: diff ? c.Header : undefined,
            order: diff ? 'ASC' : undefined,
          })
          break

        default:
          break
      }
    },
    [order, sortColumn, isFetching]
  )

  useEffect(() => {
    if (selectAll && data) {
      concatSelectedRowsDedup(data)
    }
  }, [data, selectAll])

  useEffect(() => {
    if (!selectedRows.length) {
      setHeaderCheckboxChecked(false)
    }

    if (selectedRows.length === count && count > 0) {
      setHeaderCheckboxChecked(true)
    }
  }, [selectedRows, count])

  return {
    data,
    columns,
    page,
    count,
    limit,
    filters,
    headerCheckboxRef,
    headerCheckboxChecked,
    selectedRows,
    sortColumn,
    order,
    promptSelectAll,
    pageCount,
    headerCheckboxIndeterminate,
    setPromptSelectAll,
    handlePageChange,
    handleHeaderCheckboxChange,
    toggleRowSelected,
    handleHeaderClick,
    isFetching,
    setHeaderCheckboxChecked,
    textsCardTableMobile,
  }
}
