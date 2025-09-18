import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { TallerDashboard } from "@/components/taller/taller-dashboard"
import { AseguradoraDashboard } from "@/components/aseguradora/aseguradora-dashboard"
import { ClienteDashboard } from "@/components/cliente/cliente-dashboard"

export default async function DashboardPage() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookies().get(name)?.value
        },
        set(name, value, options) {
          cookies().set({ name, value, ...options })
        },
        remove(name, options) {
          cookies().set({ name, value: '', ...options })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login")
  }

  // Obtener el rol del usuario
  const { data: userRoles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).single()

  const role = userRoles?.role || "cliente"

  // Renderizar el dashboard correspondiente según el rol
  switch (role) {
    case "admin":
      return <AdminDashboard />
    case "taller":
      return <TallerDashboard />
    case "aseguradora":
      return <AseguradoraDashboard />
    case "cliente":
    default:
      return <ClienteDashboard />
  }
}
