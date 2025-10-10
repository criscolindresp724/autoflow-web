"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, FileText, Eye, Users, BarChart, Edit, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Badge } from "@/components/ui/badge"
import { DetalleFlota } from "./detalle-flota"
import { ConductoresFlota } from "./conductores-flota"
import { RendimientoFlota } from "./rendimiento-flota"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import FLOTAS_SERVICES, { FlotaType } from "@/services/FLOTAS_SERVICES.service"
import { toast } from "sonner"




export default function FlotasPage() {
  const [flotas, setFlotas] = useState<FlotaType[]>([])
  const [open, setOpen] = useState(false)
  const [editingFlota, setEditingFlota] = useState<FlotaType | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [flotaToDelete, setFlotaToDelete] = useState<FlotaType | null>(null)
  const [flotaSeleccionada, setFlotaSeleccionada] = useState<FlotaType | null>(null)
  const [mostrarDetalle, setMostrarDetalle] = useState(false)
  const [mostrarConductores, setMostrarConductores] = useState(false)
  const [mostrarRendimiento, setMostrarRendimiento] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const FN_GET_FLOTAS = async () => {
    const flotas = await FLOTAS_SERVICES.GET_ALL_FLOTAS()
    setFlotas(flotas)
  }

  const FN_DELETE_FLOTA = async () => {
    await FLOTAS_SERVICES.DELTE_FLOTA(flotaToDelete.id)
    await FN_GET_FLOTAS()
    toast.success('Flota Eliminada Correctamente✅')
  }
  useEffect(() => {
    FN_GET_FLOTAS()
  }, [])

  // Guardar en localStorage cuando cambie el estado
  useEffect(() => {
    if (flotas.length > 0) {
      localStorage.setItem("flotas", JSON.stringify(flotas))
    }
  }, [flotas])



  const openEditDialog = (flota: FlotaType) => {
    setEditingFlota(flota)
    setOpen(true)
  }

  const openDeleteDialog = (flota: FlotaType) => {
    setFlotaToDelete(flota)
    setDeleteDialogOpen(true)
  }

  const verDetalle = (flota: FlotaType) => {
    setFlotaSeleccionada(flota)
    setMostrarDetalle(true)
  }

  const verConductores = (flota: FlotaType) => {
    setFlotaSeleccionada(flota)
    setMostrarConductores(true)
  }

  const verRendimiento = (flota: FlotaType) => {
    setFlotaSeleccionada(flota)
    setMostrarRendimiento(true)
  }

  const filteredFlotas = flotas.filter(
    (flota) =>
      flota.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flota.propietario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flota.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flota.identificacion_fiscal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flota.correo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Activo":
        return <Badge className="bg-green-500 hover:bg-green-600">{estado}</Badge>
      case "Inactiva":
        return <Badge className="bg-gray-500 hover:bg-gray-600">{estado}</Badge>
      case "En Negociación":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{estado}</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Flotas</h1>
          <div className="flex items-center gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingFlota(null)}>
                  <Plus className="mr-2 h-4 w-4" /> Nueva Flota
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[75vw] w-[75vw] h-[95vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>{editingFlota ? "Editar Flota" : "Nueva Flota"}</DialogTitle>
                  <DialogDescription>
                    {editingFlota
                      ? "Modifica la información de la flota."
                      : "Ingresa la información de la nueva flota."}
                  </DialogDescription>
                </DialogHeader>
                <DetalleFlota />
                {/* <NuevaFlotaForm
                  onSuccess={() => { FN_GET_FLOTAS(), setOpen(false) }}
                  flotaExistente={editingFlota}
                /> */}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar flotas por nombre, empresa o contacto..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtrar flotas</span>
          </Button>
          <Button variant="outline" size="icon">
            <FileText className="h-4 w-4" />
            <span className="sr-only">Exportar flotas</span>
          </Button>
        </div>

        <Tabs defaultValue="todas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="todas">Todas ({filteredFlotas.length})</TabsTrigger>
            <TabsTrigger value="activas">
              Activas ({filteredFlotas.filter((f) => f.estado_operativo === "Activa").length})
            </TabsTrigger>
            <TabsTrigger value="negociacion">
              En Negociación ({filteredFlotas.filter((f) => f.estado_operativo === "En Negociación").length})
            </TabsTrigger>
            <TabsTrigger value="inactivas">
              Inactivas ({filteredFlotas.filter((f) => f.estado_operativo === "Inactiva").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="todas">
            <Card>
              <CardHeader>
                <CardTitle>Todas las Flotas</CardTitle>
                <CardDescription>Mostrando {filteredFlotas.length} flotas registradas en el sistema.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Banco</TableHead>
                      <TableHead>Propetario</TableHead>
                      <TableHead>Identificacion Fiscal</TableHead>
                      <TableHead>Vehículos</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha Creacion</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFlotas.map((flota) => (
                      <TableRow key={flota.id}>
                        <TableCell className="font-medium">{flota.nombre}</TableCell>
                        <TableCell>{flota.empresa}</TableCell>
                        <TableCell>{flota.nombre_banco}</TableCell>
                        <TableCell>{flota.propietario}</TableCell>
                        <TableCell>{flota.identificacion_fiscal}</TableCell>
                        <TableCell>{flota.cantidad_vehiculos}</TableCell>
                        <TableCell>{getEstadoBadge(flota.estado_operativo)}</TableCell>
                        <TableCell>{flota.created_at}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => verDetalle(flota)} title="Ver detalles">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => verConductores(flota)}
                              title="Ver conductores"
                            >
                              <Users className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => verRendimiento(flota)}
                              title="Ver rendimiento"
                            >
                              <BarChart className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(flota)}
                              title="Editar flota"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDeleteDialog(flota)}
                              title="Eliminar flota"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tabs filtradas por estado */}
          {["activas", "negociacion", "inactivas"].map((tab) => {
            const estadoMap = {
              activas: "Activa",
              negociacion: "En Negociación",
              inactivas: "Inactiva",
            }
            const estado = estadoMap[tab as keyof typeof estadoMap] as string
            const flotasFiltradas = filteredFlotas.filter((f) => f.estado_operativo === estado)

            return (
              <TabsContent key={tab} value={tab}>
                <Card>
                  <CardHeader>
                    <CardTitle>Flotas {estado}s</CardTitle>
                    <CardDescription>
                      Mostrando {flotasFiltradas.length} flotas con estado {estado.toLowerCase()}.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Empresa</TableHead>
                          <TableHead>Banco</TableHead>
                          <TableHead>Propietario</TableHead>
                          <TableHead>Contacto</TableHead>
                          <TableHead>Correo</TableHead>
                          <TableHead>Identificacion Fiscal</TableHead>
                          <TableHead>Vehículos</TableHead>
                          <TableHead>Fecha Creacion</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {flotasFiltradas.map((flota) => (
                          <TableRow key={flota.id}>
                            <TableCell className="font-medium">{flota.nombre}</TableCell>
                            <TableCell>{flota.empresa}</TableCell>
                            <TableCell>{flota.nombre_banco}</TableCell>
                            <TableCell>{flota.propietario}</TableCell>
                            <TableCell>{flota.telefono}</TableCell>
                            <TableCell>{flota.correo}</TableCell>
                            <TableCell>{flota.identificacion_fiscal}</TableCell>
                            <TableCell>{flota.cantidad_vehiculos}</TableCell>
                            <TableCell>{flota.created_at}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => verDetalle(flota)}
                                  title="Ver detalles"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => verConductores(flota)}
                                  title="Ver conductores"
                                >
                                  <Users className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => verRendimiento(flota)}
                                  title="Ver rendimiento"
                                >
                                  <BarChart className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openEditDialog(flota)}
                                  title="Editar flota"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openDeleteDialog(flota)}
                                  title="Eliminar flota"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>

      {/* Diálogo para mostrar detalles de la flota */}
      <Dialog open={mostrarDetalle} onOpenChange={setMostrarDetalle}>
        <DialogContent className="sm:max-w-[100rem] w-[150rem] h-[95%] overflow-auto">
          <DialogHeader>
            <DialogTitle>Detalle de Flota</DialogTitle>
            <DialogDescription>Información completa de la flota seleccionada</DialogDescription>
          </DialogHeader>
          {flotaSeleccionada && <DetalleFlota flota={flotaSeleccionada} />}
        </DialogContent>
      </Dialog>

      {/* Diálogo para mostrar conductores de la flota */}
      <Dialog open={mostrarConductores} onOpenChange={setMostrarConductores}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Conductores de la Flota</DialogTitle>
            <DialogDescription>Listado de conductores asignados a esta flota</DialogDescription>
          </DialogHeader>
          {flotaSeleccionada && <ConductoresFlota flota={flotaSeleccionada} />}
        </DialogContent>
      </Dialog>

      {/* Diálogo para mostrar rendimiento de la flota */}
      <Dialog open={mostrarRendimiento} onOpenChange={setMostrarRendimiento}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Rendimiento de la Flota</DialogTitle>
            <DialogDescription>Estadísticas y métricas de rendimiento</DialogDescription>
          </DialogHeader>
          {flotaSeleccionada && <RendimientoFlota flota={flotaSeleccionada} />}
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmación para eliminar */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente la flota{" "}
              <strong>{flotaToDelete?.nombre}</strong> del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={FN_DELETE_FLOTA}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
