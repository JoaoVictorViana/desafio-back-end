import { ClientTableActions } from '@/components/Features/Clients/Table/Actions'
import { Client } from '@/core/entities'
import { Column } from '@/types/app'

export default [
  {
    Header: 'Nome',
    align: 'center',
    accessor: (data) => data.name,
  },
  {
    Header: 'E-mail',
    align: 'center',
    accessor: (data) => data.email,
  },
  {
    Header: 'Telefone',
    align: 'center',
    accessor: (data) => data.telephone,
  },
  // {
  // Header: 'Data de criação',
  // align: 'center',
  // accessor: (data) =>
  //   new Date(data.created_at).toLocaleString('pt-BR').replace(',', ' -'),
  // },
  {
    Header: 'Ações',
    align: 'center',
    isAction: true,
    withClick: false,
    accessor: (data) => <ClientTableActions client={data} />,
  },
] as Column<Client>[]
