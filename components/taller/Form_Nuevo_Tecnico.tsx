
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import TECNICO_SERVICES from "@/services/TECNICO_SERVICES.SERVICE";
import { toast } from "sonner";

export default function Form_Nuevo_Tecnico({ onSuccess }: { onSuccess?: () => void }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        especialidad: "",
        cargo: "",
        experiencia: "",
        telefono: "",
        email: "",
        direccion: "",
        habilidades: "",
        certificaciones: "",
        disponibilidad: "Disponible",
        password: "123456"
    })

    const FN_RESET_FORM = () => {
        setFormData({
            nombre: "",
            apellido: "",
            especialidad: "",
            cargo: "",
            experiencia: "",
            telefono: "",
            email: "",
            direccion: "",
            habilidades: "",
            certificaciones: "",
            disponibilidad: "Disponible",
            password: "123456"
        })
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const horario = {
            lunes: "8:00-17:00",
            martes: "8:00-17:00",
            miercoles: "8:00-17:00",
            jueves: "8:00-17:00",
            viernes: "8:00-17:00",
            sabado: "8:00-12:00",
            domingo: "Descanso",
        }
        const habilidades: string[] = formData.habilidades.split(",").map((h) => h.trim());
        const certificaciones: string[] = formData.certificaciones.split(",").map((c) => c.trim());
        const horarioArray = Object.entries(horario).map(([dia, horario]) => ({
            dia: dia.charAt(0).toUpperCase() + dia.slice(1), // Capitaliza el día
            horario,
        }));
        const res = await TECNICO_SERVICES.INSERT_TECNICO({
            info: {
                nombre: formData.nombre,
                apellido: formData.apellido,
                area: formData.especialidad,
                cant_ordenes_completadas: 0,
                cargo: formData.cargo,
                direccion: formData.direccion,
                disponible: true,
                email: formData.email,
                telefono: formData.telefono,
                tiempo_experciencia: formData.experiencia,
                calificacion: 5.5
            },
            habilidades: habilidades,
            horarios: horarioArray,
            certificaciones,
            password: formData.password
        })
        console.log(res)
        if (res.error) return (toast.error(res.error), setIsLoading(false))
        toast.success('Tecnico Creado Correctamente✅')
        onSuccess()
        setFormData({
            nombre: "",
            apellido: "",
            especialidad: "",
            cargo: "",
            experiencia: "",
            telefono: "",
            email: "",
            direccion: "",
            habilidades: "",
            certificaciones: "",
            disponibilidad: "Disponible",
            password: "123456"

        })

        setOpenDialog(false)
        setIsLoading(false)
    }



    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button className="rounded-full" onClick={FN_RESET_FORM}>
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Técnico
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[600px] h-[100vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Agregar Nuevo Técnico</DialogTitle>
                    <DialogDescription>Complete los datos para agregar un nuevo técnico al equipo.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nombre">Nombre</Label>
                                <Input
                                    id="nombre"
                                    placeholder="Nombre y apellidos"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="apellido">Apeliidos</Label>
                                <Input
                                    id="apellido"
                                    placeholder="Nombre y apellidos"
                                    value={formData.apellido}
                                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                                    required
                                />
                            </div>


                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="especialidad">Especialidad</Label>
                                <Select
                                    value={formData.cargo}
                                    onValueChange={(value) => setFormData({ ...formData, cargo: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar especialidad" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Técnico Senior">Técnico Senior</SelectItem>
                                        <SelectItem value="Técnico">Técnico</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="especialidad">Especialidad</Label>
                                <Select
                                    value={formData.especialidad}
                                    onValueChange={(value) => setFormData({ ...formData, especialidad: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar especialidad" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Mecánica General">Mecánica General</SelectItem>
                                        <SelectItem value="Electrónica Automotriz">Electrónica Automotriz</SelectItem>
                                        <SelectItem value="Carrocería y Pintura">Carrocería y Pintura</SelectItem>
                                        <SelectItem value="Diagnóstico">Diagnóstico</SelectItem>
                                        <SelectItem value="Transmisiones">Transmisiones</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="experiencia">Experiencia</Label>
                                <Input
                                    id="experiencia"
                                    placeholder="Ej: 5 años"
                                    value={formData.experiencia}
                                    onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="telefono">Teléfono</Label>
                                <Input
                                    id="telefono"
                                    placeholder="Número de teléfono"
                                    value={formData.telefono}
                                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Correo electrónico"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="Password">Contraseña</Label>
                                <Input
                                    id="Password"
                                    type="text"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="direccion">Dirección</Label>
                                <Input
                                    id="direccion"
                                    placeholder="Dirección"
                                    value={formData.direccion}
                                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="habilidades">Habilidades</Label>
                            <Textarea
                                id="habilidades"
                                placeholder="Habilidades separadas por comas"
                                value={formData.habilidades}
                                onChange={(e) => setFormData({ ...formData, habilidades: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="certificaciones">Certificaciones</Label>
                            <Textarea
                                id="certificaciones"
                                placeholder="Certificaciones separadas por comas"
                                value={formData.certificaciones}
                                onChange={(e) => setFormData({ ...formData, certificaciones: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Guardando..." : "Guardar Técnico"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}