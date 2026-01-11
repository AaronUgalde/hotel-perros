--
-- PostgreSQL database dump
--


-- Dumped from database version 17.7 (e429a59)
-- Dumped by pg_dump version 17.6

-- Started on 2026-01-11 13:50:54


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 275 (class 1259 OID 40961)
-- Name: alergias; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE ROLE neon_superuser LOGIN;
CREATE ROLE neondb_owner LOGIN;
CREATE ROLE cloud_admin LOGIN;


CREATE TABLE public.alergias (
    alergia_id integer NOT NULL,
    nombre character varying(100),
    tipo character varying(50)
);


ALTER TABLE public.alergias OWNER TO neondb_owner;

--
-- TOC entry 274 (class 1259 OID 40960)
-- Name: alergias_alergia_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.alergias_alergia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.alergias_alergia_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3688 (class 0 OID 0)
-- Dependencies: 274
-- Name: alergias_alergia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.alergias_alergia_id_seq OWNED BY public.alergias.alergia_id;


--
-- TOC entry 282 (class 1259 OID 41000)
-- Name: citas_servicios; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.citas_servicios (
    cita_id integer NOT NULL,
    reservacion_id integer,
    servicio_id integer,
    empleado_id integer,
    fecha_hora_inicio timestamp without time zone,
    fecha_hora_fin timestamp without time zone,
    notas text
);


ALTER TABLE public.citas_servicios OWNER TO neondb_owner;

--
-- TOC entry 281 (class 1259 OID 40999)
-- Name: citas_servicios_cita_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.citas_servicios_cita_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.citas_servicios_cita_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3689 (class 0 OID 0)
-- Dependencies: 281
-- Name: citas_servicios_cita_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.citas_servicios_cita_id_seq OWNED BY public.citas_servicios.cita_id;


--
-- TOC entry 217 (class 1259 OID 24576)
-- Name: colonias; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.colonias (
    colonia_id integer NOT NULL,
    municipio_id integer NOT NULL,
    nombre character varying(150) NOT NULL,
    codigo_postal character varying(10)
);


ALTER TABLE public.colonias OWNER TO neondb_owner;

--
-- TOC entry 218 (class 1259 OID 24579)
-- Name: colonias_colonia_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.colonias_colonia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.colonias_colonia_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3690 (class 0 OID 0)
-- Dependencies: 218
-- Name: colonias_colonia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.colonias_colonia_id_seq OWNED BY public.colonias.colonia_id;


