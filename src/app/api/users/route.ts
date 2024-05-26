import { FirebaseDAO } from '@/core/adapters/database/dao/FirebaseDAO'
import { ClientRepositoryDAO } from '@/core/domain/repositories/Client/ClientRepositoryDAO'
import { NextRequest, NextResponse } from 'next/server'

type ResponseData = {
  message: string
}

export async function GET(request: NextRequest) {
  const dao = new ClientRepositoryDAO()

  const data = {
    name: 'JV 3',
    age: 3,
  }

  // dao.addData('teste', '4', data)

  const docs = await dao.find('4')

  return new NextResponse(JSON.stringify(docs), { status: 200 })
}
