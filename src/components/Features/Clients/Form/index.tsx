'use client'

import { Button } from '@/components/Core/Button'
import { Form } from '@/components/Core/Form'
import { Input } from '@/components/Core/Form/Input'
import { Select } from '@/components/Core/Form/Select'
import { Flex, Grid } from '@/components/Core/Display'
import { Client } from '@/core/entities'
import { clientSchema } from '@/schemas/client'
import { useClientForm } from './hook'

type Props = {
  afterSubmit?: () => void
  data?: Client
}

export const ClientForm = ({ afterSubmit, data }: Props) => {
  const { handleSubmit } = useClientForm({
    afterSubmit,
  })

  return (
    <Form
      className="flex flex-col items-center gap-10"
      schema={clientSchema}
      handleSubmit={handleSubmit}
      defaultValues={{
        id: '',
        ...data,
        telephone: data?.telephone.toString() ?? '',
      }}
    >
      <Grid className="grid-cols-2 gap-5 p-8">
        <Input
          label="Nome"
          name="name"
          containerProps={{ className: 'col-span-2' }}
        />
        <Input label="E-mail" name="email" />
        <Input
          mask="(99) 99999-9999"
          label="Telefone"
          name="telephone"
          defaultValue={data?.telephone}
        />
        <Input
          label="Endereço"
          name="address"
          containerProps={{ className: 'col-span-2' }}
        />
      </Grid>

      <Flex className="w-full justify-center gap-4">
        <Button type="button" className="mt-5" onClick={afterSubmit}>
          Cancelar
        </Button>
        <Button className="mt-5">
          {data ? 'Atualizar Ciente' : 'Cadastrar Cliente'}
        </Button>
      </Flex>
    </Form>
  )
}
