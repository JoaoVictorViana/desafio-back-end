'use client'

import { Button } from '@/components/Core/Button'
import { Form } from '@/components/Core/Form'
import { Input } from '@/components/Core/Form/Input'
import { Select } from '@/components/Core/Form/Select'
import { Flex, Grid } from '@/components/Core/Display'
import { ServiceOrder } from '@/core/entities'
import { TextArea } from '@/components/Core/Form/TextArea'
import { serviceOrderSchema } from '@/schemas/serviceOrder'
import { useState } from 'react'
import { SingleValue } from 'react-select'
import { Option } from '@/types/app'
import { useServiceOrderForm } from './hook'

type Props = {
  afterSubmit?: () => void
  data?: ServiceOrder
}

export const ServiceOrderForm = ({ afterSubmit, data }: Props) => {
  const [client, setClient] = useState('')
  const { handleSubmit, clientsOptions } = useServiceOrderForm({
    afterSubmit,
  })

  return (
    <Form
      className="flex flex-col items-center gap-10"
      schema={serviceOrderSchema}
      handleSubmit={handleSubmit}
      defaultValues={{
        cost: 0,
        ...data,
        dt_order: data?.dt_order
          ? new Date(data?.dt_order)?.toISOString().slice(0, 16)
          : '',
        client: {
          label: data?.client?.name ?? '',
          value: data?.client_id ?? '',
        },
        client_id: data?.client_id ?? '',
      }}
    >
      <Grid className="grid-cols-2 gap-5 p-8">
        <Select
          name="client"
          label="Cliente"
          options={clientsOptions}
          onChange={(option: any) =>
            setClient((option.target.value as Option<string>).value)
          }
          required
          disabled={!!data}
        />
        <Input name="client_id" type="hidden" value={client} />
        <Input
          label="Descrição"
          name="description"
          containerProps={{ className: 'col-span-2' }}
          required
          disabled={!!data}
        />
        {data && <Input label="Custo Final" name="cost" type="number" />}

        <Input
          required
          label="Custo Estimado"
          name="cost_estimated"
          type="number"
          disabled={!!data}
        />
        <Input
          label="Data"
          name="dt_order"
          type="datetime-local"
          disabled={!!data}
        />
        <Input
          type="hidden"
          name="status"
          value={data ? data.status : 'todo'}
        />
        <TextArea
          label="Observações"
          name="observation"
          containerProps={{ className: 'col-span-2' }}
        />
      </Grid>

      <Flex className="w-full justify-center gap-4">
        <Button type="button" className="mt-5" onClick={afterSubmit}>
          Cancelar
        </Button>
        <Button className="mt-5">
          {data ? 'Atualizar Ordem de Serviço' : 'Cadastrar Ordem de Serviço'}
        </Button>
      </Flex>
    </Form>
  )
}
