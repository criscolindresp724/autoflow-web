'use client'
import PaypalComponent from "@/components/paypal/PaypalComponent";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import HeaderLaddingComponent from "@/components/header/HeaderComponent";
export default function CheckoutPlans() {
    return (
        <main className="w-screen h-screen relative">
            <header className="w-full h-[10%]">
                <HeaderLaddingComponent />
            </header>
            <div className="grid grid-cols-2 w-[100%] h-[90%] relative">

                <div className="w-full h-full">
                    {[

                        {
                            name: "Profesional",
                            description: "Perfecto para talleres en crecimiento",
                            price: "$1,999",
                            features: [
                                "Hasta 5 usuarios",
                                "Todas las características del plan Básico",
                                "Inventario y control de stock",
                                "Tablero Kanban",
                                "Reportes básicos",
                                "Facturación electrónica",
                                "Soporte prioritario",
                            ],
                            popular: true,
                        },
                    ].map((plan) => (
                        <Card key={plan.name} className={`flex flex-col w-full h-full p-5 ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                            {plan.popular && (
                                <div className="bg-primary py-1 text-center text-sm font-medium text-primary-foreground">
                                    Más popular
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                                    {plan.price}
                                    <span className="ml-1 text-lg font-normal text-muted-foreground">/mes</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <ul className="space-y-6">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Link href="/precing" className="w-full">
                                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                                        Cambiar Plan
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="w-full h-full p-5">

                    <PaypalComponent CreateOrder={async () => {
                        return 'dsfsdfg'
                    }}
                        onApprove={async () => {
                            alert('orden aprovada')
                        }}
                        disabled={false}
                        onClickFundingSource={(value) => {
                            console.log(value)
                        }}
                    />
                </div>
            </div>

        </main>
    )
}