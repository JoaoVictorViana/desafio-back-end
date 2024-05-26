/**
 * Nome do arquivo: DAO.ts
 * Data de criação: 25/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por implementar a interface
 * DAO (Data Access Object), adaptando ao Firebase.
 *
 * Este script é parte o curso de ADS.
 */

import { firebase } from '@/configs/db'
import { DAO } from '@/core/database/DAO'
import {
  DocumentData,
  PartialWithFieldValue,
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore'

export class FirebaseDAO<T extends DocumentData>
  implements DAO<PartialWithFieldValue<T>>
{
  constructor(private db = getFirestore(firebase)) {
    //
  }

  async addData(target: string, id: string, data: T): Promise<T> {
    if (!id) {
      const document = await addDoc(collection(this.db, target), data)

      return { id: document.id, ...data }
    }

    await setDoc(doc(this.db, target, id), data, {
      merge: true,
    })

    return { id, ...data }
  }

  async getData<R extends PartialWithFieldValue<T>>(
    target: string,
    id?: string,
    params?: any
  ): Promise<R[] | R | undefined> {
    return getDocs(collection(this.db, target)).then((querySnapshot) => {
      const result: R[] = []

      querySnapshot.forEach((document) => {
        result.push({ id: document.id, ...(document.data() as R) })
      })

      if (id) {
        return result.find((document) => document.id === id)
      }

      return result
    })
  }

  deleteData(target: string, id: string) {
    deleteDoc(doc(this.db, target, id))
  }
}
