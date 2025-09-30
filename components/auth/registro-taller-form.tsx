"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/supabase/auth"
import { toast } from "sonner"

const formSchema = z.object({
  nombre_taller: z.string().min(3, {
    message: "El nombre del taller debe tener al menos 3 caracteres.",
  }),
  direccion: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),
  ciudad: z.string().min(2, {
    message: "La ciudad es requerida.",
  }),
  estado: z.string().min(2, {
    message: "El estado es requerido.",
  }),
  codigo_postal: z.string().min(5, {
    message: "El código postal debe tener al menos 5 caracteres.",
  }),
  nombre_contacto: z.string().min(3, {
    message: "El nombre de contacto debe tener al menos 3 caracteres.",
  }),
  apellido_contacto: z.string().min(3, {
    message: "El apellido de contacto debe tener al menos 3 caracteres.",
  }),
  telefono: z.string().min(10, {
    message: "El teléfono debe tener al menos 10 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
  descripcion: z.string().optional(),
  modulos: z.record(z.boolean()).refine(
    (data) => {
      return Object.values(data).some((value) => value === true)
    },
    {
      message: "Debes seleccionar al menos un módulo.",
    },
  ),
  terminos: z.boolean().refine((value) => value === true, {
    message: "Debes aceptar los términos y condiciones.",
  }),
})

const modulos = [
  {
    id: "clientes",
    nombre: "Gestión de Clientes",
    descripcion: "Administra toda la información de tus clientes y sus vehículos.",
    icono: "👥",
  },
  {
    id: "ordenes",
    nombre: "Órdenes de Servicio",
    descripcion: "Crea y gestiona órdenes de servicio con seguimiento en tiempo real.",
    icono: "📝",
  },
  {
    id: "cotizaciones",
    nombre: "Cotizaciones",
    descripcion: "Genera cotizaciones profesionales para tus clientes.",
    icono: "💰",
  },
  {
    id: "inventario",
    nombre: "Inventario",
    descripcion: "Controla tu inventario de repuestos y materiales.",
    icono: "🔧",
  },
  {
    id: "kanban",
    nombre: "Tablero Kanban",
    descripcion: "Visualiza el flujo de trabajo de tu taller.",
    icono: "📊",
  },
  {
    id: "reportes",
    nombre: "Reportes",
    descripcion: "Genera reportes detallados sobre el rendimiento de tu taller.",
    icono: "📈",
  },
  {
    id: "calendario",
    nombre: "Calendario",
    descripcion: "Programa citas y servicios con un calendario integrado.",
    icono: "📅",
  },
  {
    id: "facturacion",
    nombre: "Facturación",
    descripcion: "Emite facturas electrónicas directamente desde la plataforma.",
    icono: "🧾",
  },
  {
    id: "tecnicos",
    nombre: "Gestión de Técnicos",
    descripcion: "Administra tu equipo de técnicos, horarios y asignaciones.",
    icono: "👨‍🔧",
  },
]

export function RegistroTallerForm() {
  const { signUpTaller } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("informacion")
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre_taller: "",
      direccion: "",
      ciudad: "",
      estado: "",
      codigo_postal: "",
      nombre_contacto: "",
      telefono: "",
      email: "",
      password: "",
      descripcion: "",
      modulos: {
        clientes: true,
        ordenes: true,
        cotizaciones: false,
        inventario: false,
        kanban: false,
        reportes: false,
        calendario: false,
        facturacion: false,
        tecnicos: false,
      },
      terminos: false,
    },
  })

  const watchedModulos = form.watch("modulos")
  const modulosSeleccionados = Object.entries(watchedModulos || {})
    .filter(([_, value]) => value)
    .map(([key, _]) => key)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const DataSolicitudTaller = {
        nombre_taller: values.nombre_taller,
        direccion: values.direccion,
        ciudad: values.ciudad,
        estado: values.estado,
        codigo_postal: values.codigo_postal,
        nombre_contacto: values.nombre_contacto,
        telefono: values.telefono,
        email: values.email,
        descripcion: values.descripcion,
        modulos_seleccionados: modulosSeleccionados
      }
      console.log(DataSolicitudTaller)
      // Registrar el usuario en Supabase
      const { success, error } = await signUpTaller(values.email, values.password, values.nombre_contacto, values.apellido_contacto, values.telefono, DataSolicitudTaller)

      if (!success) return toast.error(error)

      toast.success('¡Registro exitoso! Tu solicitud ha sido enviada y será revisada por nuestro equipo. Te notificaremos por correo electrónico cuando tu cuenta esté activada.')

      // Redirigir después de 5 segundos
      setTimeout(() => {
        router.push("/auth/login")
      }, 5000)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextTab = () => {
    console.log('ejecuta')
    if (activeTab === "informacion") {
      // Validar campos de la primera pestaña
      form.trigger([
        "nombre_taller",
        "direccion",
        "ciudad",
        "estado",
        "codigo_postal",
        "nombre_contacto",
        "telefono",
        "email",
        "password",
      ])

      const hasErrors =
        !!form.formState.errors.nombre_taller ||
        !!form.formState.errors.direccion ||
        !!form.formState.errors.ciudad ||
        !!form.formState.errors.estado ||
        !!form.formState.errors.codigo_postal ||
        !!form.formState.errors.nombre_contacto ||
        !!form.formState.errors.telefono ||
        !!form.formState.errors.email ||
        !!form.formState.errors.password

      if (!hasErrors) {
        setActiveTab("modulos")
      }
    } else if (activeTab === "modulos") {
      // Validar campos de la segunda pestaña
      form.trigger(["modulos"])

      if (!form.formState.errors.modulos) {
        setActiveTab("confirmacion")
      }
    }
  }

  const handlePrevTab = () => {
    if (activeTab === "modulos") {
      setActiveTab("informacion")
    } else if (activeTab === "confirmacion") {
      setActiveTab("modulos")
    }
  }

  return (
    <main className="">

      <div className="grid gap-6">

        <Form {...form}  >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="informacion">Información</TabsTrigger>
                <TabsTrigger value="modulos">Módulos</TabsTrigger>
                <TabsTrigger value="confirmacion">Confirmación</TabsTrigger>
              </TabsList>

              <TabsContent value="informacion" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="nombre_taller"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre del Taller</FormLabel>
                        <FormControl>
                          <Input placeholder="Taller Mecánico Express" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="direccion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Input placeholder="Av. Principal #123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="ciudad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Input placeholder="Ciudad" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="estado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input placeholder="Estado" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="codigo_postal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código Postal</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nombre_contacto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de Contacto</FormLabel>
                        <FormControl>
                          <Input placeholder="Juan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="apellido_contacto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido de Contacto</FormLabel>
                        <FormControl>
                          <Input placeholder="Perez" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input placeholder="correo@ejemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción del Taller (opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Cuéntanos más sobre tu taller, especialidades, etc."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="button" onClick={handleNextTab}>
                    Siguiente
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="modulos" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Selecciona los módulos que deseas activar</h3>
                    <p className="text-sm text-muted-foreground">
                      Puedes seleccionar los módulos que necesitas ahora y agregar más en el futuro.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modulos.map((modulo) => (
                      <FormField
                        key={modulo.id}
                        control={form.control}
                        name={`modulos.${modulo.id}`}
                        render={({ field }) => (
                          <FormItem>
                            <Card className={`cursor-pointer transition-all ${field.value ? "border-primary" : ""}`}>
                              <CardContent
                                className="p-4 flex items-start space-x-4"
                              // onClick={() => field.onChange(!field.value)}
                              >
                                <div className="text-3xl">{modulo.icono}</div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium">{modulo.nombre}</h4>
                                    <FormControl>
                                      <Checkbox checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">{modulo.descripcion}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  {/* {form.formState.errors.modulos && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.modulos.message}</p>
                  )} */}
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handlePrevTab}>
                    Anterior
                  </Button>
                  <Button type="button" onClick={handleNextTab}>
                    Siguiente
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="confirmacion" className="space-y-4 pt-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Resumen de Registro</h3>
                    <p className="text-sm text-muted-foreground">
                      Por favor revisa la información antes de enviar tu solicitud.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Información del Taller</h4>
                        <div className="mt-2 space-y-2">
                          <p>
                            <span className="font-medium">Nombre:</span> {form.getValues("nombre_taller")}
                          </p>
                          <p>
                            <span className="font-medium">Dirección:</span> {form.getValues("direccion")}
                          </p>
                          <p>
                            <span className="font-medium">Ubicación:</span> {form.getValues("ciudad")},{" "}
                            {form.getValues("estado")}, CP: {form.getValues("codigo_postal")}
                          </p>
                          <p>
                            <span className="font-medium">Contacto:</span> {form.getValues("nombre_contacto")}
                          </p>
                          <p>
                            <span className="font-medium">Teléfono:</span> {form.getValues("telefono")}
                          </p>
                          <p>
                            <span className="font-medium">Email:</span> {form.getValues("email")}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Módulos Seleccionados</h4>
                        <div className="mt-2 space-y-2">
                          {modulosSeleccionados.length > 0 ? (
                            <ul className="list-disc list-inside">
                              {modulosSeleccionados.map((moduloId) => {
                                const modulo = modulos.find((m) => m.id === moduloId)
                                return modulo ? <li key={moduloId}>{modulo.nombre}</li> : null
                              })}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">No has seleccionado ningún módulo.</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="terminos"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Acepto los términos y condiciones</FormLabel>
                            <FormDescription>
                              Al registrarte, aceptas nuestros{" "}
                              <Link href="/terminos" className="text-primary underline">
                                términos de servicio
                              </Link>{" "}
                              y{" "}
                              <Link href="/privacidad" className="text-primary underline">
                                política de privacidad
                              </Link>
                              .
                            </FormDescription>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handlePrevTab}>
                    Anterior
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Solicitud"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>

        <div className="text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </main>

  )
}
