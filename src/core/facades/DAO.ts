/**
 * Nome do arquivo: DAO.ts
 * Data de criação: 26/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por implementar o design pattern Facade.
 * Para facilitar a criação do DAO.
 *
 * Este script é parte o curso de ADS.
 */

import { DB_CONNECTION_DRIVER } from '@/configs/app'
import { DocumentData, PartialWithFieldValue } from 'firebase/firestore'
import { FirebaseDAO } from '../adapters/database/dao/FirebaseDAO'

export abstract class DAO {
  public static async addData<T extends DocumentData>(
    target: string,
    id: string,
    data: T
  ) {
    switch (DB_CONNECTION_DRIVER) {
      case 'firebase': {
        return new FirebaseDAO().addData(target, id, data)
      }
      default:
        throw new Error('DB Driver not found')
    }
  }

  public static async getData<T>(target: string, id: string, params?: any) {
    switch (DB_CONNECTION_DRIVER) {
      case 'firebase': {
        return new FirebaseDAO().getData(target, id, params) as T
      }
      default:
        throw new Error('DB Driver not found')
    }
  }

  public static async deleteData<T>(target: string, id: string, params?: any) {
    switch (DB_CONNECTION_DRIVER) {
      case 'firebase': {
        return new FirebaseDAO().deleteData(target, id) as T
      }
      default:
        throw new Error('DB Driver not found')
    }
  }
}
