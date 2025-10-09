"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import TALLER_SERVICES, { CargoTallerType, EspecialidadType, EstadoPersonalType } from "@/services/TALLER_SERVICES.SERVICE"
import EQUIPO_TRABAJO_SERVICES, { InsertMiembroEquipo, MiembroEquipoTrabajoType } from "@/services/EQUIPO_TRABAJO_SERVICES.service"
import { toast } from "sonner"

interface MiembroForm {
  nombre: string
  apellido: string
  cargo: string
  especialidad: string
  telefono: string
  email: string
  estado: "Activo" | "Inactivo" | "De Vacaciones" | "Permiso"
  salario?: number
}

interface NuevoMiembroFormProps {
  onSuccess: () => void
  miembroExistente?: MiembroEquipoTrabajoType
}

export function NuevoMiembroForm({ onSuccess, miembroExistente }: NuevoMiembroFormProps) {
  const [formData, setFormData] = useState<InsertMiembroEquipo>({
    nombre: "",
    apellido: "",
    cargo_id: 1,
    especialidad_id: 1,
    telefono: "",
    email: "",
    estado_personal_id: 1,
    salario: null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [State_Especialidades, SetState_Especialidades] = useState<EspecialidadType[]>([])
  const [State_Cargos, SetState_Cargos] = useState<CargoTallerType[]>([])
  const [State_EstadosPersonal, SetState_EstadosPersonal] = useState<EstadoPersonalType[]>([])

  const validateMiembroEquipo = (formData: InsertMiembroEquipo): string | null => {
    const { nombre, apellido, cargo_id, especialidad_id, telefono, email, estado_personal_id, salario } = formData;

    if (!nombre.trim()) return "El nombre es obligatorio.";
    if (!apellido.trim()) return "El apellido es obligatorio.";
    if (!telefono.trim()) return "El teléfono es obligatorio.";

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) return "El correo electrónico no es válido.";

    if (cargo_id <= 0) return "Debe seleccionar un cargo válido.";
    if (especialidad_id <= 0) return "Debe seleccionar una especialidad válida.";
    if (salario <= 0) return "El salario debe ser mayor a 0.";

    return null; // ✅ Si todo está bien
  }


  const FN_GET_DATA_INPUTS = async () => {
    const res1 = await TALLER_SERVICES.GET_ESPECIALIDADES()
    SetState_Especialidades(res1)
    const res2 = await TALLER_SERVICES.GET_CARGO_MIEMBRO_EQUIPO()
    SetState_Cargos(res2)
    const res3 = await TALLER_SERVICES.GET_ESTADO_PERSONAL()
    SetState_EstadosPersonal(res3)
  }

  const FN_INSERT_MIEMBRO = async () => {
    if (validateMiembroEquipo(formData)) return toast.warning(validateMiembroEquipo(formData) as string)
    await EQUIPO_TRABAJO_SERVICES.INSERT_MIEMBRO({ ...formData, estado_personal_id: formData.estado_personal_id || miembroExistente.estado_personal_id })
    toast.success('Nuevo Miembro de equipo de trabajo creado correctamente✅')
    onSuccess && onSuccess()
  }
  const FN_UPDATE_MIEMBRO = async () => {
    if (validateMiembroEquipo(formData)) return toast.warning(validateMiembroEquipo(formData) as string)
    await EQUIPO_TRABAJO_SERVICES.UPDATE_MIEMBRO({ id: miembroExistente.id, ...formData, estado_personal_id: formData.estado_personal_id || miembroExistente.estado_personal_id })
    toast.success('Miembro de equipo de trabajo actualizado correctamente✅')
    onSuccess && onSuccess()
  }

  useEffect(() => {
    FN_GET_DATA_INPUTS()
  }, [])

  // Cargar datos del miembro existente si se está editando
  useEffect(() => {
    if (miembroExistente) {
      setFormData({
        nombre: miembroExistente.nombre || "",
        apellido: miembroExistente.apellido || "",
        cargo_id: miembroExistente.cargo_id,
        especialidad_id: miembroExistente.especialidad_id,
        telefono: miembroExistente.telefono || "",
        email: miembroExistente.email || "",
        estado_personal_id: null,
        salario: miembroExistente.salario || 0,
      })
    }
  }, [miembroExistente])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "salario" ? Number.parseFloat(value) || 0 : value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    if (!miembroExistente) {
      await FN_INSERT_MIEMBRO()
    } else {
      await FN_UPDATE_MIEMBRO()
    }

    // Limpiar formulario si no es edición
    if (!miembroExistente) {
      setFormData({
        nombre: "",
        apellido: "",
        cargo_id: 1,
        especialidad_id: 1,
        telefono: "",
        email: "",
        estado_personal_id: 1,
        salario: 0,
      })
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="nombre">Nombre *</Label>
          <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required placeholder="Ingresa un nombre" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="apellido">Apellido *</Label>
          <Input id="apellido" name="apellido" value={formData.apellido} onChange={handleInputChange} required placeholder="Ingresa un apellido" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="cargo">Cargo *</Label>
          <Select onValueChange={(value) => handleSelectChange("cargo_id", value)} value={formData.cargo_id.toString()}>
            <SelectTrigger id="cargo">
              <SelectValue placeholder="Seleccionar cargo" />
            </SelectTrigger>
            <SelectContent>
              {
                State_Cargos.map((cargo) => (
                  <SelectItem key={cargo.nombre} value={cargo.id.toString()}>{cargo.nombre}</SelectItem>

                ))
              }
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="especialidad">Especialidad *</Label>
          <Select onValueChange={(value) => handleSelectChange("especialidad_id", value)} value={formData.especialidad_id.toString()}>
            <SelectTrigger id="especialidad">
              <SelectValue placeholder="Seleccionar especialidad" />
            </SelectTrigger>
            <SelectContent>
              {
                State_Especialidades.map((esp) => (
                  <SelectItem key={esp.nombre} value={esp.id.toString()}>{esp.nombre}</SelectItem>

                ))
              }
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="telefono">Teléfono *</Label>
          <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} required placeholder="Ingresa un numero de telefono" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="Ingresa un email" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="estado_personal_id">Estado *</Label>
          <Select onValueChange={(value) => handleSelectChange("estado_personal_id", value)} value={formData.estado_personal_id ? formData.estado_personal_id.toString() : miembroExistente.estado_personal_id.toString()}>
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
        <div className="grid gap-2">
          <Label htmlFor="salario">Salario (L)</Label>
          <Input
            id="salario"
            name="salario"
            type="number"
            min="0"
            step="0.01"
            value={formData.salario}
            onChange={handleInputChange}
            placeholder="Ingresa un salario"
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : miembroExistente ? "Actualizar Miembro" : "Guardar Miembro"}
        </Button>
      </div>
    </form>
  )
}
