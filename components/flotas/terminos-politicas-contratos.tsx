import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "../ui/button"
import { Calendar, Delete, FilePlus2, List } from "lucide-react"
import { Badge } from "../ui/badge"
import { useEffect, useState } from "react"
import { Label } from "../ui/label"
import TALLER_SERVICES, { PoliticasMantenimientoType } from "@/services/TALLER_SERVICES.SERVICE"
import { Input } from "../ui/input"
export default function TerminosContratosPoliticas() {
    const [State_Nuevo, SetState_Nuevo] = useState<boolean>(false);
    const [State_PoliticasMantenimiento, SetState_PoliticasMantenimiento] = useState<PoliticasMantenimientoType[]>([]);
    type ListaTiposContratosType = {
        politicas_uso_vehiculos: File[]
        politicas_combustible: File[]
        seguros_cobertura: File[]
        politicas_renovacion_vehiculos: File[]
        politicas_condiciones_uso: File[]
    }

    const [ListaTiposContratos, setListaTiposContratos] = useState<ListaTiposContratosType>({
        politicas_uso_vehiculos: [],
        politicas_combustible: [],
        seguros_cobertura: [],
        politicas_renovacion_vehiculos: [],
        politicas_condiciones_uso: [],
    })

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


    const FN_HANDLE_FILE_UPLOAD = (event: React.ChangeEvent<HTMLInputElement>, tipoContrato: string) => {
        const fileList = event.target.files;
        const files = fileList ? Array.from(fileList) : [];
        if (files.length > 0) {
            console.log(tipoContrato)
            if (tipoContrato === 'Politicas de uso de vehiculos') setListaTiposContratos(prevState => ({
                ...prevState,
                politicas_uso_vehiculos: [...prevState.politicas_uso_vehiculos, ...files]
            }));
            if (tipoContrato === 'Politicas de combustible') setListaTiposContratos(prevState => ({
                ...prevState,
                politicas_combustible: [...prevState.politicas_combustible, ...files]
            }));
            if (tipoContrato === 'Seguros y Covertura') setListaTiposContratos(prevState => ({
                ...prevState,
                seguros_cobertura: [...prevState.seguros_cobertura, ...files]
            }));
            if (tipoContrato === 'Politicas de renovacion de vehiculos') setListaTiposContratos(prevState => ({
                ...prevState,
                politicas_renovacion_vehiculos: [...prevState.politicas_renovacion_vehiculos, ...files]
            }));
            if (tipoContrato === 'Politicas de condiciones de uso') setListaTiposContratos(prevState => ({
                ...prevState,
                politicas_condiciones_uso: [...prevState.politicas_condiciones_uso, ...files]
            }));
            // Aquí puedes manejar el archivo subido, por ejemplo, enviarlo a un servidor o leer su contenido
            console.log("Archivo subido:", files);
        }
        console.log(ListaTiposContratos)
    }
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Contratos y Acuerdos</CardTitle>
            </CardHeader>
            <CardContent>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Politicas de uso de vehiculos</CardTitle>
                        <Input multiple type="file" accept="application/pdf" className="w-2/4" onChange={(e) => FN_HANDLE_FILE_UPLOAD(e, 'Politicas de uso de vehiculos')} />
                    </CardHeader>
                    <CardContent>
                        {
                            ListaTiposContratos.politicas_uso_vehiculos.length > 0 ?
                                ListaTiposContratos.politicas_uso_vehiculos.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between gap-2">
                                        <p className="text-sm">{file.name}</p>
                                        <Button variant="destructive" size="sm" onClick={() => setListaTiposContratos(prev => ({
                                            ...prev,
                                            politicas_uso_vehiculos: prev.politicas_uso_vehiculos.filter((_, i) => i !== index)
                                        }))}>
                                            <Delete className="mr-2 h-4 w-4" />Eliminar
                                        </Button>
                                    </div>
                                )) : <p className="text-sm text-gray-500">No se han subido archivos.</p>
                        }
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Politicas de combustible</CardTitle>
                        <Input multiple type="file" accept="application/pdf" className="w-2/4" onChange={(e) => FN_HANDLE_FILE_UPLOAD(e, 'Politicas de combustible')} />
                    </CardHeader>
                    <CardContent>
                        {
                            ListaTiposContratos.politicas_combustible.length > 0 ?
                                ListaTiposContratos.politicas_combustible.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between gap-2">
                                        <p className="text-sm">{file.name}</p>
                                        <Button variant="destructive" size="sm" onClick={() => setListaTiposContratos(prev => ({
                                            ...prev,
                                            politicas_combustible: prev.politicas_combustible.filter((_, i) => i !== index)
                                        }))}>
                                            <Delete className="mr-2 h-4 w-4" />Eliminar
                                        </Button>
                                    </div>
                                )) : <p className="text-sm text-gray-500">No se han subido archivos.</p>
                        }

                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Seguros y Covertura</CardTitle>
                        <Input multiple type="file" accept="application/pdf" className="w-2/4" onChange={(e) => FN_HANDLE_FILE_UPLOAD(e, 'Seguros y Covertura')} />
                    </CardHeader>
                    <CardContent>
                        {
                            ListaTiposContratos.seguros_cobertura.length > 0 ?
                                ListaTiposContratos.seguros_cobertura.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between gap-2">
                                        <p className="text-sm">{file.name}</p>
                                        <Button variant="destructive" size="sm" onClick={() => setListaTiposContratos(prev => ({
                                            ...prev,
                                            seguros_cobertura: prev.seguros_cobertura.filter((_, i) => i !== index)
                                        }))}>
                                            <Delete className="mr-2 h-4 w-4" />Eliminar
                                        </Button>
                                    </div>
                                )) : <p className="text-sm text-gray-500">No se han subido archivos.</p>
                        }
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Politicas de renovacion de vehiculos</CardTitle>
                        <Input multiple type="file" accept="application/pdf" className="w-2/4" onChange={(e) => FN_HANDLE_FILE_UPLOAD(e, 'Politicas de renovacion de vehiculos')} />
                    </CardHeader>
                    <CardContent>
                        {
                            ListaTiposContratos.politicas_renovacion_vehiculos.length > 0 ?
                                ListaTiposContratos.politicas_renovacion_vehiculos.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between gap-2">
                                        <p className="text-sm">{file.name}</p>
                                        <Button variant="destructive" size="sm" onClick={() => setListaTiposContratos(prev => ({
                                            ...prev,
                                            politicas_renovacion_vehiculos: prev.politicas_renovacion_vehiculos.filter((_, i) => i !== index)
                                        }))}>
                                            <Delete className="mr-2 h-4 w-4" />Eliminar
                                        </Button>
                                    </div>
                                )) : <p className="text-sm text-gray-500">No se han subido archivos.</p>
                        }
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Politicas de condiciones de uso</CardTitle>
                        <Input multiple type="file" accept="application/pdf" className="w-2/4" onChange={(e) => FN_HANDLE_FILE_UPLOAD(e, 'Politicas de condiciones de uso')} />
                    </CardHeader>
                    <CardContent>
                        {
                            ListaTiposContratos.politicas_condiciones_uso.length > 0 ?
                                ListaTiposContratos.politicas_condiciones_uso.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between gap-2">
                                        <p className="text-sm">{file.name}</p>
                                        <Button variant="destructive" size="sm" onClick={() => setListaTiposContratos(prev => ({
                                            ...prev,
                                            politicas_condiciones_uso: prev.politicas_condiciones_uso.filter((_, i) => i !== index)
                                        }))}>
                                            <Delete className="mr-2 h-4 w-4" />Eliminar
                                        </Button>
                                    </div>
                                )) : <p className="text-sm text-gray-500">No se han subido archivos.</p>
                        }
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}
// {/*Agregar un input donde el usuario pueda subir un archivo pdf de las politicas, y ordenarlas por tipo de politicas*/}
// {
//     State_Nuevo &&
//     <Card>

