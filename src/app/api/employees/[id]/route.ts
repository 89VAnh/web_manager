import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    const employee = await prisma.employees.findUnique({
      where: { id },
    })
    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }
    return NextResponse.json(employee)
  } catch  {
    return NextResponse.json({ error: 'Failed to fetch employee' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const updatedEmployee = await prisma.employees.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(updatedEmployee)
  } catch  {
    return NextResponse.json({ error: 'Failed to update employee' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    await prisma.employees.delete({
      where: { id },
    })
    return NextResponse.json({ message: 'Employee deleted successfully' })
  } catch  {
    return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 })
  }
}

