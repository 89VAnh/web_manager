'use client'

import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { customers } from '@prisma/client'

interface CustomerTableProps {
    initialCustomers: customers[]
}

export default function CustomerTable({ initialCustomers }: CustomerTableProps) {
    const [customers] = useState<customers[]>(initialCustomers)

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tên</TableHead>
                        <TableHead>Địa chỉ</TableHead>
                        <TableHead>SĐT</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Sản phẩm</TableHead>
                        <TableHead className="text-right">Giá</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell className="font-medium">{customer.name}</TableCell>
                            <TableCell>{customer.address}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.product}</TableCell>
                            <TableCell className="text-right">
                                {customer.price.toLocaleString('vi-VN')} VNĐ
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

