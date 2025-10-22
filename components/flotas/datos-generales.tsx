"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import FLOTAS_SERVICES, { FlotaType } from "@/services/FLOTAS_SERVICES.service"
import { toast } from "sonner"


interface NuevaFlotaFormProps {
  onSuccess?: () => void;
  flotaExistente?: FlotaType
}

export default function DatosGenerales({ onSuccess, flotaExistente }: NuevaFlotaFormProps) {
  const [formData, setFormData] = useState<Omit<FlotaType, 'id' | 'created_at' | 'contacto_departamento_id'>>({
    nombre: null,
    empresa: null,
    propietario: null,
    telefono: null,
    correo: null,
    cantidad_vehiculos: 1,
    estado_operativo: "Activa",
    descripcion: null,
    identificacion_fiscal: null,
    info_banco_id: 0,
    metodo_pago_id: 1,
    nombre_banco: "",
    numero_rtn: ''
  })
  const isFormValid = () => {
    const {
      nombre,
      empresa,
      propietario,
      telefono,
      correo,
      cantidad_vehiculos,
      descripcion,
      identificacion_fiscal,
      info_banco_id,
      metodo_pago_id,
      nombre_banco,
    } = formData;

    // Validar que todos los campos tengan valores válidos
    return (
      nombre &&
      empresa &&
      propietario &&
      telefono &&
      correo &&
      descripcion &&
      identificacion_fiscal &&
      nombre_banco &&
      cantidad_vehiculos > 0 &&
      metodo_pago_id > 0
    );
  };
  const [isSubmitting, setIsSubmitting] = useState(false)


  const FN_INSERT_FLOTA = async () => {
    setIsSubmitting(true)
    console.log(formData)
    console.log('entra insert')
    if (!isFormValid()) {
      toast.warning('Por favor completa todos los campos del formulario.')
      setIsSubmitting(false)
      return;
    }
    await FLOTAS_SERVICES.INSERT_FLOTA(formData)
    onSuccess && onSuccess()
    setIsSubmitting(false)
    toast.success('Nueva Flota Registrada Correctamente✅')
  }

  const FN_UPDATE_FLOTA = async () => {
    setIsSubmitting(true)
    console.log(formData)
    console.log('entra')
    if (!isFormValid()) {
      toast.warning('Por favor completa todos los campos del formulario.')
      setIsSubmitting(false)
      return;
    }
    await FLOTAS_SERVICES.UPDATE_FLOTA({ ...formData, id: flotaExistente.id, estado_operativo: formData.estado_operativo || flotaExistente.estado_operativo })
    onSuccess && onSuccess()
    setIsSubmitting(false)
    toast.success('Flota Actualizada Correctamente✅')
  }



  // Cargar datos de la flota existente si se está editando
  useEffect(() => {
    if (flotaExistente) {
      console.log(flotaExistente)
      setFormData({
        nombre: flotaExistente.nombre || "",
        empresa: flotaExistente.empresa || "",
        propietario: flotaExistente.propietario || "",
        telefono: flotaExistente.telefono || "",
        correo: flotaExistente.correo || "",
        cantidad_vehiculos: flotaExistente.cantidad_vehiculos || 0,
        descripcion: flotaExistente.descripcion || "",
        identificacion_fiscal: flotaExistente.identificacion_fiscal,
        nombre_banco: flotaExistente.nombre_banco,
        metodo_pago_id: flotaExistente.metodo_pago_id
      })
    }
  }, [flotaExistente])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, estado_operativo: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simular delay de procesamiento
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (!flotaExistente) {
      FN_INSERT_FLOTA()

    } else {
      FN_UPDATE_FLOTA()
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Datos Generales - Flota numero {Math.floor(Math.random() * 100) + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4 grid-cols-4">
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre de la Flota *</Label>
            <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required placeholder="Nombre oficial de la flota" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="estado_operativo">Tipo</Label>
            <Select onValueChange={handleSelectChange} value={formData.estado_operativo || flotaExistente.estado_operativo} defaultValue={formData.estado_operativo}>
              <SelectTrigger id="estado_operativo">
                <SelectValue placeholder="Seleccionar tipo de flota" defaultValue={formData.estado_operativo} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Propia">Propia</SelectItem>
                <SelectItem value="Alquilada">Alquilada</SelectItem>
                <SelectItem value="Mixto">Mixto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="empresa">Empresa Propietaria *</Label>
            <Input id="empresa" name="empresa" value={formData.empresa} onChange={handleInputChange} required placeholder="Nombre de la empresa propietaria de la flota" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="identificacion_fiscal">Identificacion Fiscal (RTN)</Label>
            <Input
              id="identificacion_fiscal"
              name="identificacion_fiscal"
              type="text"
              value={formData.identificacion_fiscal}
              onChange={handleInputChange}
              maxLength={80}
              required
              placeholder="RTN de la empresa propietaria de la flota"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cantidad_vehiculos">Cantidad de Vehículos *</Label>
            <Input
              id="cantidad_vehiculos"
              name="cantidad_vehiculos"
              type="number"
              min="0"
              value={formData.cantidad_vehiculos}
              onChange={handleInputChange}
              required
              placeholder="Número total de vehículos en la flota"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="estado_operativo">Categoria de vehiculos</Label>
            <Select onValueChange={handleSelectChange} value={formData.estado_operativo || flotaExistente.estado_operativo}>
              <SelectTrigger id="estado_operativo">
                <SelectValue placeholder="Seleccionar Categoria de vehiculos en la flota" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Camiones">Camiones</SelectItem>
                <SelectItem value="Vehiculos de pasajeros">Vehiculos de pasajeros</SelectItem>
                <SelectItem value="Vehiculos particulares">Vehiculos particulares</SelectItem>
                <SelectItem value="Mixto">Mixto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="estado_operativo">Estado Flota *</Label>
            <Select onValueChange={handleSelectChange} value={formData.estado_operativo || flotaExistente.estado_operativo} defaultValue={formData.estado_operativo}>
              <SelectTrigger id="estado_operativo">
                <SelectValue placeholder="Seleccionar estado" defaultValue={formData.estado_operativo} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="En Negociación">En Negociación</SelectItem>
                <SelectItem value="Inactiva">Inactiva</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <div className="grid gap-2">
            <Label htmlFor="contacto">Rubro de la empresa</Label>
            <Input id="rubro" name="rubroEmpresa" value={formData.propietario} onChange={handleInputChange} required placeholder="Transporte, Logistica, Mensajeria, etc..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="telefono">Direccion Fisica</Label>
            <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} required placeholder="Ubicacion Fisica de las oficinas o base operativa de la flota" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="telefono">Teléfono de contacto *</Label>
              <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} required placeholder="Numero de talefono principal de la flota" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="correo">Correo de contacto *</Label>
              <Input id="correo" name="correo" value={formData.correo} onChange={handleInputChange} required placeholder="Correo de contacto principal de gestiones" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Sitio Web *</Label>
            <Input id="email" name="correo" type="email" value={formData.correo} onChange={handleInputChange} required placeholder="Enlace web de la empresa (opcinal)" />
          </div>




          {/* <div className="grid gap-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Descripción adicional de la flota..."
              rows={3}
            />
          </div> */}
          {/* 
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : flotaExistente ? "Actualizar Flota" : "Guardar Flota"}
        </Button>
      </div> */}
        </form>
      </CardContent>
    </Card>

  )
}
