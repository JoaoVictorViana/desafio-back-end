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
  client_id: z.string().min(1, validators.REQUIRED),
  description: z.string().min(1, validators.REQUIRED),
  cost: z.number().min(1, validators.REQUIRED),
  observation: z.string(),
  dt_order: z.date(),
})
