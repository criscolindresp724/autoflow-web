import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Función para crear el cliente de administración
function createAdminClient() {
  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL no está definido")
  }

  if (!supabaseServiceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY no está definido")
  }

  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Cliente de administración - solo se crea cuando se necesita
export const supabaseAdmin = (() => {
  try {
    return createAdminClient()
  } catch (error) {
    // En caso de error durante el build, retornamos un cliente mock
    console.warn("No se pudo crear el cliente de administración:", error)
    return null
  }
})()

// Exportar por defecto
export default supabaseAdmin
