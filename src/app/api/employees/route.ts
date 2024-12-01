import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const employees = await prisma.employees.findMany()
    return NextResponse.json(employees)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const employee = await prisma.employees.create({
      data: body,
    })
    return NextResponse.json(employee)
  } catch {
    return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 })
  }
}
