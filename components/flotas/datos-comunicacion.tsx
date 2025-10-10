'use client'
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
export default function DatosComunicacionForm() {
    const [formData, setformData] = useState()

    return (
        <Card>


            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Datos de comunicacion</CardTitle>
            </CardHeader>
            <CardContent>
                <section className="grid grid-cols-3 gap-3">

                    <div className="grid gap-2">
                        <Label htmlFor="identificacion_fiscal">Gerencia</Label>
                        <Input
                            id="identificacion_fiscal"
                            name="identificacion_fiscal"
                            type="text"
                            // value={formData.identificacion_fiscal}
                            // onChange={handleInputChange}
                            maxLength={80}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="identificacion_fiscal">Ventas</Label>
                        <Input
                            id="identificacion_fiscal"
                            name="identificacion_fiscal"
                            type="text"
                            // value={formData.identificacion_fiscal}
                            // onChange={handleInputChange}
                            maxLength={80}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="identificacion_fiscal">Produccion</Label>
                        <Input
                            id="identificacion_fiscal"
                            name="identificacion_fiscal"
                            type="text"
                            // value={formData.identificacion_fiscal}
                            // onChange={handleInputChange}
                            maxLength={80}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="identificacion_fiscal">Suministros</Label>
                        <Input
                            id="identificacion_fiscal"
                            name="identificacion_fiscal"
                            type="text"
                            // value={formData.identificacion_fiscal}
                            // onChange={handleInputChange}
                            maxLength={80}
                            required
                        />
                    </div>

                </section>
            </CardContent>
        </Card>

    )
}