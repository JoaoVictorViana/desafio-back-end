/**
 * Nome do arquivo: ClientRepository.ts
 * Data de criação: 26/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por determinar a interface
 * de implementação do repositório de Cliente, que será utilizado
 * para determinar quais funcionalidades necessárias para a entidade Cliente.
 *
 * Este script é parte o curso de ADS.
 */

import { Client } from '../../entities'
import { Repository } from '../Repository'

export interface ClientRepository extends Repository<Client> {}
