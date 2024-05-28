import { zodResolver } from '@hookform/resolvers/zod'
import { HTMLAttributes, HTMLProps, PropsWithChildren } from 'react'
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { ZodType } from 'zod'

type FormProps<T extends FieldValues> = {
  handleSubmit: SubmitHandler<T>
  defaultValues?: DefaultValues<T>
  schema?: ZodType<T>
} & HTMLProps<HTMLFormElement>

export function Form<TFields extends FieldValues = FieldValues>({
  children,
  defaultValues,
  schema,
  handleSubmit,
  ...formProps
}: PropsWithChildren<FormProps<TFields>>) {
  const methods = useForm({
    defaultValues,
    resolver: schema && zodResolver(schema),
  })

  return (
    <FormProvider {...methods}>
      <form
        {...formProps}
        onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
          // this part is for stopping parent forms to trigger their submit
          if (event) {
            // sometimes not true, e.g. React Native
            if (typeof event.preventDefault === 'function') {
              event.preventDefault()
            }
            if (typeof event.stopPropagation === 'function') {
              // prevent any outer forms from receiving the event too
              event.stopPropagation()
            }
          }

          return methods.handleSubmit(handleSubmit)(event)
        }}
      >
        {children}
      </form>
    </FormProvider>
  )
}
