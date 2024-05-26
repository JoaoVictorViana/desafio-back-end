/**
 * Nome do arquivo: ClientRepository.ts
 * Data de criação: 26/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por determinar a interface
 * de implementação do repositório de Ordem de Serviço, que será utilizado
 * para determinar quais funcionalidades necessárias para a entidade Ordem de Serviço.
 *
 * Este script é parte o curso de ADS.
 */

import { ServiceOrder } from '../../entities'
import { Repository } from '../Repository'

export interface ServiceOrderRepository extends Repository<ServiceOrder> {}
