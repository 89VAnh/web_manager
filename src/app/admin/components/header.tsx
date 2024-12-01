import { Bell, User } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <div className="flex items-center justify-end px-6 py-4">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="mr-2">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                        <span className="sr-only">User menu</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}