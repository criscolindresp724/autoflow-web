"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, FileText, Eye, Clock, Edit, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NuevoMiembroForm } from "./nuevo-miembro-form"
import { Badge } from "@/components/ui/badge"
import { DetalleMiembro } from "./detalle-miembro"
import { HorariosMiembro } from "./horarios-miembro"
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
import EQUIPO_TRABAJO_SERVICES, { MiembroEquipoTrabajoType } from "@/services/EQUIPO_TRABAJO_SERVICES.service"
import { FormatDateFullSpanish, FormatToUSD } from "@/helpers/HelpersFunctions"
import { toast } from "sonner"

export function EquipoPage() {
  const [miembros, setMiembros] = useState<MiembroEquipoTrabajoType[]>([])
  const [open, setOpen] = useState(false)
  const [editingMiembro, setEditingMiembro] = useState<MiembroEquipoTrabajoType | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [miembroToDelete, setMiembroToDelete] = useState<MiembroEquipoTrabajoType | null>(null)
  const [miembroSeleccionado, setMiembroSeleccionado] = useState<MiembroEquipoTrabajoType | null>(null)
  const [mostrarDetalle, setMostrarDetalle] = useState(false)
  const [mostrarHorarios, setMostrarHorarios] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const FN_GET_EQUIPO_TRABAJO = async () => {
    const EquipoTrabajo = await EQUIPO_TRABAJO_SERVICES.GET_ALL_EQUIPO()
    setMiembros(EquipoTrabajo)
  }
  const FN_DELETE_MIEMBRO = async () => {
    await EQUIPO_TRABAJO_SERVICES.DELETE_MIEMBRO(miembroToDelete.id)
    setMiembros((prev) => prev.filter((m) => m.id !== miembroToDelete.id))
    setDeleteDialogOpen(false)
    setMiembroToDelete(null)
    toast.success('Miembro equipo eliminado correctamente✅')
  }

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    FN_GET_EQUIPO_TRABAJO()
  }, [])

  const openEditDialog = (miembro: MiembroEquipoTrabajoType) => {
    setEditingMiembro(miembro)
    setOpen(true)
  }

  const openDeleteDialog = (miembro: MiembroEquipoTrabajoType) => {
    setMiembroToDelete(miembro)
    setDeleteDialogOpen(true)
  }

  const verDetalle = (miembro: MiembroEquipoTrabajoType) => {
    setMiembroSeleccionado(miembro)
    setMostrarDetalle(true)
  }

  const verHorarios = (miembro: MiembroEquipoTrabajoType) => {
    setMiembroSeleccionado(miembro)
    setMostrarHorarios(true)
  }

  const filteredMiembros = miembros.filter(
    (miembro) =>
      miembro.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      miembro.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      miembro.cargos_taller.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      miembro.especialidades_taller.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Activo":
        return <Badge className="bg-green-500 hover:bg-green-600">{estado}</Badge>
      case "Inactivo":
        return <Badge className="bg-gray-500 hover:bg-gray-600">{estado}</Badge>
      case "De Vacaciones":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{estado}</Badge>
      case "Permiso":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">{estado}</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Equipo de Trabajo</h1>
          <div className="flex items-center gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingMiembro(null)}>
                  <Plus className="mr-2 h-4 w-4" /> Nuevo Miembro
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>{editingMiembro ? "Editar Miembro" : "Nuevo Miembro del Equipo"}</DialogTitle>
                  <DialogDescription>
                    {editingMiembro
                      ? "Modifica la información del miembro del equipo."
                      : "Ingresa la información del nuevo miembro."}
                  </DialogDescription>
                </DialogHeader>
                <NuevoMiembroForm
                  // onSubmit={editingMiembro ? handleEditMiembro : handleAddMiembro}
                  onSuccess={() => { FN_GET_EQUIPO_TRABAJO(), setOpen(false) }}
                  miembroExistente={editingMiembro}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar miembros por nombre, cargo o especialidad..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtrar miembros</span>
          </Button>
          <Button variant="outline" size="icon">
            <FileText className="h-4 w-4" />
            <span className="sr-only">Exportar lista</span>
          </Button>
        </div>

        <Tabs defaultValue="todos" className="space-y-4">
          <TabsList>
            <TabsTrigger value="todos">Todos ({filteredMiembros.length})</TabsTrigger>
            <TabsTrigger value="tecnicos">
              Técnicos ({filteredMiembros.filter((m) => m.cargos_taller.nombre.includes("Tecnico")).length})
            </TabsTrigger>
            <TabsTrigger value="administrativos">
              Administrativos ({filteredMiembros.filter((m) => m.cargos_taller.nombre.includes("Administrador")).length})
            </TabsTrigger>
            <TabsTrigger value="ausentes">
              Ausentes ({filteredMiembros.filter((m) => m.estado_personal.nombre === "De Vacaciones" || m.estado_personal.nombre === "Permiso").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="todos">
            <Card>
              <CardHeader>
                <CardTitle>Todos los Miembros</CardTitle>
                <CardDescription>
                  Mostrando {filteredMiembros.length} miembros registrados en el sistema.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Especialidad</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Órdenes Completadas</TableHead>
                      <TableHead>Salario</TableHead>
                      <TableHead>Fecha Ingreso</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMiembros.map((miembro) => (
                      <TableRow key={miembro.id}>
                        <TableCell className="font-medium">
                          {miembro.nombre} {miembro.apellido}
                        </TableCell>
                        <TableCell>{miembro.cargos_taller.nombre}</TableCell>
                        <TableCell>{miembro.especialidades_taller.nombre}</TableCell>
                        <TableCell>{miembro.telefono}</TableCell>
                        <TableCell>{getEstadoBadge(miembro.estado_personal.nombre)}</TableCell>
                        <TableCell>{miembro.ordenes_completadas}</TableCell>
                        <TableCell>{FormatToUSD(miembro.salario)}</TableCell>
                        <TableCell>{FormatDateFullSpanish(miembro.created_at)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => verDetalle(miembro)}
                              title="Ver detalles"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => verHorarios(miembro)}
                              title="Ver horarios"
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(miembro)}
                              title="Editar miembro"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDeleteDialog(miembro)}
                              title="Eliminar miembro"
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

          {/* Tabs filtradas por tipo */}
          {["tecnicos", "administrativos", "ausentes"].map((tab) => {
            let miembrosFiltrados: MiembroEquipoTrabajoType[] = []

            if (tab === "tecnicos") {
              miembrosFiltrados = filteredMiembros.filter((m) => m.cargos_taller.nombre.includes("Tecnico"))
            } else if (tab === "administrativos") {
              miembrosFiltrados = filteredMiembros.filter((m) => m.cargos_taller.nombre.includes("Administrador"))
            } else if (tab === "ausentes") {
              miembrosFiltrados = filteredMiembros.filter((m) => m.estado_personal.nombre === "De Vacaciones" || m.estado_personal.nombre === "Permiso")
            }

            return (
              <TabsContent key={tab} value={tab}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {tab === "tecnicos" && "Técnicos"}
                      {tab === "administrativos" && "Administrativos"}
                      {tab === "ausentes" && "Miembros Ausentes"}
                    </CardTitle>
                    <CardDescription>Mostrando {miembrosFiltrados.length} miembros en esta categoría.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Cargo</TableHead>
                          <TableHead>Especialidad</TableHead>
                          <TableHead>Teléfono</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Ordenes Completadas</TableHead>
                          <TableHead>Salario</TableHead>
                          <TableHead>Fecha Ingreso</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {miembrosFiltrados.map((miembro) => (
                          <TableRow key={miembro.id}>
                            <TableCell className="font-medium">
                              {miembro.nombre} {miembro.apellido}
                            </TableCell>
                            <TableCell>{miembro.cargos_taller.nombre}</TableCell>
                            <TableCell>{miembro.especialidades_taller.nombre}</TableCell>
                            <TableCell>{miembro.telefono}</TableCell>
                            <TableCell>{getEstadoBadge(miembro.estado_personal.nombre)}</TableCell>
                            <TableCell>{miembro.ordenes_completadas}</TableCell>
                            <TableCell>{FormatToUSD(miembro.salario)}</TableCell>
                            <TableCell>{FormatDateFullSpanish(miembro.created_at)}</TableCell>

                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => verDetalle(miembro)}
                                  title="Ver detalles"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => verHorarios(miembro)}
                                  title="Ver horarios"
                                >
                                  <Clock className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openEditDialog(miembro)}
                                  title="Editar miembro"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openDeleteDialog(miembro)}
                                  title="Eliminar miembro"
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

      {/* Diálogo para mostrar detalles del miembro */}
      <Dialog open={mostrarDetalle} onOpenChange={setMostrarDetalle}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Detalle del Miembro</DialogTitle>
            <DialogDescription>Información completa del miembro seleccionado</DialogDescription>
          </DialogHeader>
          {miembroSeleccionado && <DetalleMiembro miembro={miembroSeleccionado} />}
        </DialogContent>
      </Dialog>

      {/* Diálogo para mostrar horarios del miembro */}
      <Dialog open={mostrarHorarios} onOpenChange={setMostrarHorarios}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Horarios del Miembro</DialogTitle>
            <DialogDescription>Horarios y calendario de trabajo</DialogDescription>
          </DialogHeader>
          {miembroSeleccionado && <HorariosMiembro miembro={miembroSeleccionado} />}
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmación para eliminar */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente a{" "}
              <strong>
                {miembroToDelete?.nombre} {miembroToDelete?.apellido}
              </strong>{" "}
              del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={FN_DELETE_MIEMBRO}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
