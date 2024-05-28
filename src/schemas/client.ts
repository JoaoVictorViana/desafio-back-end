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

export const clientSchema = z.object({
  id: z.string().nullish(),
  name: z.string().min(1, validators.REQUIRED),
  email: z.string().email(validators.EMAIL).min(1, validators.REQUIRED),
  telephone: z
    .number()
    .min(1, validators.REQUIRED)
    .or(z.string().min(1, validators.REQUIRED)),
  address: z.string().min(1, validators.REQUIRED),
})
