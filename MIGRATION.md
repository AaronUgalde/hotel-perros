# 📋 Guía de Migración a Monorepo

## ✅ Cambios Realizados

### 1. Estructura de Directorios

**ANTES:**
```
hotel-perros/
├── client/
├── server/
└── package.json (vacío)
```

**DESPUÉS:**
```
hotel-perros/
├── packages/
│   ├── client/     (@hotel-perros/client)
│   ├── server/     (@hotel-perros/server)
├── package.json    (workspace raíz)
├── tsconfig.json   (project references)
└── tsconfig.base.json
```

### 2. Cambios en package.json

#### Raíz (nuevo)
- Configurado como **workspace raíz** con `"private": true`
- Campo `"workspaces": ["packages/*"]` agregado
- Scripts centralizados para ejecutar comandos en todos los packages
- Dependencia `concurrently` para ejecutar dev en paralelo

#### Client
- Nombre cambiado: `"client"` → `"@hotel-perros/client"`
- Script `clean` agregado

#### Server
- Nombre cambiado: `"pet-backend"` → `"@hotel-perros/server"`
- Script `clean` agregado

### 3. TypeScript Project References

Se crearon configuraciones de TypeScript para mejor integración:

- **tsconfig.base.json**: Configuración compartida con `"composite": true`
- **tsconfig.json** (raíz): Referencias a ambos packages
- **packages/server/tsconfig.json**: Ahora extiende la configuración base

Esto permite:
- ✅ Compilación incremental más rápida
- ✅ Mejor caché de TypeScript
- ✅ Referencias entre packages si fuera necesario

### 4. Archivos Nuevos

- `README.md` - Documentación completa del monorepo
- `MIGRATION.md` - Este archivo
- `tsconfig.base.json` - Configuración base de TypeScript
- `tsconfig.json` - Referencias de proyectos
- `.gitignore` (como gitignore) - Ignorar archivos comunes

## 🚀 Próximos Pasos

### 1. Reinstalar Dependencias

⚠️ **IMPORTANTE**: Debes cerrar cualquier terminal/editor que esté usando los archivos y ejecutar:

```bash
# Desde la raíz del proyecto
npm install
```

Esto:
- Instalará las dependencias de ambos packages
- Creará symlinks en el node_modules raíz
- Optimizará las dependencias compartidas (hoisting)
- Generará un nuevo package-lock.json en la raíz

### 2. Verificar la Instalación

```bash
# Debe mostrar ambos workspaces
npm run dev:client
# Ctrl+C para detener

npm run dev:server
# Ctrl+C para detener
```

### 3. Ejecutar Ambos en Paralelo

```bash
# Ejecuta cliente y servidor simultáneamente con colores
npm run dev
```

## 📊 Comparación de Comandos

### ANTES (sin workspace)

```bash
# Instalar cliente
cd client && npm install

# Instalar servidor
cd server && npm install

# Ejecutar cliente
cd client && npm run dev

# Ejecutar servidor
cd server && npm run dev
```

### DESPUÉS (con workspace)

```bash
# Instalar TODO desde la raíz
npm install

# Ejecutar ambos simultáneamente
npm run dev

# O individualmente
npm run dev:client
npm run dev:server
```

## 🎯 Beneficios Obtenidos

### 1. **Gestión Simplificada**
- Un solo `npm install` para todo
- Scripts centralizados
- Un solo `package-lock.json`

### 2. **Optimización de Espacio**
- Dependencias compartidas se instalan una sola vez
- Ejemplo: `typescript`, `@types/node` se comparten entre client y server

### 3. **Desarrollo Mejorado**
- Ejecutar ambos servicios con un comando: `npm run dev`
- TypeScript incremental compila más rápido
- Linting y testing en todos los packages con un comando

### 4. **Escalabilidad**
- Fácil agregar nuevos packages
- Solo crear `packages/nuevo-package/` y agregarlo a workspaces

## 🔧 Agregar un Nuevo Package

Si en el futuro quieres agregar un nuevo package:

```bash
# 1. Crear el directorio
mkdir -p packages/nuevo-package

# 2. Inicializarlo
cd packages/nuevo-package
npm init -y

# 3. Cambiar el nombre en package.json
# "name": "@hotel-perros/nuevo-package"

# 4. Instalar dependencias desde la raíz
npm install
```

El workspace lo detectará automáticamente por el patrón `packages/*`.

## ⚠️ Consideraciones

### Archivos .env
Los archivos `.env` permanecen en cada package:
- `packages/client/.env`
- `packages/server/.env`

Asegúrate de mantenerlos configurados correctamente.

### node_modules
- **Raíz**: Dependencias compartidas y herramientas del monorepo
- **Packages individuales**: Pueden tener node_modules propios si hay conflictos de versiones

### Git
Si usas Git, el `.gitignore` en la raíz ahora cubre todo el monorepo.

## 📞 Troubleshooting

### Error: "Cannot find module"
```bash
# Limpia todo y reinstala
npm run clean
rm -rf node_modules package-lock.json
npm install
```

### Build fallando
```bash
# Verifica que TypeScript compile
npm run build
```

### Puerto en uso
```bash
# Verifica que no haya procesos corriendo
# Client por defecto: http://localhost:5173
# Server: verifica tu .env
```

## 🎉 Conclusión

Tu proyecto ahora es un **monorepo profesional** usando npm workspaces, similar a como trabajan grandes proyectos como:
- React
- Babel
- Jest
- Vue

¡Listo para escalar! 🚀
