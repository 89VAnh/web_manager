import prisma from '@/lib/prisma'
import CustomerTable from './components/customer-table'

export default async function CustomersPage() {
    const customers = await prisma.customers?.findMany()

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Quản lý khách hàng</h1>
            </div>
            <CustomerTable initialCustomers={customers} />
        </div>
    )
}

