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
                        <Label htmlFor="nombre">Nombre Jefe de flota</Label>
                        <Input
                            id="nombre"
                            name="nombre"
                            type="text"
                            maxLength={80}
                            required
                            placeholder="Nombre del responsable de la gestion de la flota"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="telefono">Telefono de contacto</Label>
                        <Input
                            id="telefono"
                            name="telefono"
                            type="text"
                            maxLength={80}
                            required
                            placeholder="Telefono directo del jefe de flota"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="correo">Correo</Label>
                        <Input
                            id="correo"
                            name="correo"
                            type="text"
                            maxLength={80}
                            required
                            placeholder="Correo electronico del jefe de flota"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="cargo">Cargo</Label>
                        <Select onValueChange={(value) => ''}>
                            <SelectTrigger id="cargo">
                                <SelectValue placeholder="Cargo del responsable en la empresa" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key="gerente" value="gerente">gerente</SelectItem>
                                <SelectItem key="gerente" value="gerente">administrador</SelectItem>
                                <SelectItem key="gerente" value="gerente">supervisor</SelectItem>
                                <SelectItem key="gerente" value="gerente">empleado comun</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="estado_personal_id">Disponibilidad *</Label>
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