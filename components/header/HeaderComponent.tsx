import { Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function HeaderLaddingComponent() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6 text-lg font-medium">
                    <Link href="/" className="flex items-center gap-2">
                        <Wrench className="h-6 w-6 text-primary" />
                        <span className="font-bold">AutoFlowX</span>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    <Link href="#caracteristicas" className="transition-colors hover:text-foreground/80">
                        Características
                    </Link>
                    <Link href="#modulos" className="transition-colors hover:text-foreground/80">
                        Módulos
                    </Link>
                    <Link href="#precios" className="transition-colors hover:text-foreground/80">
                        Precios
                    </Link>
                    <Link href="#testimonios" className="transition-colors hover:text-foreground/80">
                        Testimonios
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/auth/login">
                        <Button variant="outline">Iniciar Sesión</Button>
                    </Link>
                    <Link href="/auth/registro-taller">
                        <Button>Registrar Taller</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}