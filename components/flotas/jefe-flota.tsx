'use client'
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TALLER_SERVICES, { EstadoPersonalType } from "@/services/TALLER_SERVICES.SERVICE";

export default function JefeFlotaForm() {
    const [State_EstadosPersonal, SetState_EstadosPersonal] = useState<EstadoPersonalType[]>([])
    const [formData, setformData] = useState()
    const FN_GET_DATA_INPUTS = async () => {
        const res3 = await TALLER_SERVICES.GET_ESTADO_PERSONAL()
        SetState_EstadosPersonal(res3)
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
                <CardTitle>Jefe de la flota</CardTitle>
            </CardHeader>
            <CardContent>
                <section className="grid grid-cols-3 gap-3">

                    <div className="grid gap-2">
                        <Label htmlFor="identificacion_fiscal">Informacion Personal</Label>
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
                        <Label htmlFor="identificacion_fiscal">Dato Profecionales</Label>
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
                        <Label htmlFor="identificacion_fiscal">Informacion Personal</Label>
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
                        <Label htmlFor="estado_personal_id">Estado *</Label>
                        <Select onValueChange={(value) => ''}>
                            <SelectTrigger id="estado_personal_id">
                                <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    State_EstadosPersonal.map((estado) => (
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