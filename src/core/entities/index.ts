/**
 * Nome do arquivo: index.ts
 * Data de criação: 26/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por definir as entidades
 * de Cliente e Ordem de Serviço.
 *
 * Este script é parte o curso de ADS.
 */

export type Client = {
  id?: string
  name: string
  email: string
  telephone: number
  address: string
  created_at: Date
  updated_at: Date
}

export type ServiceOrderStatus = 'todo' | 'in progress' | 'impediment' | 'done'

export type ServiceOrder = {
  id?: string
  client_id: string
  client?: Client
  description: string
  status: ServiceOrderStatus
  cost: number
  cost_estimated: number
  observation?: string
  dt_order: Date
  created_at: Date
  updated_at: Date
}
