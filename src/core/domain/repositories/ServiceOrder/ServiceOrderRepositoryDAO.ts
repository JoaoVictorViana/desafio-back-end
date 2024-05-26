/**
 * Nome do arquivo: ClientRepositoryDAO.ts
 * Data de criação: 26/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por implementar a interface
 * do repositório de Ordem de Serviço.
 *
 * Este script é parte o curso de ADS.
 */

import { DAO } from '@/core/facades/DAO'
import { ServiceOrder } from '../../entities'
import { ServiceOrderRepository } from './ServiceOrderRepository'

export class ServiceOrderRepositoryDAO implements ServiceOrderRepository {
  async all(): Promise<ServiceOrder[]> {
    const serviceOrders = await DAO.getData<ServiceOrder[]>(
      'service_orders',
      ''
    )

    if (!serviceOrders) return []

    return serviceOrders
  }

  async delete(id: string) {
    DAO.deleteData('service_orders', id)
  }

  async find(id: string): Promise<ServiceOrder | undefined> {
    return DAO.getData<ServiceOrder>('service_orders', id)
  }

  async save(
    data: Partial<ServiceOrder>,
    id?: string | undefined
  ): Promise<ServiceOrder> {
    const serviceOrder = await DAO.addData('service_orders', id ?? '', data)

    return { ...serviceOrder } as ServiceOrder
  }
}
