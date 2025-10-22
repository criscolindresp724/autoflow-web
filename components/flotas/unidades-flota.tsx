'use client'
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TALLER_SERVICES, { EstadoPersonalType } from "@/services/TALLER_SERVICES.SERVICE";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "../ui/button";
import { Car, FileText, Upload } from "lucide-react";
import { Badge } from "../ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "../ui/input";
import * as XLSX from "xlsx"
import { toast } from "sonner";
import CLIENTS_SERVICES, { ClienteType } from "@/services/CLIENTES_SERVICES.SERVICE";
import VEHICULO_SERVICES, { VehiculoType } from "@/services/VEHICULOS.SERVICE";
export type VehiculoInfo = {
    numeroUnidad: string;
    marcaModelo: string;
    numeroPlaca: string;
    numeroVin: string;
    anioFabricacion: string;
    kilometrajeActual: string;
    estadoVehiculo: string;
    fechaUltimoMantenimiento: string;
    proximoMantenimientoProgramado: string;
    historialReparaciones: string;
    conductoresAsignados: string;
    permisoExplotacionUnidad: string;
    fechaAutorizacionExplotacionUnidad: string;
    fechaVencimientoExplotacionUnidad: string;
    permisoCirculacion: string;
    fechaAutorizacionCirculacion: string;
    fechaVencimientoCirculacion: string;
    permisoPublicidad: string;
    fechaAutorizacionPublicidad: string;
    fechaVencimientoPublicidad: string;
    permisosEspeciales: string;
    fechaAutorizacionEspeciales: string;
    fechaVencimientoEspeciales: string;
};

