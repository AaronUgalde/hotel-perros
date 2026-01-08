# 🐕 Hotel Perros - Monorepo

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/AaronUgalde/hotel-perros)

Sistema de gestión para hotel de perros construido como monorepo usando npm workspaces.

## 📁 Estructura del Proyecto

```
hotel-perros/
├── packages/
│   ├── client/          # Aplicación React + Vite + TypeScript
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── server/          # API Express + TypeScript
│       ├── src/
│       ├── prisma/
│       ├── package.json
│       └── tsconfig.json
├── package.json         # Configuración del workspace raíz
├── tsconfig.base.json   # Configuración base de TypeScript
└── tsconfig.json        # Referencias de proyectos TypeScript
```

## 🚀 Requisitos Previos

- Node.js >= 18.x
- npm >= 7.x (para soporte de workspaces)

## 📦 Instalación

Desde la raíz del proyecto, instala todas las dependencias de todos los workspaces:

```bash
npm install
```

Este comando instalará las dependencias de ambos packages (client y server) y las optimizará usando hoisting de npm.

## 🛠️ Scripts Disponibles

### Desarrollo

```bash
# Ejecutar ambos servicios en modo desarrollo (cliente + servidor)
npm run dev

# Ejecutar solo el cliente
npm run dev:client

# Ejecutar solo el servidor
npm run dev:server
```

### Build

```bash
# Construir ambos proyectos
npm run build

# Construir solo el cliente
npm run build:client

# Construir solo el servidor
npm run build:server
```

### Producción

```bash
# Iniciar el servidor en producción (después de hacer build)
npm run start:server
```

### Otros

```bash
# Ejecutar linter en todos los workspaces
npm run lint

# Ejecutar tests en todos los workspaces
npm run test

# Limpiar node_modules y archivos compilados
npm run clean
```

## 🔧 Trabajar con Workspaces Individuales

### Navegar a un workspace específico

```bash
cd packages/client
# o
cd packages/server
```

### Instalar dependencias en un workspace específico

```bash
# Desde la raíz del monorepo
npm install <paquete> --workspace=@hotel-perros/client

# o desde el workspace
cd packages/client
npm install <paquete>
```

### Ejecutar scripts en un workspace específico desde la raíz

```bash
npm run <script> --workspace=@hotel-perros/client
npm run <script> --workspace=@hotel-perros/server
```

## 📝 Características del Monorepo

### ✅ Ventajas de esta Configuración

1. **Dependencias Compartidas**: Las dependencias comunes se instalan una sola vez en el `node_modules` raíz, ahorrando espacio en disco.

2. **Scripts Centralizados**: Ejecuta comandos en todos los workspaces desde la raíz con `--workspaces`.

3. **TypeScript Project References**: Mejora los tiempos de compilación y permite referencias entre packages.

4. **Versionado Unificado**: Todo el código vive en un solo repositorio, facilitando el versionado y las releases.

5. **Desarrollo Simplificado**: Cambios en ambos proyectos se manejan en un solo lugar.

### 🔍 Cómo Funciona

- **npm workspaces** maneja automáticamente los symlinks entre packages en `node_modules`
- Las dependencias se "hoisting" (elevan) al `node_modules` raíz cuando es posible
- Cada workspace mantiene su propia configuración y puede ejecutarse independientemente

## 🏗️ Tecnologías

### Client (@hotel-perros/client)
- React 19
- Vite 7
- TypeScript 5.8
- Tailwind CSS 4
- React Router 7
- Axios

### Server (@hotel-perros/server)
- Express 4
- TypeScript 5.1
- PostgreSQL
- JWT Authentication
- Bcrypt
- Multer (uploads)

## 📚 Referencias

- [npm workspaces documentation](https://docs.npmjs.com/cli/v10/using-npm/workspaces)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)

## 🤝 Contribuir

1. Crea un branch desde `main`
2. Haz tus cambios en el workspace correspondiente
3. Asegúrate que los builds funcionen: `npm run build`
4. Crea un Pull Request

## 📄 Licencia

MIT / ISC
