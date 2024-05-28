'use client'

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  Reducer,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { useQuery } from '@tanstack/react-query'
import { Column, TableFetcher } from '@/types/app'

export interface TableState<T, F> {
  data: T[] | undefined
  sort?: string
  sortColumn?: string
  order?: 'ASC' | 'DESC'
  isFetching: boolean
  columns: Column<T>[]
  textsCardTableMobile?: Column<T>[]
  filters: F
  limit: number
  selectedRows: T[]
  page: number
  count: number
  selectAll: boolean
  showSelect?: boolean
  search: string
}

export type TableProviderProps<T, F> = {
  id: string | string[]
  fetcher: TableFetcher<T, F>
  columns: Column<T>[]
  textsCardTableMobile?: Column<T>[]
  limit?: number
}

const TableContext = createContext([] as unknown)

export const useTableState = <T, F>() => {
  const c = useContext(TableContext)
  if (!c)
    throw new Error(
      "'useTableState' must be called inside a 'TableProvider' component"
    )
  return c as [
    TableState<T, F>,
    Dispatch<Partial<TableState<T, F>>>,
    T | undefined,
    () => void,
    (row: T) => void,
  ]
}

export const TableProvider = <T, F>({
  id,
  columns,
  fetcher,
  children,
  limit = 10,
  textsCardTableMobile,
}: PropsWithChildren<TableProviderProps<T, F>>) => {
  type A = Reducer<TableState<T, F>, Partial<TableState<T, F>>>

  const reducer = useCallback<A>(
    (state, update) => ({ ...state, ...update }),
    []
  )

  const initialState = useMemo<TableState<T, F>>(
    () => ({
      data: undefined,
      columns,
      search: '',
      filters: {} as F,
      selectedRows: [],
      limit,
      page: 1,
      count: 0,
      isFetching: true,
      selectAll: false,
      textsCardTableMobile,
      showSelect: false,
    }),
    [columns, limit, textsCardTableMobile]
  )

  const [state, dispatch] = useReducer(reducer, initialState)
  const [selectedRow, setSelectedRow] = useState<T | undefined>()

  const { data, isFetching } = useQuery({
    queryKey: [
      ...(Array.isArray(id) ? id : [id]),
      {
        page: state.page,
        limit,
        filters: state.filters,
        sort: state.sort,
        order: state.order,
        search: state.search,
      },
    ],
    queryFn: () =>
      fetcher({
        page: state.page,
        limit,
        sort: state.sort,
        order: state.order,
        filters: state.filters,
        search: state.search,
      }),
  })

  const resetSelectedRow = useCallback(() => setSelectedRow(undefined), [])
  const changeSelectedRow = useCallback((row: T) => setSelectedRow(row), [])

  useEffect(() => {
    dispatch({ data: data?.data, count: data?.total })
    resetSelectedRow()
  }, [data])

  useEffect(() => {
    dispatch({ page: 1, selectedRows: [] })
    resetSelectedRow()
  }, [state.limit, state.filters])

  useEffect(() => {
    dispatch({ isFetching })
    resetSelectedRow()
  }, [isFetching])

  useEffect(
    () => dispatch({ columns, textsCardTableMobile }),
    [columns, textsCardTableMobile]
  )

  return (
    <TableContext.Provider
      value={useMemo(
        () => [
          state,
          dispatch,
          selectedRow,
          resetSelectedRow,
          changeSelectedRow,
        ],
        [state, dispatch, selectedRow]
      )}
    >
      {children}
    </TableContext.Provider>
  )
}
