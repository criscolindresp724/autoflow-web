"use client";

import HeaderLaddingComponent from "@/components/header/HeaderComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ContactFormPage() {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem("name") as HTMLInputElement).value,
            email: (form.elements.namedItem("email") as HTMLInputElement).value,
            message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
        };

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        setLoading(false);
        if (res.ok) setSent(true);
    };

    return (
        <main className="w-screen h-screen relative">
            <HeaderLaddingComponent />
            <aside className="w-full text-center h-[20%] grid items-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Contactar con agente de ventas
                </h2>
            </aside>

            <aside className="w-full grid justify-center items-center h-[30%]">

                <form onSubmit={handleSubmit} className="space-y-4 p-4 w-[40rem] grid grid-cols-1 justify-center items-center">
                    <Input name="name" placeholder="Tu nombre" className="w-full rounded border p-2" required />
                    <Input type="email" name="email" placeholder="Tu correo" className="w-full rounded border p-2" required />
                    <Input name="message" placeholder="Tu mensaje" className="w-full rounded border p-2" required />
                    <Button
                        type="submit"
                        disabled={loading}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        {loading ? "Enviando..." : "Enviar"}
                    </Button>
                    {sent && <p className="text-green-600">¡Mensaje enviado con éxito!</p>}
                </form>
            </aside>
        </main>
    );
}
