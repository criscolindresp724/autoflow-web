# 🔧 Cómo Obtener los Datos de Supabase

## 📋 **Paso a Paso para Obtener las Variables de Entorno**

### **Paso 1: Acceder a tu Proyecto Supabase**

1. Ve a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto `autoflow-web` (o el nombre que le hayas puesto)

### **Paso 2: Obtener las Variables de Entorno**

1. **En el menú lateral izquierdo, haz clic en "Settings" (Configuración)**
2. **Luego haz clic en "API"**

### **Paso 3: Copiar las Variables Necesarias**

En la página de API verás una sección llamada **"Project API keys"** con estas variables:

#### **🔑 Variables que Necesitas:**

```bash
# 1. Project URL (URL del Proyecto)
NEXT_PUBLIC_SUPABASE_URL=https://wcyvgqbtaimkguaslhom.supabase.co

# 2. anon public (Clave Pública Anónima)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 3. service_role (Clave de Rol de Servicio) - ¡IMPORTANTE! Mantener secreta
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Paso 4: Configurar en Vercel**

1. **Ve a [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Selecciona tu proyecto `autoflow-web`**
3. **Ve a "Settings" → "Environment Variables"**
4. **Agrega cada variable:**

   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Copia la URL de tu proyecto
   - **Environment**: Selecciona todas (Production, Preview, Development)

   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Copia la clave anon public
   - **Environment**: Selecciona todas

   - **Name**: `SUPABASE_SERVICE_ROLE_KEY`
   - **Value**: Copia la clave service_role
   - **Environment**: Solo Production (por seguridad)

### **Paso 5: Redesplegar**

1. Después de agregar todas las variables
2. Ve a "Deployments"
3. Haz clic en los tres puntos del último deployment
4. Selecciona "Redeploy"

## 🖼️ **Capturas de Pantalla de Ayuda**

### **En Supabase Dashboard:**
```
Settings → API → Project API keys
```

### **En Vercel Dashboard:**
```
Settings → Environment Variables → Add New
```

## ⚠️ **Importante - Seguridad**

- **NEXT_PUBLIC_SUPABASE_URL**: ✅ Puede ser pública
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: ✅ Puede ser pública  
- **SUPABASE_SERVICE_ROLE_KEY**: ❌ **NUNCA** la compartas públicamente

## 🔍 **Verificar que Funciona**

Después del deployment, visita:
```
https://tu-dominio.vercel.app/api/check-dashboard
```

Deberías ver una respuesta JSON con el estado de la conexión.

## 🆘 **Si No Encuentras tu Proyecto**

Si no ves tu proyecto en Supabase:

1. **Verifica que estés en la cuenta correcta**
2. **Busca en la lista de proyectos**
3. **Si no existe, crea uno nuevo:**
   - Haz clic en "New Project"
   - Nombre: `autoflow-web`
   - Base de datos: PostgreSQL
   - Región: Cercana a tu ubicación

## 📞 **¿Necesitas Ayuda?**

Si tienes problemas:
1. Verifica que las URLs estén correctas (sin espacios extra)
2. Asegúrate de que el proyecto de Supabase esté activo
3. Revisa que las claves estén completas (son muy largas)
