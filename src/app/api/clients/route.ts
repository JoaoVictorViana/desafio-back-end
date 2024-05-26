/**
 * Nome do arquivo: route.ts
 * Data de criação: 26/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por construir as endpoint de listagem e cadastro de Clientes.
 * Nessa endpoint é possível trazer paginado utilizando os parâmetros 'page' e 'per_pages'.
 *
 * Este script é parte o curso de ADS.
 */

import repositories from '@/configs/repositories'
import { Client } from '@/core/entities'
import { ClientRepository } from '@/core/repositories/Client/ClientRepository'
import { clientSchema } from '@/schemas/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const clientRepository: ClientRepository = new repositories.Client()

  const clients = await clientRepository.all()
  const page = Number(request.nextUrl.searchParams.get('page') ?? 0)
  const perPage = Number(request.nextUrl.searchParams.get('per_page') ?? 0)

  if (page) {
    return new NextResponse(
      JSON.stringify({
        data: [...clients.slice((page - 1) * perPage, page * perPage)],
        page,
        total: clients.length,
        perPage,
      }),
      {
        status: 200,
      }
    )
  }

  return new NextResponse(JSON.stringify(clients), {
    status: 200,
  })
}

export async function POST(request: NextRequest) {
  const clientRepository: ClientRepository = new repositories.Client()
  const data = await request.json()

  try {
    const client = clientSchema.parse(data)

    return new NextResponse(
      JSON.stringify(await clientRepository.save(client)),
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
