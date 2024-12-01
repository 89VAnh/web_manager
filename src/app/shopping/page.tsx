import prisma from '@/lib/prisma'
import ShoppingForm from './components/shopping-form'

export default async function ShoppingPage() {
    const products = await prisma.products?.findMany()
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            {products ? <ShoppingForm products={products} /> : <div>Loading...</div>}
        </div>
    )
}