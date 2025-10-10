"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Car, FileText, Save } from "lucide-react"
import { FlotaType } from "@/services/FLOTAS_SERVICES.service"
import DatosGenerales from "./datos-generales"
import JefeFlotaForm from "./jefe-flota"
import DatosComunicacionForm from "./datos-comunicacion"
import { FormatDateFullSpanish } from "@/helpers/HelpersFunctions"
import DatosNegociacion from "./datos-negocacion"
import DatosBancarios from "./datos-bancarios"
import TerminosContratosPoliticas from "./terminos-politicas-contratos"
import { ConductoresFlota } from "./conductores-flota"
import UnidadesFlotas from "./unidades-flota"

interface DetalleFlotaProps {
  flota?: FlotaType
}

export function DetalleFlota({ flota }: DetalleFlotaProps) {


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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informacion General</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nombre de la Flota</p>
              <p className="text-lg font-semibold">{flota?.nombre || 'Nombre de la flota'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Empresa</p>
              <p className="text-lg font-semibold">{flota?.empresa || 'Empresa asociada'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Persona de Contacto</p>
              <p className="text-lg font-semibold">{flota?.propietario || 'Persona de contacto de la flota'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
              <p className="text-lg font-semibold">{flota?.telefono || 'Telefono de contacto de la persona'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-lg font-semibold">{flota?.correo || 'Email de contacto de la persona'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Estado</p>
              <div className="mt-1">{getEstadoBadge(flota?.estado_operativo || 'Activo')}</div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Fecha de Registro</p>
              <p className="text-lg font-semibold">{flota?.created_at || FormatDateFullSpanish((new Date().toDateString()))}</p>
            </div>
            <div className="flex justify-end items-center">

              <Button size="sm" onClick={() => alert('crear flota')}>
                <Save className="mr-2 h-4 w-4" /> Guarar Flota
              </Button>
            </div>
            {/* <div>
              <p className="text-sm font-medium text-muted-foreground">Última Actualización</p>
              <p className="text-lg font-semibold">{flota?.ultimaActualizacion}</p>
            </div> */}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="jefe">Jefe de Flota</TabsTrigger>
          <TabsTrigger value="comunicacion">Comunicacion</TabsTrigger>
          <TabsTrigger value="negociacion">Negociacion</TabsTrigger>
          <TabsTrigger value="bancario">Datos Bancario</TabsTrigger>
          <TabsTrigger value="contratos">Terminos y Politicas</TabsTrigger>
          <TabsTrigger value="unidades">Inventario de unidades</TabsTrigger>
          <TabsTrigger value="conductoresFlota">Conductores de Flota</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 pt-4">
          <DatosGenerales flotaExistente={flota} />
        </TabsContent>
        <TabsContent value="jefe" className="space-y-4 pt-4">
          <JefeFlotaForm />
        </TabsContent>

        <TabsContent value="comunicacion" className="space-y-4 pt-4">
          <DatosComunicacionForm />
        </TabsContent>
        <TabsContent value="negociacion" className="space-y-4 pt-4">
          <DatosNegociacion />
        </TabsContent>
        <TabsContent value="bancario" className="space-y-4 pt-4">
          <DatosBancarios />
        </TabsContent>

        <TabsContent value="contratos" className="space-y-4 pt-4">
          <TerminosContratosPoliticas />
        </TabsContent>

        <TabsContent value="unidades" className="space-y-4 pt-4">
          <UnidadesFlotas />
        </TabsContent>

        <TabsContent value="conductoresFlota" className="space-y-4 pt-4">
          <ConductoresFlota flota={flota} />
        </TabsContent>


      </Tabs>
    </div>
  )
}
