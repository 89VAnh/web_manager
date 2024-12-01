'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from 'lucide-react'
import EditEmployeeForm from './edit-employee-form'
import { employees } from '@prisma/client'
import AddEmployeeForm from './add-employee-form'

type EmployeeTableProps = {
    initialEmployees: employees[]
}

export default function EmployeeTable({ initialEmployees }: EmployeeTableProps) {
    const [employees, setEmployees] = useState<employees[]>(initialEmployees)
    const [editingEmployee, setEditingEmployee] = useState<employees | null>(null)

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/employees/${id}`, { method: 'DELETE' })
            if (response.ok) {
                setEmployees(employees.filter(emp => emp.id !== id))
            } else {
                console.error('Failed to delete employee')
            }
        } catch (error) {
            console.error('Error deleting employee:', error)
        }
    }

    const handleEdit = (employee: employees) => {
        setEditingEmployee(employee)
    }

    const handleUpdate = (updatedEmployee: employees) => {
        setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp))
        setEditingEmployee(null)
    }

    const handleCreate = (newEmployee: employees) => {
        setEmployees([...employees, newEmployee])
    }

    return (
        <div>
            <AddEmployeeForm
                onCreate={handleCreate}
            />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Mã</TableHead>
                        <TableHead>Tên</TableHead>
                        <TableHead>Địa chỉ</TableHead>
                        <TableHead>SĐT</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Lương</TableHead>
                        <TableHead>Vị trí</TableHead>
                        <TableHead>Tuỳ chọn</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees?.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.id}</TableCell>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.address}</TableCell>
                            <TableCell>{employee.phoneNumber}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.salary.toLocaleString()} VND</TableCell>
                            <TableCell>{employee.role}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button variant="outline" size="icon" onClick={() => handleEdit(employee)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={() => handleDelete(employee.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {editingEmployee && (
                <EditEmployeeForm
                    employee={editingEmployee}
                    onUpdate={handleUpdate}
                    onClose={() => setEditingEmployee(null)}
                />
            )}
        </div>
    )
}

