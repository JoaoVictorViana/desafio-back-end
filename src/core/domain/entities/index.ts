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
}

export type ServiceOrder = {
    id?: string
    client_id: string
    description: string
    cost: number
    observation?: string
    dt_order: Date
}
