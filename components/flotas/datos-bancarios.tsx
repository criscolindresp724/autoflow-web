'use client'
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TALLER_SERVICES, { TipoCuentaBancariaType } from "@/services/TALLER_SERVICES.SERVICE";

export default function DatosBancarios() {
    const [StateTiposCuentaBancaria, SetStateTiposCuentaBancaria] = useState<TipoCuentaBancariaType[]>([])
    const [formData, setformData] = useState()
    const FN_GET_DATA_INPUTS = async () => {
        const res3 = await TALLER_SERVICES.GET_TIPO_CUENTA_BANCARIA()
        SetStateTiposCuentaBancaria(res3)
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
                <CardTitle>Datos Bancarios</CardTitle>
            </CardHeader>
            <CardContent>
                <section className="grid grid-cols-3 gap-3">

                    <div className="grid gap-2">
                        <Label htmlFor="identificacion_fiscal">Entidad Bancaria</Label>
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
                        <Label htmlFor="estado_personal_id">Tipo de cuenta</Label>
                        <Select onValueChange={(value) => ''}>
                            <SelectTrigger id="estado_personal_id">
                                <SelectValue placeholder="Seleccionar Servicio" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    StateTiposCuentaBancaria.map((estado) => (
                                        <SelectItem key={estado.nombre} value={estado.id.toString()}>{estado.nombre}</SelectItem>

                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    
                    {/* Selector tipo de moneda */}

                </section>
            </CardContent>
        </Card>

    )
}