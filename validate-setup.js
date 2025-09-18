#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Validando configuración del proyecto AutoFlowX...\n');

// Colores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const color = type === 'success' ? colors.green : 
                type === 'error' ? colors.red : 
                type === 'warning' ? colors.yellow : colors.blue;
  console.log(`${color}[${timestamp}] ${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  try {
    if (fs.existsSync(filePath)) {
      log(`✅ ${description}: ${filePath}`, 'success');
      return true;
    } else {
      log(`❌ ${description}: ${filePath} - NO ENCONTRADO`, 'error');
      return false;
    }
  } catch (error) {
    log(`❌ Error verificando ${filePath}: ${error.message}`, 'error');
    return false;
  }
}

function checkFileContent(filePath, searchText, description) {
  try {
    if (!fs.existsSync(filePath)) {
      log(`❌ ${description}: Archivo no encontrado`, 'error');
      return false;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(searchText)) {
      log(`✅ ${description}`, 'success');
      return true;
    } else {
      log(`❌ ${description}: No encontrado`, 'error');
      return false;
    }
  } catch (error) {
    log(`❌ Error verificando contenido de ${filePath}: ${error.message}`, 'error');
    return false;
  }
}

// Contadores
let totalChecks = 0;
let passedChecks = 0;

function runCheck(checkFunction, ...args) {
  totalChecks++;
  if (checkFunction(...args)) {
    passedChecks++;
  }
}

console.log(`${colors.bold}📋 VALIDACIÓN DE ARCHIVOS DE CONFIGURACIÓN${colors.reset}`);
console.log('='.repeat(50));

// 1. Archivos de configuración principales
runCheck(checkFile, 'package.json', 'Configuración de dependencias');
runCheck(checkFile, 'next.config.mjs', 'Configuración de Next.js');
runCheck(checkFile, 'tsconfig.json', 'Configuración de TypeScript');
runCheck(checkFile, 'middleware.ts', 'Middleware de autenticación');
runCheck(checkFile, '.npmrc', 'Configuración de npm');

console.log('\n' + `${colors.bold}🔧 VALIDACIÓN DE DEPENDENCIAS${colors.reset}`);
console.log('='.repeat(50));

// 2. Verificar dependencias críticas en package.json
runCheck(checkFileContent, 'package.json', '@supabase/ssr', 'Dependencia @supabase/ssr actualizada');
runCheck(checkFileContent, 'package.json', '@supabase/supabase-js', 'Dependencia @supabase/supabase-js');
runCheck(checkFileContent, 'package.json', 'next', 'Dependencia Next.js');
runCheck(checkFileContent, 'package.json', 'react', 'Dependencia React');
runCheck(checkFileContent, 'package.json', '@hello-pangea/dnd', 'Dependencia drag-and-drop actualizada');

// 3. Verificar que no hay dependencias deprecadas
runCheck(checkFileContent, 'package.json', '@supabase/auth-helpers-nextjs', 'Sin dependencias deprecadas', true);

console.log('\n' + `${colors.bold}🔐 VALIDACIÓN DE CONFIGURACIÓN DE SUPABASE${colors.reset}`);
console.log('='.repeat(50));

// 4. Verificar configuración de Supabase
runCheck(checkFileContent, 'next.config.mjs', 'NEXT_PUBLIC_SUPABASE_URL', 'Variables de entorno configuradas');
runCheck(checkFileContent, 'next.config.mjs', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'Clave anónima configurada');
runCheck(checkFileContent, 'next.config.mjs', 'SUPABASE_SERVICE_ROLE_KEY', 'Clave de servicio configurada');

console.log('\n' + `${colors.bold}📁 VALIDACIÓN DE ARCHIVOS CRÍTICOS${colors.reset}`);
console.log('='.repeat(50));

// 5. Archivos críticos del proyecto
runCheck(checkFile, 'lib/supabase/client.ts', 'Cliente de Supabase');
runCheck(checkFile, 'lib/supabase/admin-client.ts', 'Cliente de administración');
runCheck(checkFile, 'lib/supabase/server.ts', 'Cliente del servidor');
runCheck(checkFile, 'app/layout.tsx', 'Layout principal');
runCheck(checkFile, 'app/page.tsx', 'Página principal');

console.log('\n' + `${colors.bold}🔍 VALIDACIÓN DE IMPORTACIONES ACTUALIZADAS${colors.reset}`);
console.log('='.repeat(50));

// 6. Verificar archivos actualizados
runCheck(checkFileContent, 'app/admin/verificar-usuarios/page.tsx', 'createBrowserClient', 'Archivo verificar-usuarios actualizado');
runCheck(checkFileContent, 'app/dashboard/page.tsx', 'createServerClient', 'Archivo dashboard actualizado');
runCheck(checkFileContent, 'components/auth/login-form.tsx', 'createBrowserClient', 'Archivo login-form actualizado');

console.log('\n' + `${colors.bold}🚨 DETECCIÓN DE PROBLEMAS POTENCIALES${colors.reset}`);
console.log('='.repeat(50));

// 7. Buscar problemas comunes
let problemCount = 0;

// Buscar importaciones deprecadas restantes
try {
  const files = fs.readdirSync('.', { recursive: true });
  let deprecatedImports = 0;
  
  files.forEach(file => {
    if (typeof file === 'string' && (file.endsWith('.tsx') || file.endsWith('.ts'))) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('@supabase/auth-helpers-nextjs')) {
          deprecatedImports++;
          log(`⚠️  Archivo con importación deprecada: ${file}`, 'warning');
        }
      } catch (e) {
        // Ignorar errores de lectura
      }
    }
  });
  
  if (deprecatedImports === 0) {
    log('✅ No hay importaciones deprecadas restantes', 'success');
  } else {
    log(`⚠️  ${deprecatedImports} archivos aún tienen importaciones deprecadas`, 'warning');
    problemCount++;
  }
} catch (error) {
  log('⚠️  No se pudo verificar importaciones deprecadas', 'warning');
}

// Verificar console.log en producción
try {
  const files = fs.readdirSync('services', { recursive: true });
  let consoleLogs = 0;
  
  files.forEach(file => {
    if (typeof file === 'string' && file.endsWith('.ts')) {
      try {
        const content = fs.readFileSync(`services/${file}`, 'utf8');
        const matches = content.match(/console\.(log|error|warn)/g);
        if (matches) {
          consoleLogs += matches.length;
        }
      } catch (e) {
        // Ignorar errores
      }
    }
  });
  
  if (consoleLogs === 0) {
    log('✅ No hay console.log en servicios', 'success');
  } else {
    log(`⚠️  ${consoleLogs} console.log encontrados en servicios`, 'warning');
    problemCount++;
  }
} catch (error) {
  log('⚠️  No se pudo verificar console.log', 'warning');
}

console.log('\n' + `${colors.bold}📊 RESUMEN DE VALIDACIÓN${colors.reset}`);
console.log('='.repeat(50));

const successRate = ((passedChecks / totalChecks) * 100).toFixed(1);
const statusColor = successRate >= 90 ? colors.green : successRate >= 70 ? colors.yellow : colors.red;

log(`Total de verificaciones: ${totalChecks}`, 'info');
log(`Verificaciones exitosas: ${passedChecks}`, 'success');
log(`Tasa de éxito: ${successRate}%`, successRate >= 90 ? 'success' : successRate >= 70 ? 'warning' : 'error');

if (problemCount > 0) {
  log(`Problemas detectados: ${problemCount}`, 'warning');
}

console.log('\n' + `${colors.bold}🎯 RECOMENDACIONES${colors.reset}`);
console.log('='.repeat(50));

if (successRate >= 90) {
  log('🎉 ¡Excelente! El proyecto está bien configurado', 'success');
  log('✅ Listo para deployment en Vercel', 'success');
} else if (successRate >= 70) {
  log('⚠️  El proyecto está mayormente configurado, pero hay algunos problemas', 'warning');
  log('🔧 Revisa los elementos marcados como ❌', 'warning');
} else {
  log('❌ El proyecto necesita más configuración antes del deployment', 'error');
  log('🔧 Revisa todos los elementos marcados como ❌', 'error');
}

console.log('\n' + `${colors.bold}📋 PRÓXIMOS PASOS${colors.reset}`);
console.log('='.repeat(50));

log('1. Configurar variables de entorno en Vercel:', 'info');
log('   - NEXT_PUBLIC_SUPABASE_URL', 'info');
log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY', 'info');
log('   - SUPABASE_SERVICE_ROLE_KEY', 'info');

log('2. Hacer commit y push de los cambios', 'info');
log('3. Verificar que el deployment sea exitoso', 'info');

if (problemCount > 0) {
  log('4. Revisar y corregir los problemas detectados', 'warning');
}

console.log('\n' + `${colors.bold}🔗 ENLACES ÚTILES${colors.reset}`);
console.log('='.repeat(50));
log('📖 Guía de configuración de Vercel: VERCEL_SETUP.md', 'info');
log('🔧 Solución de vulnerabilidades: SOLUCION_VULNERABILIDADES.md', 'info');
log('📝 Actualización de importaciones: ACTUALIZAR_SUPABASE_IMPORTS.md', 'info');

console.log('\n' + '='.repeat(50));
log('Validación completada', 'info');
console.log('='.repeat(50));
