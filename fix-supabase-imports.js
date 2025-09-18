#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Lista de archivos que necesitan actualización
const filesToUpdate = [
  'services/HOJA_INGRESO_SERVICES.service.ts',
  'app/dashboard/page.tsx',
  'app/diagnostico-supabase/page.tsx',
  'app/debug-session/page.tsx',
  'app/auth/callback/route.ts',
  'app/auth/diagnostico/page.tsx',
  'components/vehiculos/hoja-inspeccion-exacta.tsx',
  'app/taller/vehiculos/[id]/inspeccion-exacta/page.tsx',
  'app/taller/vehiculos/[id]/inspeccion/page.tsx',
  'app/admin/layout.tsx',
  'app/diagnostico-cliente/page.tsx',
  'components/vehiculos/hoja-inspeccion.tsx',
  'lib/auth.tsx',
  'app/debug-role/page.tsx',
  'components/inventario/materiales-reparacion.tsx',
  'app/diagnostico-taller/page.tsx',
  'components/inventario/nuevo-material-form.tsx',
  'components/inventario/materiales-pintura.tsx',
  'components/inventario/inventario-page.tsx',
  'app/api/set-superadmin/route.ts',
  'app/api/initialize-cliente/route.ts',
  'components/kanban/kanban-page.tsx',
  'app/api/registro-taller/route.ts',
  'app/api/initialize-taller/route.ts',
  'app/set-superadmin/page.tsx',
  'components/auth/login-form.tsx',
  'components/cliente/cliente-vehiculos.tsx',
  'components/cliente/cliente-historial.tsx',
  'components/cliente/cliente-citas.tsx',
  'components/cliente/cliente-cotizaciones.tsx',
  'components/auth/debug-roles.tsx',
  'components/auth/auth-debug.tsx'
];

// Mapeo de importaciones a actualizar
const importMappings = [
  {
    from: "import { createClientComponentClient } from \"@supabase/auth-helpers-nextjs\"",
    to: "import { createBrowserClient } from \"@supabase/ssr\""
  },
  {
    from: "import { createServerComponentClient } from \"@supabase/auth-helpers-nextjs\"",
    to: "import { createServerClient } from \"@supabase/ssr\""
  },
  {
    from: "import { createMiddlewareClient } from \"@supabase/auth-helpers-nextjs\"",
    to: "import { createServerClient } from \"@supabase/ssr\""
  }
];

// Mapeo de funciones a actualizar
const functionMappings = [
  {
    from: "createClientComponentClient()",
    to: "createBrowserClient(\n    process.env.NEXT_PUBLIC_SUPABASE_URL!,\n    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!\n  )"
  },
  {
    from: "createServerComponentClient({ cookies })",
    to: "createServerClient(\n    process.env.NEXT_PUBLIC_SUPABASE_URL!,\n    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,\n    {\n      cookies: {\n        get(name) {\n          return cookies().get(name)?.value\n        },\n        set(name, value, options) {\n          cookies().set({ name, value, ...options })\n        },\n        remove(name, options) {\n          cookies().set({ name, value: '', ...options })\n        },\n      },\n    }\n  )"
  }
];

function updateFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Archivo no encontrado: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Actualizar importaciones
    importMappings.forEach(mapping => {
      if (content.includes(mapping.from)) {
        content = content.replace(mapping.from, mapping.to);
        modified = true;
        console.log(`✅ Actualizada importación en: ${filePath}`);
      }
    });

    // Actualizar funciones
    functionMappings.forEach(mapping => {
      if (content.includes(mapping.from)) {
        content = content.replace(mapping.from, mapping.to);
        modified = true;
        console.log(`✅ Actualizada función en: ${filePath}`);
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`📝 Archivo actualizado: ${filePath}`);
      return true;
    } else {
      console.log(`⏭️  Sin cambios necesarios: ${filePath}`);
      return false;
    }

  } catch (error) {
    console.error(`❌ Error al procesar ${filePath}:`, error.message);
    return false;
  }
}

// Ejecutar actualizaciones
console.log('🚀 Iniciando actualización de importaciones de Supabase...\n');

let updatedCount = 0;
filesToUpdate.forEach(file => {
  if (updateFile(file)) {
    updatedCount++;
  }
});

console.log(`\n✅ Proceso completado. ${updatedCount} archivos actualizados de ${filesToUpdate.length} archivos procesados.`);
console.log('\n📋 Próximos pasos:');
console.log('1. Revisa los archivos modificados');
console.log('2. Ejecuta: npm run build');
console.log('3. Si hay errores, revisa las importaciones manualmente');
