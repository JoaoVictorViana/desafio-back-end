import { FirebaseDAO } from '@/adapters/database/dao/FirebaseDAO'
import { NextRequest, NextResponse } from 'next/server'
 
type ResponseData = {
  message: string
}
 
export async function GET (request: NextRequest){
    const dao = new FirebaseDAO()

    const data = {
      name: 'JV 3',
      age: 3
  }

    // dao.addData('teste', '4', data)

    const docs = await dao.getData('teste')

    return new NextResponse(JSON.stringify(docs), { status: 200 })
}