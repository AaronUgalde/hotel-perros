# Hotel para Mascotas

Este proyecto contiene dos aplicaciones:

- **Client:** Aplicación frontend basada en React, TypeScript y Vite.
- **Server:** API REST desarrollada con Express y TypeScript.

## Requisitos

- Node.js (versión >= 14)
- PostgreSQL

## Descargar el Proyecto

Clona el repositorio:

```sh
git clone https://tu-repositorio-url.git
cd hotel-perros
```

## Instalación

Instala las dependencias de el cliente y el servidor en tu proyecto

```sh
# Para el servidor
cd server
npm install

# Para el cliente
cd ../client
npm install
```

## Configuración

Crea los archivos de entorno en cada aplicación copiando los archivos de ejemplo (.env.example si lo tienes) o creando archivos .env en los 
directorios server y client. Asegúrate de configurar al menos:

En server/env
```env
PORT=Puerto_del_servidor
FRONTEND_URL=http://localhost:PUERTO_FRONT
DATABASE_URL=USUARIO://postgres:PASSWORD@localhost:PUERTO_BASE/Nombre_Base_Datos
JWT_SECRET=un_secreto_largo
JWT_EXPIRES_IN=7d
UPLOAD_DIR=uploads
```

En client/env
```env
VITE_API_URL=http://localhost:PUERTO_SERVER/api
```
## Base de datos

Ejecuta el script SQL en tu base de datos PostgreSQL para crear las tablas necesarias

```sql
CREATE TYPE role_t AS ENUM ('user','admin');

CREATE TABLE owners (
    owner_id         SERIAL PRIMARY KEY,
    email            TEXT NOT NULL UNIQUE,
    password_hash    TEXT NOT NULL,
    nombre           TEXT,
    apellido_paterno TEXT,
    apellido_materno TEXT,
    tipo_domicilio   TEXT,
    calle            TEXT,
    colonia          TEXT,
    ciudad           TEXT,
    estado           TEXT,
    codigo_postal    TEXT,
    numero_exterior  TEXT,
    numero_interior  TEXT,
	role role_t DEFAULT 'user'
);

CREATE TABLE owner_phones (
    phone_id   SERIAL PRIMARY KEY,
    owner_id   INT NOT NULL REFERENCES owners(owner_id) ON DELETE CASCADE,
    numero     BIGINT NOT NULL,
    es_principal BOOLEAN DEFAULT FALSE
);

CREATE TABLE pets (
    pet_id             SERIAL PRIMARY KEY,
    owner_id           INT NOT NULL REFERENCES owners(owner_id) ON DELETE CASCADE,
    nombre             TEXT NOT NULL,
    especie            TEXT NOT NULL,
    raza               TEXT,
    tamano             TEXT,
    peso_kg            NUMERIC(5,2),
    fecha_nacimiento   DATE,
    sexo               TEXT,
    tipo_pelo          TEXT,
    numero_chip        TEXT,
    tipo_chip          TEXT,
    notas_adicionales  TEXT
);

CREATE TABLE pet_documents (
    doc_id       SERIAL PRIMARY KEY,
    pet_id       INT NOT NULL REFERENCES pets(pet_id) ON DELETE CASCADE,
    tipo_doc     TEXT,
    nombre_archivo TEXT,
    ruta_archivo TEXT
);

CREATE TABLE pet_vaccinations (
    vac_id        SERIAL PRIMARY KEY,
    pet_id        INT NOT NULL REFERENCES pets(pet_id) ON DELETE CASCADE,
    nombre_vacuna TEXT NOT NULL,
    fecha_aplicacion DATE,
    vigencia      DATE,
    veterinario   TEXT
);
```

## Probar la aplicacion

Desde el directorio server:

```sh
npm run dev
```

Desde el directorio client:

```sh
npm run dev
```

y abrir la ubicacion que indica el client