# 🔧 Actualizar Importaciones de Supabase

## 🚨 **Problema**
El build falla porque hay archivos usando la dependencia deprecada `@supabase/auth-helpers-nextjs`:

```
Module not found: Can't resolve '@supabase/auth-helpers-nextjs'
```

## ✅ **Solución Aplicada**

He actualizado los archivos más críticos:
- ✅ `app/admin/verificar-usuarios/page.tsx`
- ✅ `app/dashboard/page.tsx`
- ✅ `components/auth/login-form.tsx`

## 📋 **Archivos Restantes por Actualizar**

### **Archivos de Componentes (Client-side)**
```bash
# Buscar y reemplazar en cada archivo:
# ANTES:
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

# DESPUÉS:
import { createBrowserClient } from "@supabase/ssr"

# Y también:
# ANTES:
const supabase = createClientComponentClient()

# DESPUÉS:
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

**Archivos a actualizar:**
- `components/vehiculos/hoja-inspeccion-exacta.tsx`
- `components/vehiculos/hoja-inspeccion.tsx`
- `components/inventario/materiales-reparacion.tsx`
- `components/inventario/nuevo-material-form.tsx`
- `components/inventario/materiales-pintura.tsx`
- `components/inventario/inventario-page.tsx`
- `components/kanban/kanban-page.tsx`
- `components/cliente/cliente-vehiculos.tsx`
- `components/cliente/cliente-historial.tsx`
- `components/cliente/cliente-citas.tsx`
- `components/cliente/cliente-cotizaciones.tsx`
- `components/auth/debug-roles.tsx`
- `components/auth/auth-debug.tsx`

### **Archivos de Páginas (Server-side)**
```bash
# ANTES:
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

# DESPUÉS:
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

# Y también:
# ANTES:
const supabase = createServerComponentClient({ cookies })

# DESPUÉS:
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
```

**Archivos a actualizar:**
- `app/diagnostico-supabase/page.tsx`
- `app/debug-session/page.tsx`
- `app/auth/diagnostico/page.tsx`
- `app/taller/vehiculos/[id]/inspeccion-exacta/page.tsx`
- `app/taller/vehiculos/[id]/inspeccion/page.tsx`
- `app/admin/layout.tsx`
- `app/diagnostico-cliente/page.tsx`
- `app/debug-role/page.tsx`
- `app/diagnostico-taller/page.tsx`
- `app/set-superadmin/page.tsx`

### **Archivos de API Routes**
```bash
# ANTES:
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

# DESPUÉS:
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

# Y también:
# ANTES:
const supabase = createServerComponentClient({ cookies })

# DESPUÉS:
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
```

**Archivos a actualizar:**
- `app/auth/callback/route.ts`
- `app/api/set-superadmin/route.ts`
- `app/api/initialize-cliente/route.ts`
- `app/api/registro-taller/route.ts`
- `app/api/initialize-taller/route.ts`

## 🚀 **Comando Rápido para Actualizar Todo**

Si tienes Node.js instalado, puedes usar el script que creé:

```bash
node fix-supabase-imports.js
```

## 🎯 **Verificación**

Después de actualizar todos los archivos:

1. **Ejecuta el build:**
   ```bash
   npm run build
   ```

2. **Si hay errores, busca archivos restantes:**
   ```bash
   grep -r "@supabase/auth-helpers-nextjs" .
   ```

3. **Actualiza los archivos que aparezcan**

## 📊 **Estado Actual**

- ✅ **3 archivos críticos actualizados**
- ⚠️ **~30 archivos restantes por actualizar**
- 🎯 **Objetivo**: Build exitoso sin errores de importación

## 🔧 **Solución Temporal**

Si necesitas un deployment rápido, puedes:

1. **Comentar temporalmente** los archivos problemáticos
2. **Actualizar solo los críticos** para el funcionamiento básico
3. **Actualizar el resto** en el siguiente commit

**¿Quieres que actualice más archivos específicos o prefieres hacerlo tú mismo?**
