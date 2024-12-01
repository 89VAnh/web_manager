'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { employees, Role } from '@prisma/client'
import { useRouter } from 'next/navigation'

const ROLE_OPTIONS = Object.values(Role)

type EditEmployeeFormProps = {
    employee: employees
    onUpdate: (employee: employees) => void
    onClose: () => void
}

export default function EditEmployeeForm({ employee, onUpdate, onClose }: EditEmployeeFormProps) {
    const [editedEmployee, setEditedEmployee] = useState<employees>(employee)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/employees/${employee.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedEmployee),
            })
            if (response.ok) {
                onUpdate(editedEmployee)
                onClose()
                router.refresh()
            } else {
                console.error('Failed to update employee')
            }
        } catch (error) {
            console.error('Error updating employee:', error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditedEmployee(prev => ({ ...prev, [name]: name === 'salary' ? Number(value) : value }))
    }

    const handleRoleChange = (value: Role) => {
        setEditedEmployee(prev => ({ ...prev, role: value }))
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sửa thông tin nhân viên</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                                Tên
                            </Label>
                            <Input
                                id="edit-name"
                                name="name"
                                value={editedEmployee.name}
                                onChange={handleChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="edit-email"
                                name="email"
                                type="email"
                                value={editedEmployee.email}
                                onChange={handleChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-address" className="text-right">
                                Địa chỉ
                            </Label>
                            <Input
                                id="edit-address"
                                name="address"
                                value={editedEmployee.address}
                                onChange={handleChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-phoneNumber" className="text-right">
                                SĐT
                            </Label>
                            <Input
                                id="edit-phoneNumber"
                                name="phoneNumber"
                                value={editedEmployee.phoneNumber}
                                onChange={handleChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-salary" className="text-right">
                                Lương
                            </Label>
                            <Input
                                id="edit-salary"
                                name="salary"
                                type="number"
                                value={editedEmployee.salary}
                                onChange={handleChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-role" className="text-right">
                                Vị trí
                            </Label>
                            <Select name="role" value={editedEmployee.role} onValueChange={handleRoleChange}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ROLE_OPTIONS.map((role) => (
                                        <SelectItem key={role} value={role}>
                                            {role}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Update Employee</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

