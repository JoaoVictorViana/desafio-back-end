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

import { firebase } from "@/configs/db";
import { DAO } from "@/domain/database/DAO";
import { DocumentData, PartialWithFieldValue, collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";

export class FirebaseDAO<T extends DocumentData> implements DAO<PartialWithFieldValue<T>> {
    constructor(private db = getFirestore(firebase)) {}

    async addData(target: string, id: string, data: T): Promise<T> {
        await setDoc(doc(this.db, target, id), data, {
            merge: true,
        })

        return data
    }

    async getData(target: string, id?: string, params?: any): Promise<T[] | T | undefined> {
        return getDocs(collection(this.db, target)).then(querySnapshot => {
            let result: T[] = []
    
            querySnapshot.forEach((doc) => {
                result.push({id: doc.id, ...doc.data() as T})
            });
    
            if (id) {
                return result.find(doc => doc.id === id)
            }
            
            return result
        })
    }
}