# Configuración de Vercel para AutoFlowX

## Variables de Entorno Requeridas

Para que la aplicación funcione correctamente en Vercel, necesitas configurar las siguientes variables de entorno:

### 1. Variables de Supabase (Obligatorias)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
```

### 2. Variables Opcionales

```bash
NEXTAUTH_SECRET=tu_secret_key_aqui
NEXTAUTH_URL=https://tu-dominio.vercel.app
```

## Cómo Configurar en Vercel

### Paso 1: Acceder a la Configuración del Proyecto
1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `autoflow-web`
3. Ve a la pestaña "Settings"

### Paso 2: Agregar Variables de Entorno
1. En el menú lateral, haz clic en "Environment Variables"
2. Agrega cada variable de entorno una por una:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Tu URL de Supabase
   - **Environment**: Production, Preview, Development (selecciona todos)

3. Repite para las otras variables:
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Paso 3: Obtener las Claves de Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a "Settings" → "API"
4. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

### Paso 4: Redesplegar
1. Después de agregar todas las variables, ve a la pestaña "Deployments"
2. Haz clic en los tres puntos del último deployment
3. Selecciona "Redeploy"

## Verificación

Una vez configurado, puedes verificar que todo funciona visitando:
- `https://tu-dominio.vercel.app/api/check-dashboard`

Deberías ver una respuesta JSON con el estado de la conexión a Supabase.

## Solución de Problemas

### Error: "NEXT_PUBLIC_SUPABASE_URL no está definido"
- Verifica que la variable esté configurada en Vercel
- Asegúrate de que el deployment sea después de agregar las variables

### Error: "SUPABASE_SERVICE_ROLE_KEY no está definido"
- Verifica que la variable esté configurada en Vercel
- Asegúrate de usar la clave `service_role`, no la `anon`

### Error de Conexión a Supabase
- Verifica que las URLs y claves sean correctas
- Asegúrate de que tu proyecto de Supabase esté activo
