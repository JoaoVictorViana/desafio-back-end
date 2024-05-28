/**
 * Nome do arquivo: client.ts
 * Data de criação: 26/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por validar os campos do Clientes.
 *
 * Este script é parte o curso de ADS.
 */
import validators from '@/enums/validators'
import { z } from 'zod'

export const serviceOrderSchema = z.object({
  id: z.string().nullish(),
  client_id: z.string().nullish(),
  client: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .nullish(),
  description: z.string().min(1, validators.REQUIRED),
  status: z.string().min(1, validators.REQUIRED),
  cost: z.number().nullable().or(z.string().nullable()),
  cost_estimated: z
    .number()
    .min(1, validators.REQUIRED)
    .or(z.string().min(1, validators.REQUIRED)),
  observation: z.string(),
  dt_order: z.string().or(z.date()),
})
