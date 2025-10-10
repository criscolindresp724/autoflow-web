'use client'
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SERVICIOS_SERVICES, { CategoriaServicioType } from "@/services/SERVICIOS.SERVICE";

export default function DatosNegociacion() {
    const [StateCategoriaServicios, SetStateCategoriaServicios] = useState<CategoriaServicioType[]>([])
    const [formData, setformData] = useState()
    const FN_GET_DATA_INPUTS = async () => {
        const res3 = await SERVICIOS_SERVICES.GET_GATEGORIAS_SERVICIO()
        SetStateCategoriaServicios(res3)
    }


    const handleSelectChange = (value: string) => {
        // setFormData({ ...formData, estado_operativo: value })
    }
    useEffect(() => {
        FN_GET_DATA_INPUTS()
    }, [])
    return (
        <Card>

            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Datos de Negociacion</CardTitle>
            </CardHeader>
            <CardContent>
                <section className="grid grid-cols-3 gap-3">

                    <div className="grid gap-2">
                        <Label htmlFor="identificacion_fiscal">Condicion</Label>
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
                        <Label htmlFor="identificacion_fiscal">Tarifa de precios</Label>
                        <Input
                            id="identificacion_fiscal"
                            name="identificacion_fiscal"
                            type="number"
                            // value={formData.identificacion_fiscal}
                            // onChange={handleInputChange}
                            maxLength={80}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="identificacion_fiscal">Datos de factura</Label>
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
                        <Label htmlFor="estado_personal_id">Tarifa de servicios</Label>
                        <Select onValueChange={(value) => ''}>
                            <SelectTrigger id="estado_personal_id">
                                <SelectValue placeholder="Seleccionar Servicio" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    StateCategoriaServicios.map((estado) => (
                                        <SelectItem key={estado.nombre} value={estado.id.toString()}>{estado.nombre}</SelectItem>

                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                </section>
            </CardContent>
        </Card>

    )
}