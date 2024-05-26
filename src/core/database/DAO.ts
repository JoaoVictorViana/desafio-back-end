/**
 * Nome do arquivo: DAO.ts
 * Data de criação: 25/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por determinar a interface
 * de implementação de DAO (Data Access Object), que será utilizado
 * para determinar a lógica de armazenamento.
 *
 * Este script é parte o curso de ADS.
 */

export interface DAO<T> {
  addData(target: string, id: string, data: T): Promise<T>
  getData(target: string, id: string, params: any): Promise<T[] | T | undefined>
  deleteData(target: string, id: string, params: any): void
}
