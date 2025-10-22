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
                        <Label htmlFor="entidad_bancaria">Entidad Bancaria</Label>
                        <Input
                            id="entidad_bancaria"
                            name="entidad_bancaria"
                            type="text"
                            // value={formData.identificacion_fiscal}
                            // onChange={handleInputChange}
                            maxLength={80}
                            required
                            placeholder="Banco con el que trabaja la flota"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="cuenta_bancaria">Cuenta bancaria de la flota</Label>
                        <Input
                            id="cuenta_bancaria"
                            name="cuenta_bancaria"
                            type="text"
                            // value={formData.identificacion_fiscal}
                            // onChange={handleInputChange}
                            maxLength={80}
                            required
                            placeholder="Numero de cuenta asociada a la flota para transacciones"
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
                    <div className="grid gap-2">
                        <Label htmlFor="tipo_cuenta">Tipo de cuenta</Label>
                        <Select onValueChange={(value) => ''}>
                            <SelectTrigger id="tipo_cuenta">
                                <SelectValue placeholder="Seleccionar tipo de cuenta" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key="pago" value="pago">Pago</SelectItem>
                                <SelectItem key="cobro" value="cobro">Cobro</SelectItem>
                                <SelectItem key="editable" value="editable">editable</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="moneda">Moneda</Label>
                        <Select onValueChange={(value) => ''}>
                            <SelectTrigger id="moneda">
                                <SelectValue placeholder="Seleccionar tipo de moneda" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key="dolares" value="dolares">dolares</SelectItem>
                                <SelectItem key="quetzales" value="quetzales">quetzales</SelectItem>
                                <SelectItem key="lempiras" value="lempiras">lempiras</SelectItem>
                                <SelectItem key="editable" value="editable">editable</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Selector tipo de moneda */}

                </section>
            </CardContent>
        </Card>

    )
}