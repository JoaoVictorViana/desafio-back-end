/**
 * Nome do arquivo: ClientRepositoryDAO.ts
 * Data de criação: 26/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por implementar funcionalidades específicas
 * da entitade Ordem de Serviço.
 *
 * Este script é parte o curso de ADS.
 */
import repositories from '@/configs/repositories'
import { ClientRepository } from '../repositories/Client/ClientRepository'
import { ServiceOrderRepository } from '../repositories/ServiceOrder/ServiceOrderRepository'

export class ServiceOrderService {
  constructor(
    private clientRepository: ClientRepository = new repositories.Client(),
    private serviceOrderRepository: ServiceOrderRepository = new repositories.ServiceOrder()
  ) {
    //
  }

  async getAllWithClients() {
    const [clients, serviceOrders] = await Promise.all([
      this.clientRepository.all(),
      this.serviceOrderRepository.all(),
    ])

    return serviceOrders.map((serviceOrder) => ({
      ...serviceOrder,
      client: clients.find((client) => client.id === serviceOrder.client_id),
    }))
  }
}
