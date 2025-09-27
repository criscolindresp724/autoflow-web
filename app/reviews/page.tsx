'use client'
import HeaderLaddingComponent from "@/components/header/HeaderComponent";
import { Card, CardContent } from "@/components/ui/card";
import REVIEW_SERVICES, { ReviewType } from "@/services/REVIEWS_SERVICES.service";
import { useEffect, useState } from "react";

export default function ReviewPage({ limit = 999 }: { limit?: number }) {
    const [State_Reviews, SetState_Reviews] = useState<ReviewType[]>([])
    const FN_GET_DATA = async () => {
        const res = await REVIEW_SERVICES.GET_REVIEWS(limit);
        SetState_Reviews(res)

    }
    useEffect(() => {
        FN_GET_DATA()
    }, [])
    return (
        <main>
            <HeaderLaddingComponent />
            <section className="w-full py-12 md:py-24 lg:py-32" id="testimonios">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonios</div>
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                Lo que dicen nuestros clientes
                            </h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Descubre cómo AutoFlowX ha transformado la gestión de talleres automotrices en todo el país.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
                        {State_Reviews.map((testimonial, i) => (
                            <Card key={i} className="overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {testimonial.perfil_usuario.nombre.slice(0, 1).toUpperCase()} {testimonial.perfil_usuario.apellido.slice(0, 1).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium">{testimonial.perfil_usuario.nombre} {testimonial.perfil_usuario.apellido}</p>
                                            <p className="text-sm text-muted-foreground">taller {testimonial.talleres.nombre}</p>
                                        </div>
                                    </div>
                                    <div className="flex mb-4">
                                        {Array(testimonial.starts)
                                            .fill(null)
                                            .map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="h-4 w-4 fill-primary text-primary"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                </svg>
                                            ))}
                                    </div>
                                    <p className="text-muted-foreground">{testimonial.review}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>

    )
}