/**
 * Nome do arquivo: Repository.ts
 * Data de criação: 26/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por determinar a interface
 * de implementação dos repositórios, que será utilizado
 * para determinar a integração entre a lógica de negócio e a lógica de armazenamento.
 *
 * Este script é parte o curso de ADS.
 */

export interface Repository<T> {
  all(): Promise<T[]>
  find(id: string): Promise<T | undefined>
  save(data: Partial<T>, id?: string): Promise<T>
  delete(id: string): void
}
