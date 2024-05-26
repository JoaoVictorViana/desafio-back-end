/**
 * Nome do arquivo: DAO.ts
 * Data de criação: 26/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por mapear os repositorios.
 *
 * Este script é parte o curso de ADS.
 */

import { ClientRepositoryDAO } from '@/core/repositories/Client/ClientRepositoryDAO'
import { ServiceOrderRepositoryDAO } from '@/core/repositories/ServiceOrder/ServiceOrderRepositoryDAO'

export default {
  Client: ClientRepositoryDAO,
  ServiceOrder: ServiceOrderRepositoryDAO,
} as const