//         <CardHeader className="flex flex-row items-center justify-between">
//             <CardTitle>Agregar contrato</CardTitle>
//             <Button size="sm" onClick={() => SetState_Nuevo(true)}>
//                 <Calendar className="mr-2 h-4 w-4" /> Agregar
//             </Button>
//         </CardHeader>
//         <CardContent>
//             <section className="grid grid-cols-3 gap-2">

//                 <div className="grid gap-2">
//                     <Label htmlFor="estado_personal_id">Politicas de mantenimiento</Label>
//                     <Select onValueChange={(value) => ''}>
//                         <SelectTrigger id="estado_personal_id">
//                             <SelectValue placeholder="Seleccionar estado" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             {
//                                 State_PoliticasMantenimiento.map((estado) => (
//                                     <SelectItem key={estado.nombre} value={estado.id.toString()}>{estado.nombre}</SelectItem>
//                                 ))
//                             }
//                         </SelectContent>
//                     </Select>
//                 </div>
//                 <div className="grid gap-2">
//                     <Label htmlFor="identificacion_fiscal">Politica de renovacion</Label>
//                     <Input
//                         id="identificacion_fiscal"
//                         name="identificacion_fiscal"
//                         type="text"
//                         // value={formData.identificacion_fiscal}
//                         // onChange={handleInputChange}
//                         maxLength={80}
//                         required
//                     />
//                 </div>
//                 <div className="grid gap-2">
//                     <Label htmlFor="identificacion_fiscal">Politica de uso</Label>
//                     <Input
//                         id="identificacion_fiscal"
//                         name="identificacion_fiscal"
//                         type="text"
//                         // value={formData.identificacion_fiscal}
//                         // onChange={handleInputChange}
//                         maxLength={80}
//                         required
//                     />
//                 </div>
//             </section>

//         </CardContent>
//     </Card>
// }
// <Table>
//     <TableHeader>
//         <TableRow>
//             <TableHead>Tipo</TableHead>
//             <TableHead>Fecha Inicio</TableHead>
//             <TableHead>Fecha Fin</TableHead>
//             <TableHead>Valor Mensual (L)</TableHead>
//             <TableHead>Estado</TableHead>
//         </TableRow>
//     </TableHeader>
//     <TableBody>
//         {contratos.map((contrato) => (
//             <TableRow key={contrato.id}>
//                 <TableCell className="font-medium">{contrato.tipo}</TableCell>
//                 <TableCell>{contrato.fechaInicio}</TableCell>
//                 <TableCell>{contrato.fechaFin}</TableCell>
//                 <TableCell>L {contrato.valorMensual.toFixed(2)}</TableCell>
//                 <TableCell>{getEstadoBadge(contrato.estado)}</TableCell>
//             </TableRow>
//         ))}
//     </TableBody>
// </Table>