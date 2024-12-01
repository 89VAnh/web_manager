'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { products } from '@prisma/client'
import { useToast } from '@/hooks/use-toast'

interface ShoppingFormProps {
    products: products[]
}

export default function ShoppingForm({ products }: ShoppingFormProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        email: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set())

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const toggleProduct = (id: number) => {
        setSelectedProducts(prev => {
            const newSet = new Set(prev)
            if (newSet.has(id)) {
                newSet.delete(id)
            } else {
                newSet.add(id)
            }
            return newSet
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const selectedProductsData = products.filter(p => selectedProducts.has(p.id))

        try {
            const response = await fetch('/api/shopping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerInfo: formData,
                    selectedProducts: Array.from(selectedProductsData),
                }),
            })

            if (response.ok) {
                toast({
                    title: "Order Submitted",
                    description: "Your order has been successfully submitted.",
                })
                // Reset form and selected products
                setFormData({ fullName: '', phone: '', address: '', email: '' })
                setSelectedProducts(new Set())
            } else {
                throw new Error('Failed to submit order')
            }
        } catch {
            toast({
                title: "Error",
                description: "There was a problem submitting your order.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <h2 className="text-center font-bold mb-6">SẢN PHẨM</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {products.map((product) => (
                            <div key={product.id} className="flex flex-col items-center space-y-2">
                                <div
                                    className={`w-24 h-24 border-2 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden ${selectedProducts.has(product.id) ? 'border-green-500 bg-primary/10' : 'border-gray-200'
                                        }`}
                                    onClick={() => toggleProduct(product.id)}
                                >
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={96}
                                        height={96}
                                        className="object-cover"
                                    />
                                </div>
                                <span className="text-sm font-medium">{product.name}</span>
                                <span className="text-sm text-gray-600">{product.price.toLocaleString()} VNĐ</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-center">
                <Button type="submit" size="lg" className="px-8" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang xử lý...' : 'MUA HÀNG'}
                </Button>
            </div>
        </form>
    )
}