--
-- TOC entry 219 (class 1259 OID 24580)
-- Name: colores; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.colores (
    color_id integer NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.colores OWNER TO neondb_owner;

--
-- TOC entry 220 (class 1259 OID 24583)
-- Name: colores_color_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.colores_color_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.colores_color_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3691 (class 0 OID 0)
-- Dependencies: 220
-- Name: colores_color_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.colores_color_id_seq OWNED BY public.colores.color_id;


--
-- TOC entry 278 (class 1259 OID 40981)
-- Name: desparasitaciones; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.desparasitaciones (
    desparasitacion_id integer NOT NULL,
    mascota_id integer,
    tipo character varying(50),
    producto character varying(100),
    fecha date,
    proxima_fecha date
);


ALTER TABLE public.desparasitaciones OWNER TO neondb_owner;

--
-- TOC entry 277 (class 1259 OID 40980)
-- Name: desparasitaciones_desparasitacion_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.desparasitaciones_desparasitacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.desparasitaciones_desparasitacion_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3692 (class 0 OID 0)
-- Dependencies: 277
-- Name: desparasitaciones_desparasitacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.desparasitaciones_desparasitacion_id_seq OWNED BY public.desparasitaciones.desparasitacion_id;


--
-- TOC entry 221 (class 1259 OID 24584)
-- Name: direcciones_propietarios; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.direcciones_propietarios (
    direccion_id integer NOT NULL,
    propietario_id integer NOT NULL,
    tipo_domicilio_id integer NOT NULL,
    calle character varying(200),
    num_exterior character varying(20),
    num_interior character varying(20),
    colonia_id integer,
    estado_id integer,
    municipio_id integer,
    codigo_postal character varying(10),
    fecha_inicio date DEFAULT CURRENT_DATE NOT NULL,
    fecha_fin date,
    es_predeterminada boolean DEFAULT false,
    notas character varying(500)
);


ALTER TABLE public.direcciones_propietarios OWNER TO neondb_owner;

--
-- TOC entry 222 (class 1259 OID 24591)
-- Name: direcciones_propietarios_direccion_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.direcciones_propietarios_direccion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.direcciones_propietarios_direccion_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3693 (class 0 OID 0)
-- Dependencies: 222
-- Name: direcciones_propietarios_direccion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.direcciones_propietarios_direccion_id_seq OWNED BY public.direcciones_propietarios.direccion_id;


--
-- TOC entry 223 (class 1259 OID 24592)
-- Name: documentos_mascotas; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.documentos_mascotas (
    documento_id integer NOT NULL,
    mascota_id integer NOT NULL,
    tipo_documento_id integer,
    nombre_archivo character varying(200),
    ruta_archivo character varying(500),
    fecha_subida timestamp with time zone DEFAULT now()
);


ALTER TABLE public.documentos_mascotas OWNER TO neondb_owner;

--
-- TOC entry 224 (class 1259 OID 24598)
-- Name: documentos_mascotas_documento_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.documentos_mascotas_documento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.documentos_mascotas_documento_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3694 (class 0 OID 0)
-- Dependencies: 224
-- Name: documentos_mascotas_documento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.documentos_mascotas_documento_id_seq OWNED BY public.documentos_mascotas.documento_id;


--
-- TOC entry 280 (class 1259 OID 40993)
-- Name: empleados; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.empleados (
    empleado_id integer NOT NULL,
    nombre character varying(100),
    especialidad character varying(50)
);


ALTER TABLE public.empleados OWNER TO neondb_owner;

--
-- TOC entry 279 (class 1259 OID 40992)
-- Name: empleados_empleado_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.empleados_empleado_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.empleados_empleado_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3695 (class 0 OID 0)
-- Dependencies: 279
-- Name: empleados_empleado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.empleados_empleado_id_seq OWNED BY public.empleados.empleado_id;


--
-- TOC entry 225 (class 1259 OID 24599)
-- Name: enfermedades; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.enfermedades (
    enfermedad_id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(500),
    especie_id integer
);


ALTER TABLE public.enfermedades OWNER TO neondb_owner;

--
-- TOC entry 226 (class 1259 OID 24604)
-- Name: enfermedades_enfermedad_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.enfermedades_enfermedad_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.enfermedades_enfermedad_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3696 (class 0 OID 0)
-- Dependencies: 226
-- Name: enfermedades_enfermedad_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.enfermedades_enfermedad_id_seq OWNED BY public.enfermedades.enfermedad_id;


--
-- TOC entry 227 (class 1259 OID 24605)
-- Name: enfermedades_mascotas; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.enfermedades_mascotas (
    enfermedad_mascota_id integer NOT NULL,
    mascota_id integer NOT NULL,
    enfermedad_id integer NOT NULL,
    fecha_diagnostico date,
    observaciones character varying(500),
    tratamiento character varying(500)
);


ALTER TABLE public.enfermedades_mascotas OWNER TO neondb_owner;

--
-- TOC entry 228 (class 1259 OID 24610)
-- Name: enfermedades_mascotas_enfermedad_mascota_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.enfermedades_mascotas_enfermedad_mascota_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.enfermedades_mascotas_enfermedad_mascota_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3697 (class 0 OID 0)
-- Dependencies: 228
-- Name: enfermedades_mascotas_enfermedad_mascota_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.enfermedades_mascotas_enfermedad_mascota_id_seq OWNED BY public.enfermedades_mascotas.enfermedad_mascota_id;


--
-- TOC entry 229 (class 1259 OID 24611)
-- Name: especies; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.especies (
    especie_id integer NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.especies OWNER TO neondb_owner;

--
-- TOC entry 230 (class 1259 OID 24614)
-- Name: especies_especie_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.especies_especie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.especies_especie_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3698 (class 0 OID 0)
-- Dependencies: 230
-- Name: especies_especie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.especies_especie_id_seq OWNED BY public.especies.especie_id;


--
-- TOC entry 231 (class 1259 OID 24615)
-- Name: estados; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.estados (
    estado_id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.estados OWNER TO neondb_owner;

--
-- TOC entry 232 (class 1259 OID 24618)
-- Name: estados_estado_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.estados_estado_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estados_estado_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3699 (class 0 OID 0)
-- Dependencies: 232
-- Name: estados_estado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.estados_estado_id_seq OWNED BY public.estados.estado_id;


--
-- TOC entry 269 (class 1259 OID 32786)
-- Name: estados_reservacion; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.estados_reservacion (
    estado_id integer NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.estados_reservacion OWNER TO neondb_owner;

--
-- TOC entry 268 (class 1259 OID 32785)
-- Name: estados_reservacion_estado_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.estados_reservacion_estado_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estados_reservacion_estado_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3700 (class 0 OID 0)
-- Dependencies: 268
-- Name: estados_reservacion_estado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.estados_reservacion_estado_id_seq OWNED BY public.estados_reservacion.estado_id;


--
-- TOC entry 233 (class 1259 OID 24619)
-- Name: funcion_mascota; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.funcion_mascota (
    funcion_id integer NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE public.funcion_mascota OWNER TO neondb_owner;

--
-- TOC entry 234 (class 1259 OID 24622)
-- Name: funcion_mascota_funcion_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.funcion_mascota_funcion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.funcion_mascota_funcion_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3701 (class 0 OID 0)
-- Dependencies: 234
-- Name: funcion_mascota_funcion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.funcion_mascota_funcion_id_seq OWNED BY public.funcion_mascota.funcion_id;


--
-- TOC entry 265 (class 1259 OID 32769)
-- Name: habitaciones; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.habitaciones (
    habitacion_id integer NOT NULL,
    nombre_numero character varying(50) NOT NULL,
    descripcion character varying(200),
    capacidad_kg numeric(6,2),
    max_altura numeric(6,2),
    max_largo numeric(6,2),
    precio_noche numeric(10,2) NOT NULL,
    activa boolean DEFAULT true,
    especie_id integer
);


ALTER TABLE public.habitaciones OWNER TO neondb_owner;

--
-- TOC entry 264 (class 1259 OID 32768)
-- Name: habitaciones_habitacion_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.habitaciones_habitacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.habitaciones_habitacion_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3702 (class 0 OID 0)
-- Dependencies: 264
-- Name: habitaciones_habitacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.habitaciones_habitacion_id_seq OWNED BY public.habitaciones.habitacion_id;


--
-- TOC entry 235 (class 1259 OID 24623)
-- Name: mascotas; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.mascotas (
    mascota_id integer NOT NULL,
    propietario_id integer NOT NULL,
    nombre character varying(80) NOT NULL,
    especie_id integer NOT NULL,
    raza_id integer,
    sexo_id integer,
    fecha_nacimiento date,
    peso_kg numeric(6,2),
    altura_cm numeric(6,2),
    largo_cm numeric(6,2),
    patron_pelo_id integer,
    color_principal_id integer,
    color_ojos_id integer,
    numero_chip character varying(80),
    ruac character varying(80),
    esterilizado boolean DEFAULT false,
    senas_particulares character varying(500),
    fecha_alta timestamp with time zone DEFAULT now(),
    origen_id integer,
    funcion_id integer,
    mestizo boolean,
    url_database_chip character varying(100),
    frecuency_chip numeric
);


ALTER TABLE public.mascotas OWNER TO neondb_owner;

--
-- TOC entry 276 (class 1259 OID 40967)
-- Name: mascotas_alergias; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.mascotas_alergias (
    mascota_id integer,
    alergia_id integer,
    severidad character varying(50)
);


ALTER TABLE public.mascotas_alergias OWNER TO neondb_owner;

--
-- TOC entry 236 (class 1259 OID 24630)
-- Name: mascotas_colores; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.mascotas_colores (
    mascota_id integer NOT NULL,
    color_id integer NOT NULL
);


ALTER TABLE public.mascotas_colores OWNER TO neondb_owner;

--
-- TOC entry 237 (class 1259 OID 24633)
-- Name: mascotas_mascota_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.mascotas_mascota_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mascotas_mascota_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3703 (class 0 OID 0)
-- Dependencies: 237
-- Name: mascotas_mascota_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.mascotas_mascota_id_seq OWNED BY public.mascotas.mascota_id;


--
-- TOC entry 238 (class 1259 OID 24634)
-- Name: municipios; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.municipios (
    municipio_id integer NOT NULL,
    estado_id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.municipios OWNER TO neondb_owner;

--
-- TOC entry 239 (class 1259 OID 24637)
-- Name: municipios_municipio_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.municipios_municipio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.municipios_municipio_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3704 (class 0 OID 0)
-- Dependencies: 239
-- Name: municipios_municipio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.municipios_municipio_id_seq OWNED BY public.municipios.municipio_id;


--
-- TOC entry 240 (class 1259 OID 24638)
-- Name: origen_mascota; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.origen_mascota (
    origen_id integer NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE public.origen_mascota OWNER TO neondb_owner;

--
-- TOC entry 241 (class 1259 OID 24641)
-- Name: origen_mascota_origen_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.origen_mascota_origen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.origen_mascota_origen_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3705 (class 0 OID 0)
-- Dependencies: 241
-- Name: origen_mascota_origen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.origen_mascota_origen_id_seq OWNED BY public.origen_mascota.origen_id;


--
-- TOC entry 284 (class 1259 OID 41024)
-- Name: pagos; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.pagos (
    pago_id integer NOT NULL,
    reservacion_id integer,
    monto numeric(10,2),
    metodo_pago character varying(50),
    estado_pago character varying(20),
    fecha_pago timestamp without time zone DEFAULT now()
);


ALTER TABLE public.pagos OWNER TO neondb_owner;

--
-- TOC entry 283 (class 1259 OID 41023)
-- Name: pagos_pago_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.pagos_pago_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pagos_pago_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3706 (class 0 OID 0)
-- Dependencies: 283
-- Name: pagos_pago_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.pagos_pago_id_seq OWNED BY public.pagos.pago_id;


--
-- TOC entry 242 (class 1259 OID 24642)
-- Name: patron_pelo; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.patron_pelo (
    patron_id integer NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.patron_pelo OWNER TO neondb_owner;

--
-- TOC entry 243 (class 1259 OID 24645)
-- Name: patron_pelo_patron_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.patron_pelo_patron_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.patron_pelo_patron_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3707 (class 0 OID 0)
-- Dependencies: 243
-- Name: patron_pelo_patron_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.patron_pelo_patron_id_seq OWNED BY public.patron_pelo.patron_id;


--
-- TOC entry 244 (class 1259 OID 24646)
-- Name: propietarios; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.propietarios (
    propietario_id integer NOT NULL,
    correo_electronico character varying(150) NOT NULL,
    hash_password character varying(300) NOT NULL,
    nombre character varying(80),
    primer_apellido character varying(80),
    segundo_apellido character varying(80),
    rol_id integer DEFAULT 1,
    fecha_alta timestamp with time zone DEFAULT now()
);


ALTER TABLE public.propietarios OWNER TO neondb_owner;

--
-- TOC entry 245 (class 1259 OID 24653)
-- Name: propietarios_propietario_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.propietarios_propietario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.propietarios_propietario_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3708 (class 0 OID 0)
-- Dependencies: 245
-- Name: propietarios_propietario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.propietarios_propietario_id_seq OWNED BY public.propietarios.propietario_id;


--
-- TOC entry 246 (class 1259 OID 24654)
-- Name: razas; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.razas (
    raza_id integer NOT NULL,
    especie_id integer NOT NULL,
    nombre character varying(80) NOT NULL
);


ALTER TABLE public.razas OWNER TO neondb_owner;

--
-- TOC entry 247 (class 1259 OID 24657)
-- Name: razas_raza_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.razas_raza_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.razas_raza_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3709 (class 0 OID 0)
-- Dependencies: 247
-- Name: razas_raza_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.razas_raza_id_seq OWNED BY public.razas.raza_id;


--
-- TOC entry 271 (class 1259 OID 32793)
-- Name: reservaciones; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.reservaciones (
    reservacion_id integer NOT NULL,
    mascota_id integer NOT NULL,
    habitacion_id integer NOT NULL,
    fecha_reservacion timestamp with time zone DEFAULT now(),
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    estado_id integer DEFAULT 1,
    monto_total_hospedaje numeric(10,2),
    notas_especiales character varying(500)
);


ALTER TABLE public.reservaciones OWNER TO neondb_owner;

--
-- TOC entry 270 (class 1259 OID 32792)
-- Name: reservaciones_reservacion_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.reservaciones_reservacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservaciones_reservacion_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3710 (class 0 OID 0)
-- Dependencies: 270
-- Name: reservaciones_reservacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.reservaciones_reservacion_id_seq OWNED BY public.reservaciones.reservacion_id;


--
-- TOC entry 273 (class 1259 OID 32819)
-- Name: reservaciones_servicios; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.reservaciones_servicios (
    reservacion_servicio_id integer NOT NULL,
    reservacion_id integer NOT NULL,
    servicio_id integer NOT NULL,
    cantidad integer DEFAULT 1,
    precio_al_momento numeric(10,2) NOT NULL
);


ALTER TABLE public.reservaciones_servicios OWNER TO neondb_owner;

--
-- TOC entry 272 (class 1259 OID 32818)
-- Name: reservaciones_servicios_reservacion_servicio_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.reservaciones_servicios_reservacion_servicio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservaciones_servicios_reservacion_servicio_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3711 (class 0 OID 0)
-- Dependencies: 272
-- Name: reservaciones_servicios_reservacion_servicio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.reservaciones_servicios_reservacion_servicio_id_seq OWNED BY public.reservaciones_servicios.reservacion_servicio_id;


--
-- TOC entry 248 (class 1259 OID 24658)
-- Name: roles; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.roles (
    rol_id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion character varying(255)
);


ALTER TABLE public.roles OWNER TO neondb_owner;

--
-- TOC entry 249 (class 1259 OID 24661)
-- Name: roles_rol_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.roles_rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_rol_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3712 (class 0 OID 0)
-- Dependencies: 249
-- Name: roles_rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.roles_rol_id_seq OWNED BY public.roles.rol_id;


--
-- TOC entry 267 (class 1259 OID 32777)
-- Name: servicios; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.servicios (
    servicio_id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(500),
    precio_unitario numeric(10,2) NOT NULL
);


ALTER TABLE public.servicios OWNER TO neondb_owner;

--
-- TOC entry 266 (class 1259 OID 32776)
-- Name: servicios_servicio_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.servicios_servicio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.servicios_servicio_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3713 (class 0 OID 0)
-- Dependencies: 266
-- Name: servicios_servicio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.servicios_servicio_id_seq OWNED BY public.servicios.servicio_id;


--
-- TOC entry 250 (class 1259 OID 24662)
-- Name: sexos; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.sexos (
    sexo_id integer NOT NULL,
    codigo character varying(20) NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion character varying(255)
);


ALTER TABLE public.sexos OWNER TO neondb_owner;

--
-- TOC entry 251 (class 1259 OID 24665)
-- Name: sexos_sexo_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.sexos_sexo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sexos_sexo_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3714 (class 0 OID 0)
-- Dependencies: 251
-- Name: sexos_sexo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.sexos_sexo_id_seq OWNED BY public.sexos.sexo_id;


--
-- TOC entry 252 (class 1259 OID 24666)
-- Name: telefonos_propietarios; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.telefonos_propietarios (
    telefono_id integer NOT NULL,
    propietario_id integer NOT NULL,
    numero character varying(25) NOT NULL,
    tipo_telefono_id integer,
    nombre_contacto character varying(120),
    relacion_contacto character varying(80),
    es_principal boolean DEFAULT false,
    notas character varying(255)
);


ALTER TABLE public.telefonos_propietarios OWNER TO neondb_owner;

--
-- TOC entry 253 (class 1259 OID 24670)
-- Name: telefonos_propietarios_telefono_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.telefonos_propietarios_telefono_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.telefonos_propietarios_telefono_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3715 (class 0 OID 0)
-- Dependencies: 253
-- Name: telefonos_propietarios_telefono_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.telefonos_propietarios_telefono_id_seq OWNED BY public.telefonos_propietarios.telefono_id;


--
-- TOC entry 254 (class 1259 OID 24671)
-- Name: tipos_documentos; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.tipos_documentos (
    tipo_documento_id integer NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.tipos_documentos OWNER TO neondb_owner;

--
-- TOC entry 255 (class 1259 OID 24674)
-- Name: tipos_documentos_tipo_documento_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.tipos_documentos_tipo_documento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipos_documentos_tipo_documento_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3716 (class 0 OID 0)
-- Dependencies: 255
-- Name: tipos_documentos_tipo_documento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.tipos_documentos_tipo_documento_id_seq OWNED BY public.tipos_documentos.tipo_documento_id;


--
-- TOC entry 256 (class 1259 OID 24675)
-- Name: tipos_domicilio; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.tipos_domicilio (
    tipo_domicilio_id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion character varying(255)
);


ALTER TABLE public.tipos_domicilio OWNER TO neondb_owner;

--
-- TOC entry 257 (class 1259 OID 24678)
-- Name: tipos_domicilio_tipo_domicilio_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.tipos_domicilio_tipo_domicilio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipos_domicilio_tipo_domicilio_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3717 (class 0 OID 0)
-- Dependencies: 257
-- Name: tipos_domicilio_tipo_domicilio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.tipos_domicilio_tipo_domicilio_id_seq OWNED BY public.tipos_domicilio.tipo_domicilio_id;


--
-- TOC entry 258 (class 1259 OID 24679)
-- Name: tipos_telefono; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.tipos_telefono (
    tipo_telefono_id integer NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.tipos_telefono OWNER TO neondb_owner;

--
-- TOC entry 259 (class 1259 OID 24682)
-- Name: tipos_telefono_tipo_telefono_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.tipos_telefono_tipo_telefono_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipos_telefono_tipo_telefono_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3718 (class 0 OID 0)
-- Dependencies: 259
-- Name: tipos_telefono_tipo_telefono_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.tipos_telefono_tipo_telefono_id_seq OWNED BY public.tipos_telefono.tipo_telefono_id;


--
-- TOC entry 260 (class 1259 OID 24683)
-- Name: vacunas; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.vacunas (
    vacuna_id integer NOT NULL,
    nombre character varying(150) NOT NULL,
    descripcion character varying(500),
    especie_id integer
);


ALTER TABLE public.vacunas OWNER TO neondb_owner;

--
-- TOC entry 261 (class 1259 OID 24688)
-- Name: vacunas_mascotas; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.vacunas_mascotas (
    vacuna_mascota_id integer NOT NULL,
    mascota_id integer NOT NULL,
    vacuna_id integer,
    nombre_vacuna character varying(150),
    fecha_aplicacion date,
    vigencia_hasta date,
    veterinario character varying(150),
    notas character varying(400)
);


ALTER TABLE public.vacunas_mascotas OWNER TO neondb_owner;

--
-- TOC entry 262 (class 1259 OID 24693)
-- Name: vacunas_mascotas_vacuna_mascota_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.vacunas_mascotas_vacuna_mascota_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vacunas_mascotas_vacuna_mascota_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3719 (class 0 OID 0)
-- Dependencies: 262
-- Name: vacunas_mascotas_vacuna_mascota_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.vacunas_mascotas_vacuna_mascota_id_seq OWNED BY public.vacunas_mascotas.vacuna_mascota_id;


--
-- TOC entry 263 (class 1259 OID 24694)
-- Name: vacunas_vacuna_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.vacunas_vacuna_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vacunas_vacuna_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3720 (class 0 OID 0)
-- Dependencies: 263
-- Name: vacunas_vacuna_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.vacunas_vacuna_id_seq OWNED BY public.vacunas.vacuna_id;


--
-- TOC entry 3395 (class 2604 OID 40964)
-- Name: alergias alergia_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.alergias ALTER COLUMN alergia_id SET DEFAULT nextval('public.alergias_alergia_id_seq'::regclass);


--
-- TOC entry 3398 (class 2604 OID 41003)
-- Name: citas_servicios cita_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.citas_servicios ALTER COLUMN cita_id SET DEFAULT nextval('public.citas_servicios_cita_id_seq'::regclass);


--
-- TOC entry 3355 (class 2604 OID 24695)
-- Name: colonias colonia_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.colonias ALTER COLUMN colonia_id SET DEFAULT nextval('public.colonias_colonia_id_seq'::regclass);


--
-- TOC entry 3356 (class 2604 OID 24696)
-- Name: colores color_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.colores ALTER COLUMN color_id SET DEFAULT nextval('public.colores_color_id_seq'::regclass);


--
-- TOC entry 3396 (class 2604 OID 40984)
-- Name: desparasitaciones desparasitacion_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.desparasitaciones ALTER COLUMN desparasitacion_id SET DEFAULT nextval('public.desparasitaciones_desparasitacion_id_seq'::regclass);


--
-- TOC entry 3357 (class 2604 OID 24697)
-- Name: direcciones_propietarios direccion_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.direcciones_propietarios ALTER COLUMN direccion_id SET DEFAULT nextval('public.direcciones_propietarios_direccion_id_seq'::regclass);


--
-- TOC entry 3360 (class 2604 OID 24698)
-- Name: documentos_mascotas documento_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.documentos_mascotas ALTER COLUMN documento_id SET DEFAULT nextval('public.documentos_mascotas_documento_id_seq'::regclass);


--
-- TOC entry 3397 (class 2604 OID 40996)
-- Name: empleados empleado_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.empleados ALTER COLUMN empleado_id SET DEFAULT nextval('public.empleados_empleado_id_seq'::regclass);


--
-- TOC entry 3362 (class 2604 OID 24699)
-- Name: enfermedades enfermedad_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.enfermedades ALTER COLUMN enfermedad_id SET DEFAULT nextval('public.enfermedades_enfermedad_id_seq'::regclass);


--
-- TOC entry 3363 (class 2604 OID 24700)
-- Name: enfermedades_mascotas enfermedad_mascota_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.enfermedades_mascotas ALTER COLUMN enfermedad_mascota_id SET DEFAULT nextval('public.enfermedades_mascotas_enfermedad_mascota_id_seq'::regclass);


--
-- TOC entry 3364 (class 2604 OID 24701)
-- Name: especies especie_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.especies ALTER COLUMN especie_id SET DEFAULT nextval('public.especies_especie_id_seq'::regclass);


--
-- TOC entry 3365 (class 2604 OID 24702)
-- Name: estados estado_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.estados ALTER COLUMN estado_id SET DEFAULT nextval('public.estados_estado_id_seq'::regclass);


--
-- TOC entry 3389 (class 2604 OID 32789)
-- Name: estados_reservacion estado_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.estados_reservacion ALTER COLUMN estado_id SET DEFAULT nextval('public.estados_reservacion_estado_id_seq'::regclass);


--
-- TOC entry 3366 (class 2604 OID 24703)
-- Name: funcion_mascota funcion_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.funcion_mascota ALTER COLUMN funcion_id SET DEFAULT nextval('public.funcion_mascota_funcion_id_seq'::regclass);


--
-- TOC entry 3386 (class 2604 OID 32772)
-- Name: habitaciones habitacion_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.habitaciones ALTER COLUMN habitacion_id SET DEFAULT nextval('public.habitaciones_habitacion_id_seq'::regclass);


--
-- TOC entry 3367 (class 2604 OID 24704)
-- Name: mascotas mascota_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas ALTER COLUMN mascota_id SET DEFAULT nextval('public.mascotas_mascota_id_seq'::regclass);


--
-- TOC entry 3370 (class 2604 OID 24705)
-- Name: municipios municipio_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.municipios ALTER COLUMN municipio_id SET DEFAULT nextval('public.municipios_municipio_id_seq'::regclass);


--
-- TOC entry 3371 (class 2604 OID 24706)
-- Name: origen_mascota origen_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.origen_mascota ALTER COLUMN origen_id SET DEFAULT nextval('public.origen_mascota_origen_id_seq'::regclass);


--
-- TOC entry 3399 (class 2604 OID 41027)
-- Name: pagos pago_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pagos ALTER COLUMN pago_id SET DEFAULT nextval('public.pagos_pago_id_seq'::regclass);


--
-- TOC entry 3372 (class 2604 OID 24707)
-- Name: patron_pelo patron_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.patron_pelo ALTER COLUMN patron_id SET DEFAULT nextval('public.patron_pelo_patron_id_seq'::regclass);


--
-- TOC entry 3373 (class 2604 OID 24708)
-- Name: propietarios propietario_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.propietarios ALTER COLUMN propietario_id SET DEFAULT nextval('public.propietarios_propietario_id_seq'::regclass);


--
-- TOC entry 3376 (class 2604 OID 24709)
-- Name: razas raza_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.razas ALTER COLUMN raza_id SET DEFAULT nextval('public.razas_raza_id_seq'::regclass);


--
-- TOC entry 3390 (class 2604 OID 32796)
-- Name: reservaciones reservacion_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reservaciones ALTER COLUMN reservacion_id SET DEFAULT nextval('public.reservaciones_reservacion_id_seq'::regclass);


--
-- TOC entry 3393 (class 2604 OID 32822)
-- Name: reservaciones_servicios reservacion_servicio_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reservaciones_servicios ALTER COLUMN reservacion_servicio_id SET DEFAULT nextval('public.reservaciones_servicios_reservacion_servicio_id_seq'::regclass);


--
-- TOC entry 3377 (class 2604 OID 24710)
-- Name: roles rol_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.roles ALTER COLUMN rol_id SET DEFAULT nextval('public.roles_rol_id_seq'::regclass);


--
-- TOC entry 3388 (class 2604 OID 32780)
-- Name: servicios servicio_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.servicios ALTER COLUMN servicio_id SET DEFAULT nextval('public.servicios_servicio_id_seq'::regclass);


--
-- TOC entry 3378 (class 2604 OID 24711)
-- Name: sexos sexo_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.sexos ALTER COLUMN sexo_id SET DEFAULT nextval('public.sexos_sexo_id_seq'::regclass);


--
-- TOC entry 3379 (class 2604 OID 24712)
-- Name: telefonos_propietarios telefono_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.telefonos_propietarios ALTER COLUMN telefono_id SET DEFAULT nextval('public.telefonos_propietarios_telefono_id_seq'::regclass);


--
-- TOC entry 3381 (class 2604 OID 24713)
-- Name: tipos_documentos tipo_documento_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tipos_documentos ALTER COLUMN tipo_documento_id SET DEFAULT nextval('public.tipos_documentos_tipo_documento_id_seq'::regclass);


--
-- TOC entry 3382 (class 2604 OID 24714)
-- Name: tipos_domicilio tipo_domicilio_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tipos_domicilio ALTER COLUMN tipo_domicilio_id SET DEFAULT nextval('public.tipos_domicilio_tipo_domicilio_id_seq'::regclass);


--
-- TOC entry 3383 (class 2604 OID 24715)
-- Name: tipos_telefono tipo_telefono_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tipos_telefono ALTER COLUMN tipo_telefono_id SET DEFAULT nextval('public.tipos_telefono_tipo_telefono_id_seq'::regclass);


--
-- TOC entry 3384 (class 2604 OID 24716)
-- Name: vacunas vacuna_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vacunas ALTER COLUMN vacuna_id SET DEFAULT nextval('public.vacunas_vacuna_id_seq'::regclass);


--
-- TOC entry 3385 (class 2604 OID 24717)
-- Name: vacunas_mascotas vacuna_mascota_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vacunas_mascotas ALTER COLUMN vacuna_mascota_id SET DEFAULT nextval('public.vacunas_mascotas_vacuna_mascota_id_seq'::regclass);


--
-- TOC entry 3486 (class 2606 OID 40966)
-- Name: alergias alergias_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.alergias
    ADD CONSTRAINT alergias_pkey PRIMARY KEY (alergia_id);


--
-- TOC entry 3492 (class 2606 OID 41007)
-- Name: citas_servicios citas_servicios_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.citas_servicios
    ADD CONSTRAINT citas_servicios_pkey PRIMARY KEY (cita_id);


--
-- TOC entry 3402 (class 2606 OID 24719)
-- Name: colonias colonias_municipio_id_nombre_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.colonias
    ADD CONSTRAINT colonias_municipio_id_nombre_key UNIQUE (municipio_id, nombre);


--
-- TOC entry 3404 (class 2606 OID 24721)
-- Name: colonias colonias_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.colonias
    ADD CONSTRAINT colonias_pkey PRIMARY KEY (colonia_id);


--
-- TOC entry 3406 (class 2606 OID 24723)
-- Name: colores colores_nombre_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.colores
    ADD CONSTRAINT colores_nombre_key UNIQUE (nombre);


--
-- TOC entry 3408 (class 2606 OID 24725)
-- Name: colores colores_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.colores
    ADD CONSTRAINT colores_pkey PRIMARY KEY (color_id);


--
-- TOC entry 3488 (class 2606 OID 40986)
-- Name: desparasitaciones desparasitaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.desparasitaciones
    ADD CONSTRAINT desparasitaciones_pkey PRIMARY KEY (desparasitacion_id);


--
-- TOC entry 3410 (class 2606 OID 24727)
-- Name: direcciones_propietarios direcciones_propietarios_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.direcciones_propietarios
    ADD CONSTRAINT direcciones_propietarios_pkey PRIMARY KEY (direccion_id);


--
-- TOC entry 3412 (class 2606 OID 24729)
-- Name: documentos_mascotas documentos_mascotas_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.documentos_mascotas
    ADD CONSTRAINT documentos_mascotas_pkey PRIMARY KEY (documento_id);


--
-- TOC entry 3490 (class 2606 OID 40998)
-- Name: empleados empleados_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_pkey PRIMARY KEY (empleado_id);


--
-- TOC entry 3416 (class 2606 OID 24731)
-- Name: enfermedades_mascotas enfermedades_mascotas_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.enfermedades_mascotas
    ADD CONSTRAINT enfermedades_mascotas_pkey PRIMARY KEY (enfermedad_mascota_id);


--
-- TOC entry 3414 (class 2606 OID 24733)
-- Name: enfermedades enfermedades_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.enfermedades
    ADD CONSTRAINT enfermedades_pkey PRIMARY KEY (enfermedad_id);


--
-- TOC entry 3418 (class 2606 OID 24735)
-- Name: especies especies_nombre_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.especies
    ADD CONSTRAINT especies_nombre_key UNIQUE (nombre);


--
-- TOC entry 3420 (class 2606 OID 24737)
-- Name: especies especies_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.especies
    ADD CONSTRAINT especies_pkey PRIMARY KEY (especie_id);


--
-- TOC entry 3422 (class 2606 OID 24739)
-- Name: estados estados_nombre_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.estados
    ADD CONSTRAINT estados_nombre_key UNIQUE (nombre);


--
-- TOC entry 3424 (class 2606 OID 24741)
-- Name: estados estados_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.estados
    ADD CONSTRAINT estados_pkey PRIMARY KEY (estado_id);


--
-- TOC entry 3480 (class 2606 OID 32791)
-- Name: estados_reservacion estados_reservacion_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.estados_reservacion
    ADD CONSTRAINT estados_reservacion_pkey PRIMARY KEY (estado_id);


--
-- TOC entry 3426 (class 2606 OID 24743)
-- Name: funcion_mascota funcion_mascota_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.funcion_mascota
    ADD CONSTRAINT funcion_mascota_pkey PRIMARY KEY (funcion_id);


--
-- TOC entry 3476 (class 2606 OID 32775)
-- Name: habitaciones habitaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.habitaciones
    ADD CONSTRAINT habitaciones_pkey PRIMARY KEY (habitacion_id);


--
-- TOC entry 3430 (class 2606 OID 24745)
-- Name: mascotas_colores mascotas_colores_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas_colores
    ADD CONSTRAINT mascotas_colores_pkey PRIMARY KEY (mascota_id, color_id);


--
-- TOC entry 3428 (class 2606 OID 24747)
-- Name: mascotas mascotas_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas
    ADD CONSTRAINT mascotas_pkey PRIMARY KEY (mascota_id);


--
-- TOC entry 3432 (class 2606 OID 24749)
-- Name: municipios municipios_estado_id_nombre_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.municipios
    ADD CONSTRAINT municipios_estado_id_nombre_key UNIQUE (estado_id, nombre);


--
-- TOC entry 3434 (class 2606 OID 24751)
-- Name: municipios municipios_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.municipios
    ADD CONSTRAINT municipios_pkey PRIMARY KEY (municipio_id);


--
-- TOC entry 3436 (class 2606 OID 24753)
-- Name: origen_mascota origen_mascota_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.origen_mascota
    ADD CONSTRAINT origen_mascota_pkey PRIMARY KEY (origen_id);


--
-- TOC entry 3494 (class 2606 OID 41030)
-- Name: pagos pagos_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_pkey PRIMARY KEY (pago_id);


--
-- TOC entry 3438 (class 2606 OID 24755)
-- Name: patron_pelo patron_pelo_nombre_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.patron_pelo
    ADD CONSTRAINT patron_pelo_nombre_key UNIQUE (nombre);


--
-- TOC entry 3440 (class 2606 OID 24757)
-- Name: patron_pelo patron_pelo_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.patron_pelo
    ADD CONSTRAINT patron_pelo_pkey PRIMARY KEY (patron_id);


--
-- TOC entry 3442 (class 2606 OID 24759)
-- Name: propietarios propietarios_correo_electronico_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.propietarios
    ADD CONSTRAINT propietarios_correo_electronico_key UNIQUE (correo_electronico);


--
-- TOC entry 3444 (class 2606 OID 24761)
-- Name: propietarios propietarios_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.propietarios
    ADD CONSTRAINT propietarios_pkey PRIMARY KEY (propietario_id);


--
-- TOC entry 3446 (class 2606 OID 24763)
-- Name: razas razas_especie_id_nombre_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.razas
    ADD CONSTRAINT razas_especie_id_nombre_key UNIQUE (especie_id, nombre);


--
-- TOC entry 3448 (class 2606 OID 24765)
-- Name: razas razas_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.razas
    ADD CONSTRAINT razas_pkey PRIMARY KEY (raza_id);


--
-- TOC entry 3482 (class 2606 OID 32802)
-- Name: reservaciones reservaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_pkey PRIMARY KEY (reservacion_id);


--
-- TOC entry 3484 (class 2606 OID 32825)
-- Name: reservaciones_servicios reservaciones_servicios_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reservaciones_servicios
    ADD CONSTRAINT reservaciones_servicios_pkey PRIMARY KEY (reservacion_servicio_id);


--
-- TOC entry 3450 (class 2606 OID 24767)
-- Name: roles roles_nombre_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_nombre_key UNIQUE (nombre);


--
-- TOC entry 3452 (class 2606 OID 24769)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (rol_id);


--
-- TOC entry 3478 (class 2606 OID 32784)
-- Name: servicios servicios_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_pkey PRIMARY KEY (servicio_id);


--
-- TOC entry 3454 (class 2606 OID 24771)
-- Name: sexos sexos_codigo_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.sexos
    ADD CONSTRAINT sexos_codigo_key UNIQUE (codigo);


--
-- TOC entry 3456 (class 2606 OID 24773)
-- Name: sexos sexos_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.sexos
    ADD CONSTRAINT sexos_pkey PRIMARY KEY (sexo_id);


--
-- TOC entry 3458 (class 2606 OID 24775)
-- Name: telefonos_propietarios telefonos_propietarios_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.telefonos_propietarios
    ADD CONSTRAINT telefonos_propietarios_pkey PRIMARY KEY (telefono_id);


--
-- TOC entry 3460 (class 2606 OID 24777)
-- Name: tipos_documentos tipos_documentos_nombre_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tipos_documentos
    ADD CONSTRAINT tipos_documentos_nombre_key UNIQUE (nombre);


--
-- TOC entry 3462 (class 2606 OID 24779)
-- Name: tipos_documentos tipos_documentos_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tipos_documentos
    ADD CONSTRAINT tipos_documentos_pkey PRIMARY KEY (tipo_documento_id);


--
-- TOC entry 3464 (class 2606 OID 24781)
-- Name: tipos_domicilio tipos_domicilio_nombre_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tipos_domicilio
    ADD CONSTRAINT tipos_domicilio_nombre_key UNIQUE (nombre);


--
-- TOC entry 3466 (class 2606 OID 24783)
-- Name: tipos_domicilio tipos_domicilio_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tipos_domicilio
    ADD CONSTRAINT tipos_domicilio_pkey PRIMARY KEY (tipo_domicilio_id);


--
-- TOC entry 3468 (class 2606 OID 24785)
-- Name: tipos_telefono tipos_telefono_nombre_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tipos_telefono
    ADD CONSTRAINT tipos_telefono_nombre_key UNIQUE (nombre);


--
-- TOC entry 3470 (class 2606 OID 24787)
-- Name: tipos_telefono tipos_telefono_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tipos_telefono
    ADD CONSTRAINT tipos_telefono_pkey PRIMARY KEY (tipo_telefono_id);


--
-- TOC entry 3474 (class 2606 OID 24789)
-- Name: vacunas_mascotas vacunas_mascotas_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vacunas_mascotas
    ADD CONSTRAINT vacunas_mascotas_pkey PRIMARY KEY (vacuna_mascota_id);


--
-- TOC entry 3472 (class 2606 OID 24791)
-- Name: vacunas vacunas_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vacunas
    ADD CONSTRAINT vacunas_pkey PRIMARY KEY (vacuna_id);


--
-- TOC entry 3534 (class 2606 OID 41018)
-- Name: citas_servicios citas_servicios_empleado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.citas_servicios
    ADD CONSTRAINT citas_servicios_empleado_id_fkey FOREIGN KEY (empleado_id) REFERENCES public.empleados(empleado_id);


--
-- TOC entry 3535 (class 2606 OID 49157)
-- Name: citas_servicios citas_servicios_reservacion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.citas_servicios
    ADD CONSTRAINT citas_servicios_reservacion_id_fkey FOREIGN KEY (reservacion_id) REFERENCES public.reservaciones(reservacion_id) ON DELETE CASCADE;


--
-- TOC entry 3536 (class 2606 OID 41013)
-- Name: citas_servicios citas_servicios_servicio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.citas_servicios
    ADD CONSTRAINT citas_servicios_servicio_id_fkey FOREIGN KEY (servicio_id) REFERENCES public.servicios(servicio_id);


--
-- TOC entry 3495 (class 2606 OID 24792)
-- Name: colonias colonias_municipio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.colonias
    ADD CONSTRAINT colonias_municipio_id_fkey FOREIGN KEY (municipio_id) REFERENCES public.municipios(municipio_id) ON DELETE CASCADE;


--
-- TOC entry 3533 (class 2606 OID 57349)
-- Name: desparasitaciones desparasitaciones_mascota_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.desparasitaciones
    ADD CONSTRAINT desparasitaciones_mascota_id_fkey FOREIGN KEY (mascota_id) REFERENCES public.mascotas(mascota_id) ON DELETE CASCADE;


--
-- TOC entry 3496 (class 2606 OID 24797)
-- Name: direcciones_propietarios direcciones_propietarios_colonia_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.direcciones_propietarios
    ADD CONSTRAINT direcciones_propietarios_colonia_id_fkey FOREIGN KEY (colonia_id) REFERENCES public.colonias(colonia_id);


--
-- TOC entry 3497 (class 2606 OID 24802)
-- Name: direcciones_propietarios direcciones_propietarios_estado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.direcciones_propietarios
    ADD CONSTRAINT direcciones_propietarios_estado_id_fkey FOREIGN KEY (estado_id) REFERENCES public.estados(estado_id);


--
-- TOC entry 3498 (class 2606 OID 24807)
-- Name: direcciones_propietarios direcciones_propietarios_municipio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.direcciones_propietarios
    ADD CONSTRAINT direcciones_propietarios_municipio_id_fkey FOREIGN KEY (municipio_id) REFERENCES public.municipios(municipio_id);


--
-- TOC entry 3499 (class 2606 OID 24812)
-- Name: direcciones_propietarios direcciones_propietarios_propietario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.direcciones_propietarios
    ADD CONSTRAINT direcciones_propietarios_propietario_id_fkey FOREIGN KEY (propietario_id) REFERENCES public.propietarios(propietario_id) ON DELETE CASCADE;


--
-- TOC entry 3500 (class 2606 OID 24817)
-- Name: direcciones_propietarios direcciones_propietarios_tipo_domicilio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.direcciones_propietarios
    ADD CONSTRAINT direcciones_propietarios_tipo_domicilio_id_fkey FOREIGN KEY (tipo_domicilio_id) REFERENCES public.tipos_domicilio(tipo_domicilio_id);


--
-- TOC entry 3501 (class 2606 OID 24822)
-- Name: documentos_mascotas documentos_mascotas_mascota_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.documentos_mascotas
    ADD CONSTRAINT documentos_mascotas_mascota_id_fkey FOREIGN KEY (mascota_id) REFERENCES public.mascotas(mascota_id) ON DELETE CASCADE;


--
-- TOC entry 3502 (class 2606 OID 24827)
-- Name: documentos_mascotas documentos_mascotas_tipo_documento_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.documentos_mascotas
    ADD CONSTRAINT documentos_mascotas_tipo_documento_id_fkey FOREIGN KEY (tipo_documento_id) REFERENCES public.tipos_documentos(tipo_documento_id);


--
-- TOC entry 3503 (class 2606 OID 24832)
-- Name: enfermedades enfermedades_especie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.enfermedades
    ADD CONSTRAINT enfermedades_especie_id_fkey FOREIGN KEY (especie_id) REFERENCES public.especies(especie_id) ON DELETE SET NULL;


--
-- TOC entry 3504 (class 2606 OID 24837)
-- Name: enfermedades_mascotas enfermedades_mascotas_enfermedad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.enfermedades_mascotas
    ADD CONSTRAINT enfermedades_mascotas_enfermedad_id_fkey FOREIGN KEY (enfermedad_id) REFERENCES public.enfermedades(enfermedad_id);


--
-- TOC entry 3505 (class 2606 OID 24842)
-- Name: enfermedades_mascotas enfermedades_mascotas_mascota_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.enfermedades_mascotas
    ADD CONSTRAINT enfermedades_mascotas_mascota_id_fkey FOREIGN KEY (mascota_id) REFERENCES public.mascotas(mascota_id) ON DELETE CASCADE;


--
-- TOC entry 3525 (class 2606 OID 32836)
-- Name: habitaciones habitaciones_especie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.habitaciones
    ADD CONSTRAINT habitaciones_especie_id_fkey FOREIGN KEY (especie_id) REFERENCES public.especies(especie_id);


--
-- TOC entry 3531 (class 2606 OID 40975)
-- Name: mascotas_alergias mascotas_alergias_alergia_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas_alergias
    ADD CONSTRAINT mascotas_alergias_alergia_id_fkey FOREIGN KEY (alergia_id) REFERENCES public.alergias(alergia_id);


--
-- TOC entry 3532 (class 2606 OID 57344)
-- Name: mascotas_alergias mascotas_alergias_mascota_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas_alergias
    ADD CONSTRAINT mascotas_alergias_mascota_id_fkey FOREIGN KEY (mascota_id) REFERENCES public.mascotas(mascota_id) ON DELETE CASCADE;


--
-- TOC entry 3506 (class 2606 OID 24847)
-- Name: mascotas mascotas_color_ojos_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas
    ADD CONSTRAINT mascotas_color_ojos_id_fkey FOREIGN KEY (color_ojos_id) REFERENCES public.colores(color_id);


--
-- TOC entry 3507 (class 2606 OID 24852)
-- Name: mascotas mascotas_color_principal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas
    ADD CONSTRAINT mascotas_color_principal_id_fkey FOREIGN KEY (color_principal_id) REFERENCES public.colores(color_id);


--
-- TOC entry 3515 (class 2606 OID 24857)
-- Name: mascotas_colores mascotas_colores_color_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas_colores
    ADD CONSTRAINT mascotas_colores_color_id_fkey FOREIGN KEY (color_id) REFERENCES public.colores(color_id);


--
-- TOC entry 3516 (class 2606 OID 24862)
-- Name: mascotas_colores mascotas_colores_mascota_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas_colores
    ADD CONSTRAINT mascotas_colores_mascota_id_fkey FOREIGN KEY (mascota_id) REFERENCES public.mascotas(mascota_id) ON DELETE CASCADE;


--
-- TOC entry 3508 (class 2606 OID 24867)
-- Name: mascotas mascotas_especie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas
    ADD CONSTRAINT mascotas_especie_id_fkey FOREIGN KEY (especie_id) REFERENCES public.especies(especie_id);


--
-- TOC entry 3509 (class 2606 OID 24872)
-- Name: mascotas mascotas_funcion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas
    ADD CONSTRAINT mascotas_funcion_id_fkey FOREIGN KEY (funcion_id) REFERENCES public.funcion_mascota(funcion_id) NOT VALID;


--
-- TOC entry 3510 (class 2606 OID 24877)
-- Name: mascotas mascotas_origen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas
    ADD CONSTRAINT mascotas_origen_id_fkey FOREIGN KEY (origen_id) REFERENCES public.origen_mascota(origen_id) NOT VALID;


--
-- TOC entry 3511 (class 2606 OID 24882)
-- Name: mascotas mascotas_patron_pelo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas
    ADD CONSTRAINT mascotas_patron_pelo_id_fkey FOREIGN KEY (patron_pelo_id) REFERENCES public.patron_pelo(patron_id);


--
-- TOC entry 3512 (class 2606 OID 24887)
-- Name: mascotas mascotas_propietario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas
    ADD CONSTRAINT mascotas_propietario_id_fkey FOREIGN KEY (propietario_id) REFERENCES public.propietarios(propietario_id) ON DELETE CASCADE;


--
-- TOC entry 3513 (class 2606 OID 24892)
-- Name: mascotas mascotas_raza_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas
    ADD CONSTRAINT mascotas_raza_id_fkey FOREIGN KEY (raza_id) REFERENCES public.razas(raza_id);


--
-- TOC entry 3514 (class 2606 OID 24897)
-- Name: mascotas mascotas_sexo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.mascotas
    ADD CONSTRAINT mascotas_sexo_id_fkey FOREIGN KEY (sexo_id) REFERENCES public.sexos(sexo_id) ON DELETE SET NULL;


--
-- TOC entry 3517 (class 2606 OID 24902)
-- Name: municipios municipios_estado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.municipios
    ADD CONSTRAINT municipios_estado_id_fkey FOREIGN KEY (estado_id) REFERENCES public.estados(estado_id) ON DELETE CASCADE;


--
-- TOC entry 3537 (class 2606 OID 49152)
-- Name: pagos pagos_reservacion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_reservacion_id_fkey FOREIGN KEY (reservacion_id) REFERENCES public.reservaciones(reservacion_id) ON DELETE CASCADE;


--
-- TOC entry 3518 (class 2606 OID 24907)
-- Name: propietarios propietarios_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.propietarios
    ADD CONSTRAINT propietarios_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(rol_id) ON DELETE SET NULL;


--
-- TOC entry 3519 (class 2606 OID 24912)
-- Name: razas razas_especie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.razas
    ADD CONSTRAINT razas_especie_id_fkey FOREIGN KEY (especie_id) REFERENCES public.especies(especie_id) ON DELETE CASCADE;


--
-- TOC entry 3526 (class 2606 OID 32813)
-- Name: reservaciones reservaciones_estado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_estado_id_fkey FOREIGN KEY (estado_id) REFERENCES public.estados_reservacion(estado_id);


--
-- TOC entry 3527 (class 2606 OID 32808)
-- Name: reservaciones reservaciones_habitacion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_habitacion_id_fkey FOREIGN KEY (habitacion_id) REFERENCES public.habitaciones(habitacion_id);


--
-- TOC entry 3528 (class 2606 OID 32803)
-- Name: reservaciones reservaciones_mascota_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_mascota_id_fkey FOREIGN KEY (mascota_id) REFERENCES public.mascotas(mascota_id) ON DELETE CASCADE;


--
-- TOC entry 3529 (class 2606 OID 32826)
-- Name: reservaciones_servicios reservaciones_servicios_reservacion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reservaciones_servicios
    ADD CONSTRAINT reservaciones_servicios_reservacion_id_fkey FOREIGN KEY (reservacion_id) REFERENCES public.reservaciones(reservacion_id) ON DELETE CASCADE;


--
-- TOC entry 3530 (class 2606 OID 32831)
-- Name: reservaciones_servicios reservaciones_servicios_servicio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reservaciones_servicios
    ADD CONSTRAINT reservaciones_servicios_servicio_id_fkey FOREIGN KEY (servicio_id) REFERENCES public.servicios(servicio_id);


--
-- TOC entry 3520 (class 2606 OID 24917)
-- Name: telefonos_propietarios telefonos_propietarios_propietario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.telefonos_propietarios
    ADD CONSTRAINT telefonos_propietarios_propietario_id_fkey FOREIGN KEY (propietario_id) REFERENCES public.propietarios(propietario_id) ON DELETE CASCADE;


--
-- TOC entry 3521 (class 2606 OID 24922)
-- Name: telefonos_propietarios telefonos_propietarios_tipo_telefono_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.telefonos_propietarios
    ADD CONSTRAINT telefonos_propietarios_tipo_telefono_id_fkey FOREIGN KEY (tipo_telefono_id) REFERENCES public.tipos_telefono(tipo_telefono_id);


--
-- TOC entry 3522 (class 2606 OID 24927)
-- Name: vacunas vacunas_especie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vacunas
    ADD CONSTRAINT vacunas_especie_id_fkey FOREIGN KEY (especie_id) REFERENCES public.especies(especie_id) ON DELETE SET NULL;


--
-- TOC entry 3523 (class 2606 OID 24932)
-- Name: vacunas_mascotas vacunas_mascotas_mascota_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vacunas_mascotas
    ADD CONSTRAINT vacunas_mascotas_mascota_id_fkey FOREIGN KEY (mascota_id) REFERENCES public.mascotas(mascota_id) ON DELETE CASCADE;


--
-- TOC entry 3524 (class 2606 OID 24937)
-- Name: vacunas_mascotas vacunas_mascotas_vacuna_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vacunas_mascotas
    ADD CONSTRAINT vacunas_mascotas_vacuna_id_fkey FOREIGN KEY (vacuna_id) REFERENCES public.vacunas(vacuna_id);


--
-- TOC entry 2213 (class 826 OID 16394)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2212 (class 826 OID 16393)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2026-01-11 13:51:02

--
-- PostgreSQL database dump complete
--


