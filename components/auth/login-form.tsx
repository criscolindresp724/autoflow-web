"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import USER_SERVICE from "@/services/USER_SERVICES.SERVICE"
import { toast } from "sonner"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setErrorDetails(null)

    try {
      // Crear cliente de Supabase con manejo de errores mejorado
      const supabase = createClientComponentClient()

      // Intentar iniciar sesión con manejo de errores detallado
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        console.error("Error de autenticación:", error)
        throw error
      }
      console.log("Usuario autenticado:", data.user)
      console.log("Usuario Roles ===========>:", data.user?.user_metadata?.role)
      // Redirigir según el rol del usuario (esto se puede personalizar)
      // return router.push("/aseguradora/dashboard")
      toast.success('Has iniciado sesión correctamente✅')
      if (data.user?.user_metadata?.role === "admin") {
        router.push("/admin/dashboard")
      } else if (data.user?.user_metadata?.role === "cliente") {
        router.push("/dashboard")
      } else if (data.user?.user_metadata?.role === "taller") {
        const taller_id = await USER_SERVICE.GET_TALLER_ID(data.user.id);
        localStorage.setItem('taller_id', taller_id || '');
        router.push("/taller/dashboard")
      } else if (data.user?.user_metadata?.role === 'aseguradora') {
        router.push("/aseguradora/dashboard")
      } else if (data.user?.user_metadata?.role === 'tecnico') {
        throw new Error('Los técnicos no pueden iniciar sesión desde esta plataforma. Por favor, utiliza la aplicación móvil.')
      }
      // router.refresh()
    } catch (err: any) {
      console.error("Error completo:", err)

      return toast.error('Credenciales inválidas. Verifica tu correo y contraseña.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-black">Iniciar Sesión</h1>
        <p className="text-gray-500">Ingresa tus credenciales para acceder al sistema</p>
      </div>



      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
            <Link href="/auth/recuperar-password" className="text-sm text-blue-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Iniciando sesión...
            </>
          ) : (
            "Iniciar Sesión"
          )}
        </Button>
      </form>

      <div className="text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href="/auth/registro" className="text-blue-600 hover:underline">
          Regístrate
        </Link>
      </div>
    </div>
  )
}
