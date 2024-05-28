/**
 * Nome do arquivo: ClientRepositoryDAO.ts
 * Data de criação: 26/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por implementar a interface
 * do repositório de Cliente.
 *
 * Este script é parte o curso de ADS.
 */

import { DAO } from '@/core/facades/DAO'
import { Client } from '../../entities'
import { ClientRepository } from './ClientRepository'

export class ClientRepositoryDAO implements ClientRepository {
  async all(): Promise<Client[]> {
    const clients = await DAO.getData<Client[]>('clients', '')

    if (!clients) return []

    return clients.sort((a, b) => (a.created_at > b.created_at ? 1 : -1))
  }

  async delete(id: string) {
    DAO.deleteData('clients', id)
  }

  async find(id: string): Promise<Client | undefined> {
    return DAO.getData<Client>('clients', id)
  }

  async save(data: Partial<Client>, id?: string | undefined): Promise<Client> {
    const client = await DAO.addData('clients', id ?? '', data)

    return { ...client } as Client
  }
}
