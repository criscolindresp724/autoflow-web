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
                        <Label htmlFor="estado_personal_id">Tipo Contrato</Label>
                        <Select onValueChange={(value) => ''}>
                            <SelectTrigger id="estado_personal_id">
                                <SelectValue placeholder="Seleccionar Servicio" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key="arrendamiento" value="arrendamiento">arrendamiento</SelectItem>
                                <SelectItem key="propiedad" value="propiedad">propiedad</SelectItem>
                                <SelectItem key="subcontratacion" value="subcontratacion">subcontratacion</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="fechaInicio">fecha inicio</Label>
                        <Input
                            id="fechaInicio"
                            name="fechaInicio"
                            type="date"
                            // value={formData.identificacion_fiscal}
                            // onChange={handleInputChange}
                            maxLength={80}
                            required
                            placeholder="Fecha de inicio para el acuerdo de la flota"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="duracion">Duracion del contrato</Label>
                        <Input
                            id="duracion"
                            name="duracion"
                            type="text"
                            // value={formData.identificacion_fiscal}
                            // onChange={handleInputChange}
                            maxLength={80}
                            required
                            placeholder="Periodo de duracion del contrato de flota (ej. 12 meses)"
                        />
                    </div>
                    <Card className="col-span-3 mt-4">



                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Condiciones de negociacion</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <aside className="grid grid-cols-3 gap-3 col-span-3 mb-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="tarifa_precio">Tarifa de precios</Label>
                                    <Input
                                        id="tarifa_precio"
                                        name="tarifa_precio"
                                        type="number"
                                        // value={formData.identificacion_fiscal}
                                        // onChange={handleInputChange}
                                        maxLength={80}
                                        required
                                        placeholder="Precio acordado por servicio o unidad"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="tarifa_descuento">Tarifa de decuento</Label>
                                    <Input
                                        id="tarifa_descuento"
                                        name="tarifa_descuento"
                                        type="number"
                                        // value={formData.identificacion_fiscal}
                                        // onChange={handleInputChange}
                                        maxLength={80}
                                        required
                                        placeholder="Descuento especial acordado para la flota"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="decuento_pronto_pago">Descuento de pronto pago</Label>
                                    <Input
                                        id="decuento_pronto_pago"
                                        name="decuento_pronto_pago"
                                        type="number"
                                        // value={formData.identificacion_fiscal}
                                        // onChange={handleInputChange}
                                        maxLength={80}
                                        required
                                        placeholder="Descuento por pago anticipado acordado"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="credito_autorizado_por">Credito autorizado por</Label>
                                    <Input
                                        id="credito_autorizado_por"
                                        name="credito_autorizado_por"
                                        type="text"
                                        // value={formData.identificacion_fiscal}
                                        // onChange={handleInputChange}
                                        maxLength={80}
                                        required
                                        placeholder="Nombre de la persona que autoriza el credito"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="dias_credito_autorizado">Dias de credito autorizado</Label>
                                    <Input
                                        id="dias_credito_autorizado"
                                        name="dias_credito_autorizado"
                                        type="number"
                                        // value={formData.identificacion_fiscal}
                                        // onChange={handleInputChange}
                                        maxLength={80}
                                        required
                                        placeholder="Número de días de crédito acordados"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="dias_credito_autorizado">% cobro por mora</Label>
                                    <Input
                                        id="dias_credito_autorizado"
                                        name="dias_credito_autorizado"
                                        type="number"
                                        // value={formData.identificacion_fiscal}
                                        // onChange={handleInputChange}
                                        prefix="%"
                                        maxLength={80}
                                        required
                                        placeholder="Porcentaje de cobro por pagos atrasados"
                                    />
                                </div>

                            </aside>
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
                        </CardContent>

                    </Card>

                    <Card className="col-span-3 mt-4">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Datos de Factura</CardTitle>
                        </CardHeader>
                        <CardContent>

                        </CardContent>
                    </Card>

                </section>
            </CardContent>
        </Card>

    )
}