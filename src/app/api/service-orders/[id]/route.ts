/**
 * Nome do arquivo: route.ts
 * Data de criação: 26/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por construir as endpoint de atualizar e deletar Ordem de serviço.
 *
 * Este script é parte o curso de ADS.
 */

import repositories from '@/configs/repositories'
import { ServiceOrderStatus } from '@/core/entities'
import { ServiceOrderRepository } from '@/core/repositories/ServiceOrder/ServiceOrderRepository'
import { serviceOrderSchema } from '@/schemas/serviceOrder'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const serviceOrderRepository: ServiceOrderRepository =
    new repositories.ServiceOrder()
  const { id: serviceOrderId } = params

  const serviceOrder = await serviceOrderRepository.find(serviceOrderId)

  return new NextResponse(JSON.stringify(serviceOrder), {
    status: 200,
  })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const serviceOrderRepository: ServiceOrderRepository =
    new repositories.ServiceOrder()
  const data = await request.json()

  const { id: serviceOrderId } = params

  try {
    const serviceOrder = serviceOrderSchema.parse({
      ...data,
      dt_order: new Date(data.dt_order),
    })

    return new NextResponse(
      JSON.stringify(
        await serviceOrderRepository.save(
          {
            ...serviceOrder,
            status: serviceOrder.status as ServiceOrderStatus,
          },
          serviceOrderId
        )
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const serviceOrderRepository: ServiceOrderRepository =
    new repositories.ServiceOrder()

  const { id: serviceOrderId } = params

  try {
    return new NextResponse(
      JSON.stringify(await serviceOrderRepository.delete(serviceOrderId)),
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
