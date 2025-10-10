import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "../ui/button"
import { Calendar } from "lucide-react"
import { Badge } from "../ui/badge"
import { useEffect, useState } from "react"
import { Label } from "../ui/label"
import TALLER_SERVICES, { PoliticasMantenimientoType } from "@/services/TALLER_SERVICES.SERVICE"
import { Input } from "../ui/input"
export default function TerminosContratosPoliticas() {
    const [State_Nuevo, SetState_Nuevo] = useState<boolean>(false);
    const [State_PoliticasMantenimiento, SetState_PoliticasMantenimiento] = useState<PoliticasMantenimientoType[]>([]);

    const [formData, setformData] = useState()
    const FN_GET_DATA_INPUTS = async () => {
        const res3 = await TALLER_SERVICES.GET_POLITICAS_MANTENIMIENTO()
        SetState_PoliticasMantenimiento(res3)
    }


    const handleSelectChange = (value: string) => {
        // setFormData({ ...formData, estado_operativo: value })
    }
    useEffect(() => {
        FN_GET_DATA_INPUTS()
    }, [])
    // Datos de ejemplo para contratos y acuerdos
    const contratos = [
        {
            id: 1,
            tipo: "Contrato de Servicio",
            fechaInicio: "2023-01-01",
            fechaFin: "2023-12-31",
            estado: "Activo",
            valorMensual: 15000.0,
        },
        {
            id: 2,
            tipo: "Acuerdo de Mantenimiento",
            fechaInicio: "2023-01-01",
            fechaFin: "2023-12-31",
            estado: "Activo",
            valorMensual: 8000.0,
        },
    ]
    const getEstadoBadge = (estado: string) => {
        switch (estado) {
            case "Activa":
            case "Activo":
            case "Operativo":
            case "Completado":
                return <Badge className="bg-green-500 hover:bg-green-600">{estado}</Badge>
            case "Inactiva":
            case "Inactivo":
                return <Badge className="bg-gray-500 hover:bg-gray-600">{estado}</Badge>
            case "En Negociación":
            case "En Mantenimiento":
            case "En Proceso":
                return <Badge className="bg-blue-500 hover:bg-blue-600">{estado}</Badge>
            default:
                return <Badge>{estado}</Badge>
        }
    }
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Contratos y Acuerdos</CardTitle>
                <Button size="sm" onClick={() => SetState_Nuevo(true)}>
                    <Calendar className="mr-2 h-4 w-4" /> Nuevo Contrato
                </Button>
            </CardHeader>
            <CardContent>
                {
                    State_Nuevo &&
                    <Card>

                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Agregar contrato</CardTitle>
                            <Button size="sm" onClick={() => SetState_Nuevo(true)}>
                                <Calendar className="mr-2 h-4 w-4" /> Agregar
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <section className="grid grid-cols-3 gap-2">

                                <div className="grid gap-2">
                                    <Label htmlFor="estado_personal_id">Politicas de mantenimiento</Label>
                                    <Select onValueChange={(value) => ''}>
                                        <SelectTrigger id="estado_personal_id">
                                            <SelectValue placeholder="Seleccionar estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                State_PoliticasMantenimiento.map((estado) => (
                                                    <SelectItem key={estado.nombre} value={estado.id.toString()}>{estado.nombre}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="identificacion_fiscal">Politica de renovacion</Label>
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
                                    <Label htmlFor="identificacion_fiscal">Politica de uso</Label>
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
                }
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Fecha Inicio</TableHead>
                            <TableHead>Fecha Fin</TableHead>
                            <TableHead>Valor Mensual (L)</TableHead>
                            <TableHead>Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contratos.map((contrato) => (
                            <TableRow key={contrato.id}>
                                <TableCell className="font-medium">{contrato.tipo}</TableCell>
                                <TableCell>{contrato.fechaInicio}</TableCell>
                                <TableCell>{contrato.fechaFin}</TableCell>
                                <TableCell>L {contrato.valorMensual.toFixed(2)}</TableCell>
                                <TableCell>{getEstadoBadge(contrato.estado)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}