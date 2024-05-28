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
import { ServiceOrderStatus } from '@/core/entities'
import { ServiceOrderRepository } from '@/core/repositories/ServiceOrder/ServiceOrderRepository'
import { ServiceOrderService } from '@/core/services/ServiceOrderService'
import { serviceOrderSchema } from '@/schemas/serviceOrder'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const serviceOrderService = new ServiceOrderService()

  const serviceOrders = await serviceOrderService.getAllWithClients()
  const page = Number(request.nextUrl.searchParams.get('page') ?? 0)
  const perPage = Number(request.nextUrl.searchParams.get('per_page') ?? 0)
  const status = request.nextUrl.searchParams.get('status') ?? ''

  if (status) {
    return new NextResponse(
      JSON.stringify(serviceOrders.filter((item) => item.status === status)),
      {
        status: 200,
      }
    )
  }

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
      JSON.stringify(
        await serviceOrderRepository.save({
          ...serviceOrder,
          status: serviceOrder.status as ServiceOrderStatus,
        })
      ),
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
