import EmployeeTable from './components/employee-table'
import prisma from '@/lib/prisma'

export default async function EmployeesPage() {
    const employees = await prisma.employees.findMany()

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Quản lý nhân viên</h1>
            <EmployeeTable initialEmployees={employees} />
        </div>
    )
}

