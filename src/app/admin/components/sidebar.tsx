'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, ShoppingCart } from 'lucide-react'

const sidebarItems = [
    { name: 'Quản lý nhân viên', href: '/admin/employees', icon: Users },
    { name: 'Quản lý khách hàng', href: '/admin/customers', icon: ShoppingCart },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col w-64 bg-white border-r">
            <div className="flex items-center justify-center h-16 border-b">
                <span className="text-2xl font-semibold text-gray-800">Admin Panel</span>
            </div>
            <ScrollArea className="flex-grow">
                <nav className="mt-6">
                    {sidebarItems.map((item) => (
                        <Link key={item.name} href={item.href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start px-4 py-2 text-left text-sm font-medium",
                                    pathname === item.href && "bg-gray-100 text-gray-900"
                                )}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Button>
                        </Link>
                    ))}
                </nav>
            </ScrollArea>
        </div>
    )
}