export default function UnidadesFlotas() {
    const [State_EstadosPersonal, SetState_EstadosPersonal] = useState<EstadoPersonalType[]>([])
    const [formData, setformData] = useState()
    const [importDialogOpen, setImportDialogOpen] = useState(false)
    const [isImporting, setIsImporting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [clientes, setClientes] = useState<Omit<ClienteType, 'password'>[]>([])
    const [ListaVehiculos, SetListaVehiculos] = useState<VehiculoInfo[]>([])
    const FN_GET_DATA_INPUTS = async () => {
        const res3 = await TALLER_SERVICES.GET_ESTADO_PERSONAL()
        SetState_EstadosPersonal(res3)
    }


    const handleSelectChange = (value: string) => {
        // setFormData({ ...formData, estado_operativo: value })
    }

    // Datos de ejemplo para vehículos de la flota
    const vehiculos = [
        {
            id: 1,
            placa: "ABC-123",
            marca: "Toyota",
            modelo: "Hilux",
            año: 2021,
            tipo: "Pick-up",
            ultimoServicio: "2023-03-15",
            proximoServicio: "2023-06-15",
            estado: "Operativo",
        },
        {
            id: 2,
            placa: "DEF-456",
            marca: "Nissan",
            modelo: "Frontier",
            año: 2020,
            tipo: "Pick-up",
            ultimoServicio: "2023-02-20",
            proximoServicio: "2023-05-20",
            estado: "Operativo",
        },
        {
            id: 3,
            placa: "GHI-789",
            marca: "Mitsubishi",
            modelo: "L200",
            año: 2019,
            tipo: "Pick-up",
            ultimoServicio: "2023-04-05",
            proximoServicio: "2023-07-05",
            estado: "En Mantenimiento",
        },
    ]

    // Datos de ejemplo para historial de servicios
    const historialServicios = [
        {
            id: 1,
            vehiculo: "Toyota Hilux (ABC-123)",
            fecha: "2023-03-15",
            tipo: "Mantenimiento Preventivo",
            costo: 4500.0,
            estado: "Completado",
        },
        {
            id: 2,
            vehiculo: "Nissan Frontier (DEF-456)",
            fecha: "2023-02-20",
            tipo: "Cambio de Aceite",
            costo: 1200.0,
            estado: "Completado",
        },
        {
            id: 3,
            vehiculo: "Mitsubishi L200 (GHI-789)",
            fecha: "2023-04-05",
            tipo: "Reparación de Frenos",
            costo: 3800.0,
            estado: "En Proceso",
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
    // Nueva función para importar vehículos con auto-registro de clientes

    const requiredFields = [
        "Número de Unidad",
        "Marca y Modelo",
        "Número de Placa",
        "Número de VIN",
        "Año de Fabricación",
        "Kilometraje Actual",
        "Estado del Vehículo",
        "Fecha de Último Mantenimiento",
        "Próximo Mantenimiento Programado",
        "Historial de Reparaciones",
        "Conductores Asignados",
        "Permiso de Explotación de Unidad",
        "Fecha Autorización de Explotación de Unidad",
        "Fecha Vencimiento de Explotación de Unidad",
        "Permiso de Circulación",
        "Fecha Autorización de Circulación",
        "Fecha Vencimiento de Circulación",
        "Permiso de Publicidad",
        "Fecha Autorización de Publicidad",
        "Fecha Vencimiento de Publicidad",
        "Permisos Especiales",
        "Fecha Autorización Especiales",
        "Fecha Vencimiento Especiales"
    ];
    const FN_IMPORT_VEHICULOS = async (file: File) => {
        setIsImporting(true);

        try {
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];

            // 🔍 1️⃣ Obtener encabezados directamente desde la primera fila
            const headers = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 })[0];

            // 🔎 2️⃣ Verificar que todos los campos requeridos existan en los encabezados
            const missingFields = requiredFields.filter(field => !headers.includes(field));

            if (missingFields.length > 0) {
                console.error("⚠️ Faltan los siguientes campos en el Excel:", missingFields);
                toast.error(`Faltan los siguientes campos en el Excel: ${missingFields.join(", ")}`);
                setIsImporting(false);
                return; // detenemos el proceso
            } else {

                toast.success("Importación exitosa de vehículos.");
            }

            // ✅ 3️⃣ Convertir el Excel a JSON (cada fila como objeto)
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // Aquí puedes procesar los datos como necesites
            console.log("Datos importados:", jsonData);
            const VehiculosData = jsonData.map((item: any) => ({
                numeroUnidad: item["Número de Unidad"],
                marcaModelo: item["Marca y Modelo"],
                numeroPlaca: item["Número de Placa"],
                numeroVin: item["Número de VIN"],
                anioFabricacion: item["Año de Fabricación"],
                kilometrajeActual: item["Kilometraje Actual"],
                estadoVehiculo: item["Estado del Vehículo"],
                fechaUltimoMantenimiento: item["Fecha de Último Mantenimiento"],
                proximoMantenimientoProgramado: item["Próximo Mantenimiento Programado"],
                historialReparaciones: item["Historial de Reparaciones"],
                conductoresAsignados: item["Conductores Asignados"],
                permisoExplotacionUnidad: item["Permiso de Explotación de Unidad"],
                fechaAutorizacionExplotacionUnidad: item["Fecha Autorización de Explotación de Unidad"],
                fechaVencimientoExplotacionUnidad: item["Fecha Vencimiento de Explotación de Unidad"],
                permisoCirculacion: item["Permiso de Circulación"],
                fechaAutorizacionCirculacion: item["Fecha Autorización de Circulación"],
                fechaVencimientoCirculacion: item["Fecha Vencimiento de Circulación"],
                permisoPublicidad: item["Permiso de Publicidad"],
                fechaAutorizacionPublicidad: item["Fecha Autorización de Publicidad"],
                fechaVencimientoPublicidad: item["Fecha Vencimiento de Publicidad"],
                permisosEspeciales: item["Permisos Especiales"],
                fechaAutorizacionEspeciales: item["Fecha Autorización Especiales"],
                fechaVencimientoEspeciales: item["Fecha Vencimiento Especiales"],
            })) as VehiculoInfo[];
            SetListaVehiculos(VehiculosData)

        } catch (error) {
            console.error("Error al procesar archivo:", error);
            toast.error("Error de importación. Verifique el formato del archivo.");
        } finally {
            setIsImporting(false);
        }
    };
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            FN_IMPORT_VEHICULOS(file)
        }
    }
    useEffect(() => {
        FN_GET_DATA_INPUTS()
    }, [])
    return (
        <section>
            {/* el historial de servicios se va obtener automaticamente de las ordenes que ya estan guardadas en la bd ordenes de trabajo por cada vehiculo en base a la placa */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Vehículos de la Flota</CardTitle>
                    <Button size="sm" type="button" onClick={() => setImportDialogOpen(true)} >
                        <Car className="mr-2 h-4 w-4" /> Importar Vehiculos
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Placa</TableHead>
                                <TableHead>Número de Unidad</TableHead>
                                <TableHead>Marca y Modelo</TableHead>
                                <TableHead>Número de VIN</TableHead>
                                <TableHead>Año de Fabricación</TableHead>
                                <TableHead>Kilometraje Actual</TableHead>
                                <TableHead>Estado del Vehículo</TableHead>
                                <TableHead>Fecha de Último Mantenimiento</TableHead>
                                <TableHead>Próximo Mantenimiento Programado</TableHead>
                                <TableHead>Historial de Reparaciones</TableHead>
                                <TableHead>Conductores Asignados</TableHead>
                                <TableHead>Permiso de Explotación de Unidad</TableHead>
                                <TableHead>Fecha Autorización de Explotación de Unidad</TableHead>
                                <TableHead>Fecha Vencimiento de Explotación de Unidad</TableHead>
                                <TableHead>Permiso de Circulación</TableHead>
                                <TableHead>Fecha Autorización de Circulación</TableHead>
                                <TableHead>Fecha Vencimiento de Circulación</TableHead>
                                <TableHead>Permiso de Publicidad</TableHead>
                                <TableHead>Fecha Autorización de Publicidad</TableHead>
                                <TableHead>Fecha Vencimiento de Publicidad</TableHead>
                                <TableHead>Permisos Especiales</TableHead>
                                <TableHead>Fecha Autorización Especiales</TableHead>
                                <TableHead>Fecha Vencimiento Especiales</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ListaVehiculos.map((vehiculo) => (
                                <TableRow key={vehiculo.numeroPlaca}>
                                    <TableCell className="font-medium">{vehiculo.numeroPlaca}</TableCell>
                                    <TableCell>{vehiculo.numeroUnidad}</TableCell>
                                    <TableCell>{vehiculo.marcaModelo}</TableCell>
                                    <TableCell>{vehiculo.numeroVin}</TableCell>
                                    <TableCell>{vehiculo.anioFabricacion}</TableCell>
                                    <TableCell>{vehiculo.kilometrajeActual}</TableCell>
                                    <TableCell>{vehiculo.estadoVehiculo}</TableCell>
                                    <TableCell>{vehiculo.fechaUltimoMantenimiento}</TableCell>
                                    <TableCell>{vehiculo.proximoMantenimientoProgramado}</TableCell>
                                    <TableCell>{vehiculo.historialReparaciones}</TableCell>
                                    <TableCell>{vehiculo.conductoresAsignados}</TableCell>
                                    <TableCell>{vehiculo.permisoExplotacionUnidad}</TableCell>
                                    <TableCell>{vehiculo.fechaAutorizacionExplotacionUnidad}</TableCell>
                                    <TableCell>{vehiculo.fechaVencimientoExplotacionUnidad}</TableCell>
                                    <TableCell>{vehiculo.permisoCirculacion}</TableCell>
                                    <TableCell>{vehiculo.fechaAutorizacionCirculacion}</TableCell>
                                    <TableCell>{vehiculo.fechaVencimientoCirculacion}</TableCell>
                                    <TableCell>{vehiculo.permisoPublicidad}</TableCell>
                                    <TableCell>{vehiculo.fechaAutorizacionPublicidad}</TableCell>
                                    <TableCell>{vehiculo.fechaVencimientoPublicidad}</TableCell>
                                    <TableCell>{vehiculo.permisosEspeciales}</TableCell>
                                    <TableCell>{vehiculo.fechaAutorizacionEspeciales}</TableCell>
                                    <TableCell>{vehiculo.fechaVencimientoEspeciales}</TableCell>
                                    <TableCell>{getEstadoBadge(vehiculo.estadoVehiculo)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Historial de Servicios</CardTitle>
                    <Button size="sm">
                        <FileText className="mr-2 h-4 w-4" /> Importar Servicios
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Vehículo</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Tipo de Servicio</TableHead>
                                <TableHead>Costo (L)</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {historialServicios.map((servicio) => (
                                <TableRow key={servicio.id}>
                                    <TableCell className="font-medium">{servicio.vehiculo}</TableCell>
                                    <TableCell>{servicio.fecha}</TableCell>
                                    <TableCell>{servicio.tipo}</TableCell>
                                    <TableCell>L {servicio.costo.toFixed(2)}</TableCell>
                                    <TableCell>{getEstadoBadge(servicio.estado)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" /> Importar Vehículos
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Importar Vehículos desde Excel</DialogTitle>
                        <DialogDescription>
                            <div className="p-4 bg-gray-50 rounded-md border border-gray-200 text-gray-800">
                                <p className="font-bold mb-2">
                                    Selecciona un archivo Excel (.xlsx) con los datos de los vehículos.
                                </p>

                                <p className="mb-2">
                                    Asegúrate de que el archivo contenga <strong>todas las columnas requeridas</strong> con los siguientes nombres:
                                </p>

                                <div className="mb-2">
                                    <p className="font-semibold">Campos obligatorios:</p>
                                    <ul className="list-disc list-inside">
                                        <li>Número de Unidad</li>
                                        <li>Marca y Modelo</li>
                                        <li>Número de Placa</li>
                                        <li>Número de VIN</li>
                                        <li>Año de Fabricación</li>
                                        <li>Kilometraje Actual</li>
                                        <li>Estado del Vehículo</li>
                                        <li>Fecha de Último Mantenimiento</li>
                                        <li>Próximo Mantenimiento Programado</li>
                                        <li>Historial de Reparaciones</li>
                                        <li>Conductores Asignados</li>
                                    </ul>
                                </div>

                                <div className="mb-2">
                                    <p className="font-semibold">Campos de permisos requeridos:</p>
                                    <ul className="list-disc list-inside">
                                        <li>Permiso de Explotación de Unidad</li>
                                        <li>Fecha Autorización de Explotación de Unidad</li>
                                        <li>Fecha Vencimiento de Explotación de Unidad</li>
                                        <li>Permiso de Circulación</li>
                                        <li>Fecha Autorización de Circulación</li>
                                        <li>Fecha Vencimiento de Circulación</li>
                                        <li>Permiso de Publicidad</li>
                                        <li>Fecha Autorización de Publicidad</li>
                                        <li>Fecha Vencimiento de Publicidad</li>
                                        <li>Permisos Especiales</li>
                                        <li>Fecha Autorización Especiales</li>
                                        <li>Fecha Vencimiento Especiales</li>
                                    </ul>
                                </div>

                                <p className="text-red-600 font-bold">
                                    ⚠️ Importante: Los nombres de las columnas deben coincidir exactamente (incluyendo acentos y mayúsculas) para que el archivo se importe correctamente.
                                </p>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Input
                                ref={fileInputRef}
                                type="file"
                                accept=".xlsx,.xls"
                                onChange={handleFileUpload}
                                disabled={isImporting}
                            />
                        </div>
                        {isImporting && (
                            <div className="text-center">
                                <p>Importando vehículos...</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </section>

    )
}