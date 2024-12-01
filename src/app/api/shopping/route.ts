import prisma from '@/lib/prisma';
import { customers, products } from '@prisma/client';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customerInfo, selectedProducts } = body

    const customers : customers[] = []
    // Create the customer and associate the selected products
    selectedProducts.forEach(async (product: products) => {

      const customer = await prisma.customers.create({data: {
        name: customerInfo.fullName,
        address: customerInfo.address,
        phone: customerInfo.phone,
        email: customerInfo.email,
        product: product.name,
        price: product.price
      }})

      customers.push(customer)
    })
      
    return NextResponse.json({
      success: true,
      data: {
        customers,
      },
    })
  } catch (error) {
    console.error('Error processing shopping request:', error)
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 })
  }
}

