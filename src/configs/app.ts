/**
 * Nome do arquivo: app.ts
 * Data de criação: 25/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por criar
 * as configurações da aplicação.
 *
 * Este script é parte o curso de ADS.
 */

export const DB_CONNECTION_DRIVER =
  process.env.NEXT_PUBLIC_DB_CONNECTION_DRIVER ?? 'firebase'
