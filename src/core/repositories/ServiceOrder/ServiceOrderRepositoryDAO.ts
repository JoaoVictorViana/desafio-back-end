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

const SECONDS_TO_MILISECONDS = 1000

export class ServiceOrderRepositoryDAO implements ServiceOrderRepository {
  async all(): Promise<ServiceOrder[]> {
    const serviceOrders = await DAO.getData<ServiceOrder[]>(
      'service_orders',
      ''
    )

    if (!serviceOrders) return []

    return serviceOrders
      .sort((a, b) => (a.created_at > b.created_at ? 1 : -1))
      .map((serviceOrder) => ({
        ...serviceOrder,
        dt_order: new Date(
          (serviceOrder.dt_order as unknown as { seconds: number }).seconds *
            SECONDS_TO_MILISECONDS
        ),
      }))
  }

  async delete(id: string) {
    DAO.deleteData('service_orders', id)
  }

  async find(id: string): Promise<ServiceOrder | undefined> {
    return DAO.getData<ServiceOrder>('service_orders', id).then((data) => ({
      ...data,
      dt_order: new Date(
        (data.dt_order as unknown as { seconds: number }).seconds *
          SECONDS_TO_MILISECONDS
      ),
    }))
  }

  async save(
    data: Partial<Omit<ServiceOrder, 'id'>>,
    id?: string | undefined
  ): Promise<ServiceOrder> {
    const serviceOrder = await DAO.addData('service_orders', id ?? '', data)

    return { ...serviceOrder } as ServiceOrder
  }
}
