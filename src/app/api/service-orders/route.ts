/**
 * Nome do arquivo: DAO.ts
 * Data de criação: 26/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por construir a endpoint de listagem e cadastro de Ordem de serviços.
 * Nessa endpoint é possível trazer paginado utilizando os parâmetros 'page' e 'per_pages'.
 *
 * Este script é parte o curso de ADS.
 */

import repositories from '@/configs/repositories'
import { ServiceOrderRepository } from '@/core/repositories/ServiceOrder/ServiceOrderRepository'
import { serviceOrderSchema } from '@/schemas/serviceOrder'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const serviceOrderRepository: ServiceOrderRepository =
    new repositories.ServiceOrder()

  const serviceOrders = await serviceOrderRepository.all()
  const page = Number(request.nextUrl.searchParams.get('page') ?? 0)
  const perPage = Number(request.nextUrl.searchParams.get('per_page') ?? 0)

  if (page) {
    return new NextResponse(
      JSON.stringify({
        data: [...serviceOrders.slice((page - 1) * perPage, page * perPage)],
        page,
        total: serviceOrders.length,
        perPage,
      }),
      {
        status: 200,
      }
    )
  }

  return new NextResponse(JSON.stringify(serviceOrders), {
    status: 200,
  })
}

export async function POST(request: NextRequest) {
  const serviceOrderRepository: ServiceOrderRepository =
    new repositories.ServiceOrder()
  const data = await request.json()

  try {
    const serviceOrder = serviceOrderSchema.parse({
      ...data,
      dt_order: new Date(data.dt_order),
    })

    return new NextResponse(
      JSON.stringify(await serviceOrderRepository.save(serviceOrder)),
      {
        status: 200,
      }
    )
  } catch (e) {
    return new NextResponse(e as any, {
      status: 500,
    })
  }
}
