/**
 * Nome do arquivo: route.ts
 * Data de criação: 26/05/2024
 * Autor: João Victor Duarte Viana
 * Matrícula: 01542090
 *
 * Descrição:
 * Este arquivo Typescript é responsável por construir as endpoint de atualizar e deletar Clientes.
 *
 * Este script é parte o curso de ADS.
 */

import repositories from '@/configs/repositories'
import { Client } from '@/core/entities'
import { ClientRepository } from '@/core/repositories/Client/ClientRepository'
import { clientSchema } from '@/schemas/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const clientRepository: ClientRepository = new repositories.Client()
  const { id: clientId } = params

  const client = await clientRepository.find(clientId)

  return new NextResponse(JSON.stringify(client), {
    status: 200,
  })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const clientRepository: ClientRepository = new repositories.Client()
  const data = await request.json()

  const { id: clientId } = params

  try {
    const client = clientSchema.parse(data)

    return new NextResponse(
      JSON.stringify(
        await clientRepository.save(client as Partial<Client>, clientId)
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
  const clientRepository: ClientRepository = new repositories.Client()

  const { id: clientId } = params

  try {
    return new NextResponse(
      JSON.stringify(await clientRepository.delete(clientId)),
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
