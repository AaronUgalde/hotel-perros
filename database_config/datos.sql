--
-- PostgreSQL database dump
--


-- Dumped from database version 17.7 (e429a59)
-- Dumped by pg_dump version 17.6

-- Started on 2026-01-11 13:58:57

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

--
-- TOC entry 3695 (class 0 OID 40961)
-- Dependencies: 275
-- Data for Name: alergias; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.alergias VALUES (1, 'Pollo', 'Alimentaria');
INSERT INTO public.alergias VALUES (2, 'Carne de Res', 'Alimentaria');
INSERT INTO public.alergias VALUES (3, 'Lácteos', 'Alimentaria');
INSERT INTO public.alergias VALUES (4, 'Cereales/Gluten', 'Alimentaria');
INSERT INTO public.alergias VALUES (5, 'Polen', 'Ambiental');
INSERT INTO public.alergias VALUES (6, 'Ácaros del polvo', 'Ambiental');
INSERT INTO public.alergias VALUES (7, 'Pasto/Césped', 'Ambiental');
INSERT INTO public.alergias VALUES (8, 'Picadura de Pulga (DAPP)', 'Insectos');
INSERT INTO public.alergias VALUES (9, 'Penicilina', 'Medicamentosa');
INSERT INTO public.alergias VALUES (10, 'Amiodarona', 'Medicamentosa');
INSERT INTO public.alergias VALUES (11, 'Látex/Plástico', 'Contacto');


--
-- TOC entry 3639 (class 0 OID 24580)
-- Dependencies: 219
-- Data for Name: colores; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.colores VALUES (1, 'Amarillo');
INSERT INTO public.colores VALUES (2, 'Azul');
INSERT INTO public.colores VALUES (3, 'Blanco');
INSERT INTO public.colores VALUES (4, 'Café');
INSERT INTO public.colores VALUES (5, 'Caniche (poodle)');
INSERT INTO public.colores VALUES (6, 'Carbonado');
INSERT INTO public.colores VALUES (7, 'Chocolate');
INSERT INTO public.colores VALUES (8, 'Dorado');
INSERT INTO public.colores VALUES (9, 'Golondrino');
INSERT INTO public.colores VALUES (10, 'Negro');
INSERT INTO public.colores VALUES (11, 'Otro color');
INSERT INTO public.colores VALUES (12, 'Paja');
INSERT INTO public.colores VALUES (13, 'Plata');
INSERT INTO public.colores VALUES (14, 'Rojo');
INSERT INTO public.colores VALUES (15, 'Sal y Pimienta');
INSERT INTO public.colores VALUES (16, 'Sepia');
INSERT INTO public.colores VALUES (17, 'Tabby');
INSERT INTO public.colores VALUES (18, 'Verde');


--
-- TOC entry 3700 (class 0 OID 40993)
-- Dependencies: 280
-- Data for Name: empleados; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.empleados VALUES (3, 'Dr. Carlos Méndez', 'Veterinario chingon');
INSERT INTO public.empleados VALUES (4, 'María Torres', 'Veterinaria');
INSERT INTO public.empleados VALUES (5, 'Luis Fernández', 'Entrenador');
INSERT INTO public.empleados VALUES (6, 'Sofía Ramírez', 'Cuidadora');
INSERT INTO public.empleados VALUES (2, 'Dr. Carlos Méndez', 'Veterinario');


--
-- TOC entry 3649 (class 0 OID 24611)
-- Dependencies: 229
-- Data for Name: especies; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.especies VALUES (1, 'Perro');
INSERT INTO public.especies VALUES (2, 'Gato');


--
-- TOC entry 3689 (class 0 OID 32786)
-- Dependencies: 269
-- Data for Name: estados_reservacion; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.estados_reservacion VALUES (1, 'Pendiente');
INSERT INTO public.estados_reservacion VALUES (2, 'Confirmada');
INSERT INTO public.estados_reservacion VALUES (3, 'En Estancia');
INSERT INTO public.estados_reservacion VALUES (4, 'Finalizada');
INSERT INTO public.estados_reservacion VALUES (5, 'Cancelada');
INSERT INTO public.estados_reservacion VALUES (6, 'No Presentado');


--
-- TOC entry 3653 (class 0 OID 24619)
-- Dependencies: 233
-- Data for Name: funcion_mascota; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.funcion_mascota VALUES (1, 'Animal de Compañía');
INSERT INTO public.funcion_mascota VALUES (2, 'Apoyo');
INSERT INTO public.funcion_mascota VALUES (3, 'Asistencia');
INSERT INTO public.funcion_mascota VALUES (4, 'Condición de calle');


--
-- TOC entry 3685 (class 0 OID 32769)
-- Dependencies: 265
-- Data for Name: habitaciones; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.habitaciones VALUES (2, 'H-101', 'Habitación pequeña para razas pequeñas', 15.00, 0.50, 0.80, 350.00, true, 1);
INSERT INTO public.habitaciones VALUES (15, 'A1', 'Habitación chica para perros pequeños', 15.00, 45.00, 80.00, 350.00, true, 1);
INSERT INTO public.habitaciones VALUES (16, 'B2', 'Habitación mediana con patio', 30.00, 60.00, 120.00, 550.00, true, 1);
INSERT INTO public.habitaciones VALUES (17, 'VIP-1', 'Habitación premium climatizada', 45.00, 80.00, 150.00, 850.00, true, 2);


--
-- TOC entry 3660 (class 0 OID 24638)
-- Dependencies: 240
-- Data for Name: origen_mascota; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.origen_mascota VALUES (1, 'Adopción');
INSERT INTO public.origen_mascota VALUES (2, 'Compra');
INSERT INTO public.origen_mascota VALUES (3, 'Lo rescaté de la calle');
INSERT INTO public.origen_mascota VALUES (4, 'Nació en casa');


--
-- TOC entry 3662 (class 0 OID 24642)
-- Dependencies: 242
-- Data for Name: patron_pelo; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.patron_pelo VALUES (1, 'Alambre');
INSERT INTO public.patron_pelo VALUES (2, 'Corto');
INSERT INTO public.patron_pelo VALUES (3, 'Doble capa');
INSERT INTO public.patron_pelo VALUES (4, 'Duro');
INSERT INTO public.patron_pelo VALUES (5, 'Lanoso');
INSERT INTO public.patron_pelo VALUES (6, 'Largo');
INSERT INTO public.patron_pelo VALUES (7, 'Pelaje nuevo');
INSERT INTO public.patron_pelo VALUES (8, 'Sin pelo');


--
-- TOC entry 3668 (class 0 OID 24658)
-- Dependencies: 248
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.roles VALUES (1, 'Admin', 'Usuario con permisos administrativos');
INSERT INTO public.roles VALUES (2, 'Cliente', 'Usuario final / Propietario de mascota');


--
-- TOC entry 3664 (class 0 OID 24646)
-- Dependencies: 244
-- Data for Name: propietarios; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.propietarios VALUES (1, 'test@example.com', '$2b$10$2cNuIMkFEzLlS8yryq9HOuMJj.j/nIeqVE5/ifmZEirmjOF.031T.', 'Aaron', 'Ugalde', NULL, 1, '2025-10-05 01:11:36.206988+00');
INSERT INTO public.propietarios VALUES (3, 'ana@gmail.com', '$2b$10$N729nHjXPoXMg4cWMLAXIukWt0JpCH56tTrOI4HE1XP9pS/2Nt0ZG', 'ana', 'tellez', 'rodriguez', 1, '2026-01-05 09:40:23.87596+00');
INSERT INTO public.propietarios VALUES (4, 'nato@gmail.com', '$2b$10$sqxSvI7MoINWJEhePU43bu6nUFCbKWSJxHcweL9TXwQFIhW0jogFq', 'nato', 'ugalde', 'ruiz', 1, '2026-01-05 15:25:17.551184+00');
INSERT INTO public.propietarios VALUES (5, 'ugalde.tellez.aaron@gmail.com', '$2b$10$5C8b8nrio9SFmVRuiEM/AuFkXWvB6Dx56JIIEvWAcu8nzB9w.Ba6e', 'Aarón', 'Ugalde', 'Téllez', 1, '2026-01-07 18:00:52.221144+00');
INSERT INTO public.propietarios VALUES (2, 'aaronugaldet@gmail.com', '$2b$10$6UDfcTOtqndwMcWyK8ML6.OBKWaWYjwnd777oHQrQmyRhaKuxgRVG', 'juanote alberto', 'Ugalde', 'Téllez', 2, '2025-10-12 18:37:33.801416+00');


--
-- TOC entry 3666 (class 0 OID 24654)
-- Dependencies: 246
-- Data for Name: razas; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.razas VALUES (24, 1, 'Affenpinscher');
INSERT INTO public.razas VALUES (25, 1, 'Airedale terrier');
INSERT INTO public.razas VALUES (26, 1, 'Akita');
INSERT INTO public.razas VALUES (27, 1, 'Akita americano');
INSERT INTO public.razas VALUES (28, 1, 'Alaskan Husky');
INSERT INTO public.razas VALUES (29, 1, 'Alaskan malamute');
INSERT INTO public.razas VALUES (30, 1, 'American Foxhound');
INSERT INTO public.razas VALUES (31, 1, 'American pit bull terrier');
INSERT INTO public.razas VALUES (32, 1, 'American staffordshire terrier');
INSERT INTO public.razas VALUES (33, 1, 'Ariegeois');
INSERT INTO public.razas VALUES (34, 1, 'Artois');
INSERT INTO public.razas VALUES (35, 1, 'Australian silky terrier');
INSERT INTO public.razas VALUES (36, 1, 'Australian Terrier');
INSERT INTO public.razas VALUES (37, 1, 'Austrian Black & Tan Hound');
INSERT INTO public.razas VALUES (38, 1, 'Azawakh');
INSERT INTO public.razas VALUES (39, 1, 'Balkan Hound');
INSERT INTO public.razas VALUES (40, 1, 'Basenji');
INSERT INTO public.razas VALUES (41, 1, 'Basset Alpino (Alpine Dachsbracke)');
INSERT INTO public.razas VALUES (42, 1, 'Basset Artesiano Normando');
INSERT INTO public.razas VALUES (43, 1, 'Basset Azul de Gascuña (Basset Bleu de Gascogne)');
INSERT INTO public.razas VALUES (44, 1, 'Basset de Artois');
INSERT INTO public.razas VALUES (45, 1, 'Basset de Westphalie');
INSERT INTO public.razas VALUES (46, 1, 'Basset Hound');
INSERT INTO public.razas VALUES (47, 1, 'Basset Leonado de Bretaña (Basset fauve de Bretagne)');
INSERT INTO public.razas VALUES (48, 1, 'Bavarian Mountain Scenthound');
INSERT INTO public.razas VALUES (49, 1, 'Beagle');
INSERT INTO public.razas VALUES (50, 1, 'Beagle Harrier');
INSERT INTO public.razas VALUES (51, 1, 'Beauceron');
INSERT INTO public.razas VALUES (52, 1, 'Bedlington Terrier');
INSERT INTO public.razas VALUES (53, 1, 'Bichon Boloñes');
INSERT INTO public.razas VALUES (54, 1, 'Bichón Frisé');
INSERT INTO public.razas VALUES (55, 1, 'Bichón Habanero');
INSERT INTO public.razas VALUES (56, 1, 'Billy');
INSERT INTO public.razas VALUES (57, 1, 'Black and Tan Coonhound');
INSERT INTO public.razas VALUES (58, 1, 'Bloodhound (Sabueso de San Huberto)');
INSERT INTO public.razas VALUES (59, 1, 'Bobtail');
INSERT INTO public.razas VALUES (60, 1, 'Boerboel');
INSERT INTO public.razas VALUES (61, 1, 'Border Collie');
INSERT INTO public.razas VALUES (62, 1, 'Border terrier');
INSERT INTO public.razas VALUES (63, 1, 'Borzoi');
INSERT INTO public.razas VALUES (64, 1, 'Bosnian Hound');
INSERT INTO public.razas VALUES (65, 1, 'Boston terrier');
INSERT INTO public.razas VALUES (66, 1, 'Bouvier des Flandres');
INSERT INTO public.razas VALUES (67, 1, 'Boxer');
INSERT INTO public.razas VALUES (68, 1, 'Boyero de Appenzell');
INSERT INTO public.razas VALUES (69, 1, 'Boyero de Australia');
INSERT INTO public.razas VALUES (70, 1, 'Boyero de Entlebuch');
INSERT INTO public.razas VALUES (71, 1, 'Boyero de las Ardenas');
INSERT INTO public.razas VALUES (72, 1, 'Boyero de Montaña Bernes');
INSERT INTO public.razas VALUES (73, 1, 'Braco Alemán de pelo corto');
INSERT INTO public.razas VALUES (74, 1, 'Braco Alemán de pelo duro');
INSERT INTO public.razas VALUES (75, 1, 'Braco de Ariege');
INSERT INTO public.razas VALUES (76, 1, 'Braco de Auvernia');
INSERT INTO public.razas VALUES (77, 1, 'Braco de Bourbonnais');
INSERT INTO public.razas VALUES (78, 1, 'Braco de Saint Germain');
INSERT INTO public.razas VALUES (79, 1, 'Braco Dupuy');
INSERT INTO public.razas VALUES (80, 1, 'Braco Francés');
INSERT INTO public.razas VALUES (81, 1, 'Braco Italiano');
INSERT INTO public.razas VALUES (82, 1, 'Broholmer');
INSERT INTO public.razas VALUES (83, 1, 'Buhund Noruego');
INSERT INTO public.razas VALUES (84, 1, 'Bull terrier');
INSERT INTO public.razas VALUES (85, 1, 'Bulldog americano');
INSERT INTO public.razas VALUES (86, 1, 'Bulldog inglés');
INSERT INTO public.razas VALUES (87, 1, 'Bulldog francés');
INSERT INTO public.razas VALUES (88, 1, 'Bullmastiff');
INSERT INTO public.razas VALUES (89, 1, 'Ca de Bestiar');
INSERT INTO public.razas VALUES (90, 1, 'Cairn terrier');
INSERT INTO public.razas VALUES (91, 1, 'Cane Corso');
INSERT INTO public.razas VALUES (92, 1, 'Cane da Pastore Maremmano-Abruzzese');
INSERT INTO public.razas VALUES (93, 1, 'Caniche (Poodle)');
INSERT INTO public.razas VALUES (94, 1, 'Caniche Toy (Toy Poodle)');
INSERT INTO public.razas VALUES (95, 1, 'Cao da Serra de Aires');
INSERT INTO public.razas VALUES (96, 1, 'Cao da Serra de Estrela');
INSERT INTO public.razas VALUES (97, 1, 'Cao de Castro Laboreiro');
INSERT INTO public.razas VALUES (98, 1, 'Cao de Fila de Sao Miguel');
INSERT INTO public.razas VALUES (99, 1, 'Cavalier King Charles Spaniel');
INSERT INTO public.razas VALUES (100, 1, 'Cesky Fousek');
INSERT INTO public.razas VALUES (101, 1, 'Cesky Terrier');
INSERT INTO public.razas VALUES (102, 1, 'Chesapeake Bay Retriever');
INSERT INTO public.razas VALUES (103, 1, 'Chihuahua');
INSERT INTO public.razas VALUES (104, 1, 'Chin');
INSERT INTO public.razas VALUES (105, 1, 'Chow Chow');
INSERT INTO public.razas VALUES (106, 1, 'Cirneco del Etna');
INSERT INTO public.razas VALUES (107, 1, 'Clumber Spaniel');
INSERT INTO public.razas VALUES (108, 1, 'Cocker Spaniel Americano');
INSERT INTO public.razas VALUES (109, 1, 'Cocker Spaniel Inglés');
INSERT INTO public.razas VALUES (110, 1, 'Collie Barbudo');
INSERT INTO public.razas VALUES (111, 1, 'Collie de Pelo Cort');
INSERT INTO public.razas VALUES (112, 1, 'Collie de Pelo Largo');
INSERT INTO public.razas VALUES (113, 1, 'Cotón de Tuléar');
INSERT INTO public.razas VALUES (114, 1, 'Curly Coated Retriever');
INSERT INTO public.razas VALUES (115, 1, 'Dálmata');
INSERT INTO public.razas VALUES (116, 1, 'Dandie dinmont terrier');
INSERT INTO public.razas VALUES (117, 1, 'Deerhound');
INSERT INTO public.razas VALUES (118, 1, 'Dobermann');
INSERT INTO public.razas VALUES (119, 1, 'Dogo Argentino');
INSERT INTO public.razas VALUES (120, 1, 'Dogo de Burdeos');
INSERT INTO public.razas VALUES (121, 1, 'Dogo del Tibet');
INSERT INTO public.razas VALUES (122, 1, 'Drentse Partridge Dog');
INSERT INTO public.razas VALUES (123, 1, 'Drever');
INSERT INTO public.razas VALUES (124, 1, 'Dunker');
INSERT INTO public.razas VALUES (125, 1, 'Elkhound Noruego');
INSERT INTO public.razas VALUES (126, 1, 'Elkhound Sueco');
INSERT INTO public.razas VALUES (127, 1, 'English Foxhound');
INSERT INTO public.razas VALUES (128, 1, 'English Springer Spaniel');
INSERT INTO public.razas VALUES (129, 1, 'English Toy Terrier');
INSERT INTO public.razas VALUES (130, 1, 'Epagneul Picard');
INSERT INTO public.razas VALUES (131, 1, 'Eurasier');
INSERT INTO public.razas VALUES (132, 1, 'Fila Brasileiro');
INSERT INTO public.razas VALUES (133, 1, 'Finnish Lapphound');
INSERT INTO public.razas VALUES (134, 1, 'Flat Coated Retriever');
INSERT INTO public.razas VALUES (135, 1, 'Fox terrier de pelo de alambre');
INSERT INTO public.razas VALUES (136, 1, 'Fox terrier de pelo liso');
INSERT INTO public.razas VALUES (137, 1, 'Foxhound Inglés');
INSERT INTO public.razas VALUES (138, 1, 'Frisian Pointer');
INSERT INTO public.razas VALUES (139, 1, 'Galgo Español');
INSERT INTO public.razas VALUES (140, 1, 'Galgo húngaro (Magyar Agar)');
INSERT INTO public.razas VALUES (141, 1, 'Galgo Italiano');
INSERT INTO public.razas VALUES (142, 1, 'Galgo Polaco (Chart Polski)');
INSERT INTO public.razas VALUES (143, 1, 'Glen of Imaal Terrier');
INSERT INTO public.razas VALUES (144, 1, 'Golden Retriever');
INSERT INTO public.razas VALUES (145, 1, 'Gordon Setter');
INSERT INTO public.razas VALUES (146, 1, 'Gos d''Atura Catalá');
INSERT INTO public.razas VALUES (147, 1, 'Gran Basset Griffon Vendeano');
INSERT INTO public.razas VALUES (148, 1, 'Gran Boyero Suizo');
INSERT INTO public.razas VALUES (149, 1, 'Gran Danés (Dogo Aleman)');
INSERT INTO public.razas VALUES (150, 1, 'Gran Gascón Saintongeois');
INSERT INTO public.razas VALUES (151, 1, 'Gran Griffon Vendeano');
INSERT INTO public.razas VALUES (152, 1, 'Gran Munsterlander');
INSERT INTO public.razas VALUES (153, 1, 'Gran Perro Japonés');
INSERT INTO public.razas VALUES (154, 1, 'Grand Anglo Francais Tricoleur');
INSERT INTO public.razas VALUES (155, 1, 'Grand Bleu de Gascogne');
INSERT INTO public.razas VALUES (156, 1, 'Greyhound');
INSERT INTO public.razas VALUES (157, 1, 'Griffon Bleu de Gascogne');
INSERT INTO public.razas VALUES (158, 1, 'Griffon de pelo duro (Grifón Korthals)');
INSERT INTO public.razas VALUES (159, 1, 'Griffon leonado de Bretaña');
INSERT INTO public.razas VALUES (160, 1, 'Griffon Nivernais');
INSERT INTO public.razas VALUES (161, 1, 'Grifon Belga');
INSERT INTO public.razas VALUES (162, 1, 'Grifón de Bruselas');
INSERT INTO public.razas VALUES (163, 1, 'Haldenstoever');
INSERT INTO public.razas VALUES (164, 1, 'Harrier');
INSERT INTO public.razas VALUES (165, 1, 'Hokkaido');
INSERT INTO public.razas VALUES (166, 1, 'Hovawart');
INSERT INTO public.razas VALUES (167, 1, 'Husky Siberiano (Siberian Husky)');
INSERT INTO public.razas VALUES (168, 1, 'Ioujnorousskaia Ovtcharka');
INSERT INTO public.razas VALUES (169, 1, 'Irish Glen of Imaal terrier');
INSERT INTO public.razas VALUES (170, 1, 'Irish soft coated wheaten terrier');
INSERT INTO public.razas VALUES (171, 1, 'Irish terrier');
INSERT INTO public.razas VALUES (172, 1, 'Irish Water Spaniel');
INSERT INTO public.razas VALUES (173, 1, 'Irish Wolfhound');
INSERT INTO public.razas VALUES (174, 1, 'Jack Russell terrier');
INSERT INTO public.razas VALUES (175, 1, 'Jindo Coreano');
INSERT INTO public.razas VALUES (176, 1, 'Kai');
INSERT INTO public.razas VALUES (177, 1, 'Keeshond');
INSERT INTO public.razas VALUES (178, 1, 'Kelpie australiano (Australian kelpie)');
INSERT INTO public.razas VALUES (179, 1, 'Kerry blue terrier');
INSERT INTO public.razas VALUES (180, 1, 'King Charles Spaniel');
INSERT INTO public.razas VALUES (181, 1, 'Kishu');
INSERT INTO public.razas VALUES (182, 1, 'Komondor');
INSERT INTO public.razas VALUES (183, 1, 'Kooiker');
INSERT INTO public.razas VALUES (184, 1, 'Kromfohrländer');
INSERT INTO public.razas VALUES (185, 1, 'Kuvasz');
INSERT INTO public.razas VALUES (186, 1, 'Labrador Retriever');
INSERT INTO public.razas VALUES (187, 1, 'Lagotto Romagnolo');
INSERT INTO public.razas VALUES (188, 1, 'Laika de Siberia Occidental');
INSERT INTO public.razas VALUES (189, 1, 'Laika de Siberia Oriental');
INSERT INTO public.razas VALUES (190, 1, 'Laika Ruso Europeo');
INSERT INTO public.razas VALUES (191, 1, 'Lakeland terrier');
INSERT INTO public.razas VALUES (192, 1, 'Landseer');
INSERT INTO public.razas VALUES (193, 1, 'Lapphund Sueco');
INSERT INTO public.razas VALUES (194, 1, 'Lebrel Afgano');
INSERT INTO public.razas VALUES (195, 1, 'Lebrel Arabe (Sloughi)');
INSERT INTO public.razas VALUES (196, 1, 'Leonberger');
INSERT INTO public.razas VALUES (197, 1, 'Lhasa Apso');
INSERT INTO public.razas VALUES (198, 1, 'Lowchen (Pequeño Perro León)');
INSERT INTO public.razas VALUES (199, 1, 'Lundehund Noruego');
INSERT INTO public.razas VALUES (200, 1, 'Malamute de Alaska');
INSERT INTO public.razas VALUES (201, 1, 'Maltés');
INSERT INTO public.razas VALUES (202, 1, 'Manchester terrier');
INSERT INTO public.razas VALUES (203, 1, 'Mastiff');
INSERT INTO public.razas VALUES (204, 1, 'Mastín de los Pirineos');
INSERT INTO public.razas VALUES (205, 1, 'Mastín Español');
INSERT INTO public.razas VALUES (206, 1, 'Mastín Napolitano');
INSERT INTO public.razas VALUES (207, 1, 'Mudi');
INSERT INTO public.razas VALUES (208, 1, 'Norfolk terrier');
INSERT INTO public.razas VALUES (209, 1, 'Norwich terrier');
INSERT INTO public.razas VALUES (210, 1, 'Nova Scotia duck tolling retriever');
INSERT INTO public.razas VALUES (211, 1, 'Ovejero alemán');
INSERT INTO public.razas VALUES (212, 1, 'Otterhound');
INSERT INTO public.razas VALUES (213, 1, 'Rafeiro do Alentejo');
INSERT INTO public.razas VALUES (214, 1, 'Ratonero Bodeguero Andaluz');
INSERT INTO public.razas VALUES (215, 1, 'Retriever de Nueva Escocia');
INSERT INTO public.razas VALUES (216, 1, 'Rhodesian Ridgeback');
INSERT INTO public.razas VALUES (217, 1, 'Ridgeback de Tailandia');
INSERT INTO public.razas VALUES (218, 1, 'Rottweiler');
INSERT INTO public.razas VALUES (219, 1, 'Saarloos');
INSERT INTO public.razas VALUES (220, 1, 'Sabueso de Hamilton');
INSERT INTO public.razas VALUES (221, 1, 'Sabueso de Hannover');
INSERT INTO public.razas VALUES (222, 1, 'Sabueso de Hygen');
INSERT INTO public.razas VALUES (223, 1, 'Sabueso de Istria');
INSERT INTO public.razas VALUES (224, 1, 'Sabueso de Posavaz');
INSERT INTO public.razas VALUES (225, 1, 'Sabueso de Schiller (Schillerstovare)');
INSERT INTO public.razas VALUES (226, 1, 'Sabueso de Smaland (Smalandsstovare)');
INSERT INTO public.razas VALUES (227, 1, 'Sabueso de Transilvania');
INSERT INTO public.razas VALUES (228, 1, 'Sabueso del Tirol');
INSERT INTO public.razas VALUES (229, 1, 'Sabueso Español');
INSERT INTO public.razas VALUES (230, 1, 'Sabueso Estirio de pelo duro');
INSERT INTO public.razas VALUES (231, 1, 'Sabueso Finlandés');
INSERT INTO public.razas VALUES (232, 1, 'Sabueso Francés blanco y negro');
INSERT INTO public.razas VALUES (233, 1, 'Sabueso Francés tricolor');
INSERT INTO public.razas VALUES (234, 1, 'Sabueso Griego');
INSERT INTO public.razas VALUES (235, 1, 'Sabueso Polaco (Ogar Polski)');
INSERT INTO public.razas VALUES (236, 1, 'Sabueso Serbio');
INSERT INTO public.razas VALUES (237, 1, 'Sabueso Suizo');
INSERT INTO public.razas VALUES (238, 1, 'Sabueso Yugoslavo de Montaña');
INSERT INTO public.razas VALUES (239, 1, 'Sabueso Yugoslavo tricolor');
INSERT INTO public.razas VALUES (240, 1, 'Saluki');
INSERT INTO public.razas VALUES (241, 1, 'Samoyedo');
INSERT INTO public.razas VALUES (242, 1, 'San Bernardo');
INSERT INTO public.razas VALUES (243, 1, 'Sarplaninac');
INSERT INTO public.razas VALUES (244, 1, 'Schapendoes');
INSERT INTO public.razas VALUES (245, 1, 'Schipperke');
INSERT INTO public.razas VALUES (246, 1, 'Schnauzer estándar');
INSERT INTO public.razas VALUES (247, 1, 'Schnauzer gigante (Riesenschnauzer)');
INSERT INTO public.razas VALUES (248, 1, 'Schnauzer miniatura (Zwergschnauzer)');
INSERT INTO public.razas VALUES (249, 1, 'Scottish terrier');
INSERT INTO public.razas VALUES (250, 1, 'Sealyham terrier');
INSERT INTO public.razas VALUES (251, 1, 'Segugio Italiano');
INSERT INTO public.razas VALUES (252, 1, 'Seppala Siberiano');
INSERT INTO public.razas VALUES (253, 1, 'Setter Inglés');
INSERT INTO public.razas VALUES (254, 1, 'Setter Irlandés');
INSERT INTO public.razas VALUES (255, 1, 'Setter Irlandés rojo y blanco');
INSERT INTO public.razas VALUES (256, 1, 'Shar Pei');
INSERT INTO public.razas VALUES (257, 1, 'Shiba Inu');
INSERT INTO public.razas VALUES (258, 1, 'Shih Tzu');
INSERT INTO public.razas VALUES (259, 1, 'Shikoku');
INSERT INTO public.razas VALUES (260, 1, 'Skye terrier');
INSERT INTO public.razas VALUES (261, 1, 'Slovensky Cuvac');
INSERT INTO public.razas VALUES (262, 1, 'Slovensky Kopov');
INSERT INTO public.razas VALUES (263, 1, 'Smoushond Holandés');
INSERT INTO public.razas VALUES (264, 1, 'Spaniel Alemán (German Wachtelhund)');
INSERT INTO public.razas VALUES (265, 1, 'Spaniel Azul de Picardía');
INSERT INTO public.razas VALUES (266, 1, 'Spaniel Bretón');
INSERT INTO public.razas VALUES (267, 1, 'Spaniel de Campo');
INSERT INTO public.razas VALUES (268, 1, 'Spaniel de Pont Audemer');
INSERT INTO public.razas VALUES (269, 1, 'Spaniel Francés');
INSERT INTO public.razas VALUES (270, 1, 'Spaniel Tibetano');
INSERT INTO public.razas VALUES (271, 1, 'Spinone Italiano');
INSERT INTO public.razas VALUES (272, 1, 'Spítz Alemán');
INSERT INTO public.razas VALUES (273, 1, 'Spitz de Norbotten (Norbottenspets)');
INSERT INTO public.razas VALUES (274, 1, 'Spitz Finlandés');
INSERT INTO public.razas VALUES (275, 1, 'Spitz Japonés');
INSERT INTO public.razas VALUES (276, 1, 'Staffordshire bull terrier');
INSERT INTO public.razas VALUES (277, 1, 'Staffordshire terrier americano');
INSERT INTO public.razas VALUES (278, 1, 'Sussex Spaniel');
INSERT INTO public.razas VALUES (279, 1, 'Teckel (Dachshund)');
INSERT INTO public.razas VALUES (280, 1, 'Tchuvatch eslovaco');
INSERT INTO public.razas VALUES (281, 1, 'Terranova (Newfoundland)');
INSERT INTO public.razas VALUES (282, 1, 'Terrier australiano (Australian terrier)');
INSERT INTO public.razas VALUES (283, 1, 'Terrier brasilero');
INSERT INTO public.razas VALUES (284, 1, 'Terrier cazador alemán');
INSERT INTO public.razas VALUES (285, 1, 'Terrier checo (Ceský teriér)');
INSERT INTO public.razas VALUES (286, 1, 'Terrier galés');
INSERT INTO public.razas VALUES (287, 1, 'Terrier irlandés (Irish terrier)');
INSERT INTO public.razas VALUES (288, 1, 'Terrier japonés (Nihon teria)');
INSERT INTO public.razas VALUES (289, 1, 'Terrier negro ruso');
INSERT INTO public.razas VALUES (290, 1, 'Terrier tibetano');
INSERT INTO public.razas VALUES (291, 1, 'Tosa');
INSERT INTO public.razas VALUES (292, 1, 'Viejo Pastor Inglés');
INSERT INTO public.razas VALUES (293, 1, 'Viejo Pointer Danés (Old Danish Pointer)');
INSERT INTO public.razas VALUES (294, 1, 'Vizsla');
INSERT INTO public.razas VALUES (295, 1, 'Volpino Italiano');
INSERT INTO public.razas VALUES (296, 1, 'Weimaraner');
INSERT INTO public.razas VALUES (297, 1, 'Welsh springer spaniel');
INSERT INTO public.razas VALUES (298, 1, 'Welsh Corgi Cardigan');
INSERT INTO public.razas VALUES (299, 1, 'Welsh Corgi Pembroke');
INSERT INTO public.razas VALUES (300, 1, 'Welsh terrier');
INSERT INTO public.razas VALUES (301, 1, 'West highland white terrier');
INSERT INTO public.razas VALUES (302, 1, 'Whippet');
INSERT INTO public.razas VALUES (303, 1, 'Wirehaired solvakian pointer');
INSERT INTO public.razas VALUES (304, 1, 'Xoloitzcuintle');
INSERT INTO public.razas VALUES (305, 1, 'Yorkshire Terrier');
INSERT INTO public.razas VALUES (362, 2, 'Abyssinian');
INSERT INTO public.razas VALUES (363, 2, 'Aegean');
INSERT INTO public.razas VALUES (364, 2, 'American Bobtail');
INSERT INTO public.razas VALUES (365, 2, 'American Wirehair');
INSERT INTO public.razas VALUES (366, 2, 'Aphrodite Giant');
INSERT INTO public.razas VALUES (367, 2, 'Arabian Mau');
INSERT INTO public.razas VALUES (368, 2, 'Asian');
INSERT INTO public.razas VALUES (369, 2, 'Australian Mist');
INSERT INTO public.razas VALUES (370, 2, 'Bambino');
INSERT INTO public.razas VALUES (371, 2, 'Bengal Cats');
INSERT INTO public.razas VALUES (372, 2, 'Birman');
INSERT INTO public.razas VALUES (373, 2, 'Bombay');
INSERT INTO public.razas VALUES (374, 2, 'Brazilian Shorthair');
INSERT INTO public.razas VALUES (375, 2, 'British Longhair');
INSERT INTO public.razas VALUES (376, 2, 'British Shorthair');
INSERT INTO public.razas VALUES (377, 2, 'Burmese');
INSERT INTO public.razas VALUES (378, 2, 'Burmilla');
INSERT INTO public.razas VALUES (379, 2, 'California Spangled');
INSERT INTO public.razas VALUES (380, 2, 'Chantilly-Tiffany');
INSERT INTO public.razas VALUES (381, 2, 'Chausie');
INSERT INTO public.razas VALUES (382, 2, 'Colorpoint Shorthair');
INSERT INTO public.razas VALUES (383, 2, 'Cornish Rex');
INSERT INTO public.razas VALUES (384, 2, 'Cyprus');
INSERT INTO public.razas VALUES (385, 2, 'Devon Rex');
INSERT INTO public.razas VALUES (386, 2, 'Donskoy');
INSERT INTO public.razas VALUES (387, 2, 'European Shorthair');
INSERT INTO public.razas VALUES (388, 2, 'Foldex');
INSERT INTO public.razas VALUES (389, 2, 'German Rex');
INSERT INTO public.razas VALUES (390, 2, 'Highlander');
INSERT INTO public.razas VALUES (391, 2, 'Japanese Bobtail');
INSERT INTO public.razas VALUES (392, 2, 'Javanese');
INSERT INTO public.razas VALUES (393, 2, 'Khao Manee');
INSERT INTO public.razas VALUES (394, 2, 'Kurilian Bobtail');
INSERT INTO public.razas VALUES (395, 2, 'Lykoi');
INSERT INTO public.razas VALUES (396, 2, 'Maine Coon');
INSERT INTO public.razas VALUES (397, 2, 'Manx');
INSERT INTO public.razas VALUES (398, 2, 'Mekong Bobtail');
INSERT INTO public.razas VALUES (399, 2, 'Nebelung');
INSERT INTO public.razas VALUES (400, 2, 'Oriental Bicolor');
INSERT INTO public.razas VALUES (401, 2, 'Persian');
INSERT INTO public.razas VALUES (402, 2, 'Peterbald');
INSERT INTO public.razas VALUES (403, 2, 'Pixie-Bob');
INSERT INTO public.razas VALUES (404, 2, 'Ragdoll Cats');
INSERT INTO public.razas VALUES (405, 2, 'Russian Blue');
INSERT INTO public.razas VALUES (406, 2, 'Savannah');
INSERT INTO public.razas VALUES (407, 2, 'Scottish Fold');
INSERT INTO public.razas VALUES (408, 2, 'Serengeti');
INSERT INTO public.razas VALUES (409, 2, 'Siamese Cat');
INSERT INTO public.razas VALUES (410, 2, 'Siberian');
INSERT INTO public.razas VALUES (411, 2, 'Singapura');
INSERT INTO public.razas VALUES (412, 2, 'Snowshoe');
INSERT INTO public.razas VALUES (413, 2, 'Sokoke');
INSERT INTO public.razas VALUES (414, 2, 'Somali');
INSERT INTO public.razas VALUES (415, 2, 'Sphynx');
INSERT INTO public.razas VALUES (416, 2, 'American Shorthair');
INSERT INTO public.razas VALUES (417, 2, 'Tonkinese');
INSERT INTO public.razas VALUES (418, 2, 'Toyger');
INSERT INTO public.razas VALUES (419, 2, 'Turkish Angora');
INSERT INTO public.razas VALUES (420, 2, 'Turkish Van');
INSERT INTO public.razas VALUES (421, 2, 'Ukrainian Levkoy');
INSERT INTO public.razas VALUES (422, 2, 'York Chocolate');


--
-- TOC entry 3670 (class 0 OID 24662)
-- Dependencies: 250
-- Data for Name: sexos; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.sexos VALUES (1, 'M', 'Macho', 'Sexo macho');
INSERT INTO public.sexos VALUES (2, 'F', 'Hembra', 'Sexo hembra');
INSERT INTO public.sexos VALUES (3, 'U', 'Desconocido', 'Sexo no especificado / desconocido');


--
-- TOC entry 3655 (class 0 OID 24623)
-- Dependencies: 235
-- Data for Name: mascotas; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.mascotas VALUES (4, 2, 'Candy', 2, 376, 2, '2022-03-02', 7.00, 40.00, 50.00, 2, 17, 18, NULL, NULL, true, 'Esta muy gordita y muy suave', '2025-10-13 03:21:22.902595+00', 4, 1, true, NULL, NULL);
INSERT INTO public.mascotas VALUES (5, 2, 'Juanita', 2, 376, 2, '2022-03-02', 6.00, 40.00, 50.00, 2, 17, 18, NULL, NULL, true, 'Esta muy gordita y muy suave', '2025-10-13 03:21:22.902+00', 4, 1, true, NULL, NULL);
INSERT INTO public.mascotas VALUES (9, 5, 'Candy', 2, 364, 2, '2026-01-01', 6.00, 40.00, 80.00, 3, 15, 15, '333', '333', NULL, 'Es un gatito gordito', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.mascotas VALUES (10, 1, 'Max', 1, NULL, 1, '2020-05-10', 22.50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, true, NULL, '2026-01-08 04:07:21.217382+00', 1, 1, NULL, NULL, NULL);
INSERT INTO public.mascotas VALUES (11, 1, 'Luna', 1, NULL, 2, '2021-08-01', 18.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false, NULL, '2026-01-08 04:07:21.217382+00', 2, 1, NULL, NULL, NULL);
INSERT INTO public.mascotas VALUES (13, 5, 'Twinky', 2, 375, 2, '2021-03-16', 4.00, 40.00, 60.00, 6, 4, 18, '34', '23123', true, 'Tienen sus patitas manchadas, tiene vitiligo', NULL, NULL, NULL, true, NULL, NULL);
INSERT INTO public.mascotas VALUES (14, 5, 'Nahui', 1, 93, 2, '2023-03-14', 5.00, 20.00, 50.00, 5, 3, 2, '34234234', 'PHCXB132812', NULL, 'Es muy pequeña y se enoja', NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3691 (class 0 OID 32793)
-- Dependencies: 271
-- Data for Name: reservaciones; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.reservaciones VALUES (33, 9, 17, '2026-01-08 23:30:11.405253+00', '2026-01-08', '2026-01-09', 1, 850.00, 'Mi mascota necesita besitos al dormir');
INSERT INTO public.reservaciones VALUES (34, 9, 17, '2026-01-10 21:48:23.386998+00', '2026-01-10', '2026-01-11', 1, 850.00, NULL);


--
-- TOC entry 3687 (class 0 OID 32777)
-- Dependencies: 267
-- Data for Name: servicios; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.servicios VALUES (2, 'Paseo básico', 'Paseo de 30 minutos para ejercicio y recreación.', 120.00);
INSERT INTO public.servicios VALUES (3, 'Paseo extendido', 'Paseo de 60 minutos con mayor actividad física.', 200.00);
INSERT INTO public.servicios VALUES (4, 'Baño básico', 'Baño con shampoo estándar, secado y cepillado.', 180.00);
INSERT INTO public.servicios VALUES (5, 'Baño medicado', 'Baño con shampoo especial indicado para problemas dermatológicos.', 250.00);
INSERT INTO public.servicios VALUES (6, 'Corte de uñas', 'Corte y limado de uñas.', 80.00);
INSERT INTO public.servicios VALUES (7, 'Alimentación proporcionada', 'Alimento balanceado incluido durante la estancia.', 100.00);
INSERT INTO public.servicios VALUES (8, 'Administración de medicamentos', 'Suministro de medicamentos según indicaciones del dueño.', 90.00);
INSERT INTO public.servicios VALUES (9, 'Entrenamiento básico', 'Sesión de entrenamiento básico de obediencia.', 300.00);
INSERT INTO public.servicios VALUES (10, 'Cámara en tiempo real', 'Acceso a cámara para monitorear al perro durante su estancia.', 150.00);
INSERT INTO public.servicios VALUES (1, 'Guardería por horas', 'Vigilamiento continuo a tu mascota por un periodo maximo de 9 horas', 550.00);


--
-- TOC entry 3702 (class 0 OID 41000)
-- Dependencies: 282
-- Data for Name: citas_servicios; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.citas_servicios VALUES (4, 33, 5, 3, '2026-01-09 06:53:00', '2026-01-09 08:53:00', 'Es una cita');
INSERT INTO public.citas_servicios VALUES (5, 33, 10, 5, '2026-01-09 06:58:00', '2026-01-10 04:01:00', 'cita');
INSERT INTO public.citas_servicios VALUES (6, 34, 5, 2, '2026-01-10 21:52:00', '2026-01-10 21:54:00', 'Cita');


--
-- TOC entry 3651 (class 0 OID 24615)
-- Dependencies: 231
-- Data for Name: estados; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.estados VALUES (1, 'Ciudad de México');
INSERT INTO public.estados VALUES (2, 'México');


--
-- TOC entry 3658 (class 0 OID 24634)
-- Dependencies: 238
-- Data for Name: municipios; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.municipios VALUES (1, 1, 'Álvaro Obregón');
INSERT INTO public.municipios VALUES (2, 1, 'Benito Juárez');
INSERT INTO public.municipios VALUES (3, 1, 'Coyoacán');
INSERT INTO public.municipios VALUES (4, 1, 'Cuauhtémoc');
INSERT INTO public.municipios VALUES (5, 1, 'Gustavo A. Madero');
INSERT INTO public.municipios VALUES (6, 1, 'Cuajimalpa de Morelos');
INSERT INTO public.municipios VALUES (7, 1, 'Iztapalapa');
INSERT INTO public.municipios VALUES (8, 1, 'Miguel Hidalgo');
INSERT INTO public.municipios VALUES (9, 1, 'Milpa Alta');
INSERT INTO public.municipios VALUES (10, 1, 'Tláhuac');
INSERT INTO public.municipios VALUES (11, 1, 'La Magdalena Contreras');
INSERT INTO public.municipios VALUES (12, 1, 'Tlalpan');
INSERT INTO public.municipios VALUES (13, 1, 'Venustiano Carranza');
INSERT INTO public.municipios VALUES (14, 1, 'Xochimilco');
INSERT INTO public.municipios VALUES (15, 1, 'Azcapotzalco');
INSERT INTO public.municipios VALUES (16, 1, 'Iztacalco');
INSERT INTO public.municipios VALUES (17, 2, 'Ecatepec de Morelos');
INSERT INTO public.municipios VALUES (18, 2, 'Toluca');
INSERT INTO public.municipios VALUES (19, 2, 'Coacalco de Berriozábal');
INSERT INTO public.municipios VALUES (20, 2, 'Tlalnepantla de Baz');


--
-- TOC entry 3637 (class 0 OID 24576)
-- Dependencies: 217
-- Data for Name: colonias; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.colonias VALUES (1, 1, 'La Estrella', '1220');
INSERT INTO public.colonias VALUES (2, 1, 'Campo de Tiro los Gamitos', '1230');
INSERT INTO public.colonias VALUES (3, 1, 'Los Gamitos', '1230');
INSERT INTO public.colonias VALUES (4, 1, 'Tlapechico', '1230');
INSERT INTO public.colonias VALUES (5, 1, 'El Piru Santa Fe', '1230');
INSERT INTO public.colonias VALUES (6, 1, 'El Piru 2a Ampliación', '1230');
INSERT INTO public.colonias VALUES (7, 1, 'La Huerta', '1239');
INSERT INTO public.colonias VALUES (8, 1, 'Pueblo Nuevo', '1240');
INSERT INTO public.colonias VALUES (9, 1, 'El Árbol', '1250');
INSERT INTO public.colonias VALUES (10, 1, 'Ladera', '1250');
INSERT INTO public.colonias VALUES (11, 1, 'Lomas de Nuevo México', '1250');
INSERT INTO public.colonias VALUES (12, 1, 'Margarita Maza de Juárez', '1250');
INSERT INTO public.colonias VALUES (13, 1, 'Tecolalco', '1250');
INSERT INTO public.colonias VALUES (14, 1, 'Ampliación La Cebada', '1259');
INSERT INTO public.colonias VALUES (15, 1, 'La Mexicana 2a Ampliación', '1259');
INSERT INTO public.colonias VALUES (16, 1, 'Calzada Jalalpa', '1260');
INSERT INTO public.colonias VALUES (17, 1, 'La Mexicana', '1260');
INSERT INTO public.colonias VALUES (18, 1, 'Ampliación La Mexicana', '1260');
INSERT INTO public.colonias VALUES (19, 1, 'La Palmita', '1260');
INSERT INTO public.colonias VALUES (20, 1, 'Liberación Proletaria', '1260');
INSERT INTO public.colonias VALUES (21, 1, '1a Sección Cañada', '1269');
INSERT INTO public.colonias VALUES (22, 1, '2a Sección Cañada', '1269');
INSERT INTO public.colonias VALUES (23, 1, 'El Tejocote', '1270');
INSERT INTO public.colonias VALUES (24, 1, 'La Presa', '1270');
INSERT INTO public.colonias VALUES (25, 1, 'Golondrinas', '1270');
INSERT INTO public.colonias VALUES (26, 1, 'Golondrinas 1a Sección', '1270');
INSERT INTO public.colonias VALUES (27, 1, 'Golondrinas 2a Sección', '1270');
INSERT INTO public.colonias VALUES (28, 1, 'Lomas de Capula', '1270');
INSERT INTO public.colonias VALUES (29, 1, 'Villa Solidaridad', '1275');
INSERT INTO public.colonias VALUES (30, 1, 'El Pirul', '1276');
INSERT INTO public.colonias VALUES (31, 1, 'Desarrollo Urbano', '1278');
INSERT INTO public.colonias VALUES (32, 1, 'Lomas de Becerra', '1279');
INSERT INTO public.colonias VALUES (33, 1, 'Arvide', '1280');
INSERT INTO public.colonias VALUES (34, 1, 'El Pocito', '1280');
INSERT INTO public.colonias VALUES (35, 1, 'Francisco Villa', '1280');
INSERT INTO public.colonias VALUES (36, 1, 'La Joya', '1280');
INSERT INTO public.colonias VALUES (37, 1, 'El Rodeo', '1285');
INSERT INTO public.colonias VALUES (38, 1, 'Reacomodo El Cuernito', '1289');
INSERT INTO public.colonias VALUES (39, 1, 'Piloto Adolfo López Mateos', '1290');
INSERT INTO public.colonias VALUES (40, 1, 'Presidentes', '1290');
INSERT INTO public.colonias VALUES (41, 1, 'Jalalpa Tepito 2a Ampliación', '1296');
INSERT INTO public.colonias VALUES (42, 1, 'Ampliación Jalalpa', '1296');
INSERT INTO public.colonias VALUES (43, 1, 'Jalalpa Tepito', '1296');
INSERT INTO public.colonias VALUES (44, 1, 'Ampliación Piloto Adolfo López Mateos', '1298');
INSERT INTO public.colonias VALUES (45, 1, '1a Ampliación Presidentes', '1299');
INSERT INTO public.colonias VALUES (46, 1, '2a Ampliación Presidentes', '1299');
INSERT INTO public.colonias VALUES (47, 1, 'San Gabriel', '1310');
INSERT INTO public.colonias VALUES (48, 1, 'Carlos A. Madrazo', '1320');
INSERT INTO public.colonias VALUES (49, 1, 'Paseo de las Lomas', '1330');
INSERT INTO public.colonias VALUES (50, 1, 'Bejero del Pueblo Santa Fe', '1340');
INSERT INTO public.colonias VALUES (51, 1, 'Santa Fe', '1376');
INSERT INTO public.colonias VALUES (52, 1, 'Santa Fe Peña Blanca', '1376');
INSERT INTO public.colonias VALUES (53, 1, 'Santa Fe La Loma', '1376');
INSERT INTO public.colonias VALUES (54, 1, 'Santa Fe Centro Ciudad', '1376');
INSERT INTO public.colonias VALUES (55, 1, 'Jalalpa El Grande', '1377');
INSERT INTO public.colonias VALUES (56, 1, 'Santa Fe Tlayapaca', '1389');
INSERT INTO public.colonias VALUES (57, 1, 'Olivar del Conde 1a Sección', '1400');
INSERT INTO public.colonias VALUES (58, 1, 'Preconcreto', '1400');
INSERT INTO public.colonias VALUES (59, 1, 'Galeana', '1407');
INSERT INTO public.colonias VALUES (60, 1, 'Olivar del Conde 2a Sección', '1408');
INSERT INTO public.colonias VALUES (61, 1, 'Barrio Norte', '1410');
INSERT INTO public.colonias VALUES (62, 1, 'Palmas', '1410');
INSERT INTO public.colonias VALUES (63, 1, 'Minas Cristo Rey', '1419');
INSERT INTO public.colonias VALUES (64, 1, 'Sacramento', '1420');
INSERT INTO public.colonias VALUES (65, 1, 'Santa María Nonoalco', '1420');
INSERT INTO public.colonias VALUES (66, 1, 'Colina del Sur', '1430');
INSERT INTO public.colonias VALUES (67, 1, 'Hogar y Redención', '1450');
INSERT INTO public.colonias VALUES (68, 1, 'Alfonso XIII', '1460');
INSERT INTO public.colonias VALUES (69, 1, 'Alfalfar', '1470');
INSERT INTO public.colonias VALUES (70, 1, 'Molino de Rosas', '1470');
INSERT INTO public.colonias VALUES (71, 1, 'Lomas de Plateros', '1480');
INSERT INTO public.colonias VALUES (72, 1, 'La Cascada', '1490');
INSERT INTO public.colonias VALUES (73, 1, 'Santa Lucía', '1500');
INSERT INTO public.colonias VALUES (74, 1, 'Miguel Gaona Armenta', '1500');
INSERT INTO public.colonias VALUES (75, 1, 'Santa Lucía Chantepec', '1509');
INSERT INTO public.colonias VALUES (76, 1, 'Garcimarrero', '1510');
INSERT INTO public.colonias VALUES (77, 1, 'La Araña', '1510');
INSERT INTO public.colonias VALUES (78, 1, 'Los Cedros', '1510');
INSERT INTO public.colonias VALUES (79, 1, 'Ampliación Los Pirules', '1520');
INSERT INTO public.colonias VALUES (80, 1, 'Estado de Hidalgo', '1520');
INSERT INTO public.colonias VALUES (81, 1, 'Ampliación Estado de Hidalgo', '1520');
INSERT INTO public.colonias VALUES (82, 1, 'Piru Santa Lucía', '1520');
INSERT INTO public.colonias VALUES (83, 1, 'El Politoco', '1520');
INSERT INTO public.colonias VALUES (84, 1, 'Corpus Christy', '1530');
INSERT INTO public.colonias VALUES (85, 1, 'Tepopotla', '1538');
INSERT INTO public.colonias VALUES (86, 1, 'Acuilotla', '1539');
INSERT INTO public.colonias VALUES (87, 1, 'Cooperativa Unión Olivos', '1539');
INSERT INTO public.colonias VALUES (88, 1, 'Balcones de Cehuayo', '1540');
INSERT INTO public.colonias VALUES (89, 1, 'Cehuaya', '1540');
INSERT INTO public.colonias VALUES (90, 1, 'Llano Redondo', '1540');
INSERT INTO public.colonias VALUES (91, 1, 'Punta de Cehuaya', '1540');
INSERT INTO public.colonias VALUES (92, 1, 'Villa Progresista', '1548');
INSERT INTO public.colonias VALUES (93, 1, 'Dos Ríos del Pueblo Santa Lucía', '1549');
INSERT INTO public.colonias VALUES (94, 1, 'Tepeaca', '1550');
INSERT INTO public.colonias VALUES (95, 1, 'Ampliación Tepeaca', '1550');
INSERT INTO public.colonias VALUES (96, 1, 'Rinconada Las Cuevitas', '1550');
INSERT INTO public.colonias VALUES (97, 1, 'Ave Real', '1560');
INSERT INTO public.colonias VALUES (98, 1, 'Canutillo', '1560');
INSERT INTO public.colonias VALUES (99, 1, 'Canutillo 3a Sección', '1560');
INSERT INTO public.colonias VALUES (100, 1, 'Canutillo 2a Sección', '1560');
INSERT INTO public.colonias VALUES (101, 1, 'Hueytlale', '1566');
INSERT INTO public.colonias VALUES (102, 1, 'Reacomodo Valentín Gómez Farías', '1569');
INSERT INTO public.colonias VALUES (103, 1, 'Tarango', '1588');
INSERT INTO public.colonias VALUES (104, 1, 'El Rincón', '1590');
INSERT INTO public.colonias VALUES (105, 1, 'Merced Gómez', '1600');
INSERT INTO public.colonias VALUES (106, 1, 'Colinas de Tarango', '1610');
INSERT INTO public.colonias VALUES (107, 1, 'Profesor J. Arturo López Martínez', '1610');
INSERT INTO public.colonias VALUES (108, 1, 'Arcos Centenario', '1618');
INSERT INTO public.colonias VALUES (109, 1, 'Ex-Hacienda de Tarango', '1618');
INSERT INTO public.colonias VALUES (110, 1, 'La Martinica', '1619');
INSERT INTO public.colonias VALUES (111, 2, 'Del Valle Norte', '3103');
INSERT INTO public.colonias VALUES (112, 2, 'Del Valle Sur', '3104');
INSERT INTO public.colonias VALUES (113, 2, 'Tlacoquemécatl', '3200');
INSERT INTO public.colonias VALUES (114, 2, 'Actipan', '3230');
INSERT INTO public.colonias VALUES (115, 2, 'Acacias', '3240');
INSERT INTO public.colonias VALUES (116, 2, 'Portales Sur', '3300');
INSERT INTO public.colonias VALUES (117, 2, 'Portales Norte', '3303');
INSERT INTO public.colonias VALUES (118, 2, 'Santa Cruz Atoyac', '3310');
INSERT INTO public.colonias VALUES (119, 2, 'Residencial Emperadores', '3320');
INSERT INTO public.colonias VALUES (120, 2, 'Xoco', '3330');
INSERT INTO public.colonias VALUES (121, 2, 'General Pedro María Anaya', '3340');
INSERT INTO public.colonias VALUES (122, 2, 'Álamos', '3400');
INSERT INTO public.colonias VALUES (123, 2, 'Postal', '3410');
INSERT INTO public.colonias VALUES (124, 2, 'Miguel Alemán', '3420');
INSERT INTO public.colonias VALUES (125, 2, 'Josefa Ortiz de Domínguez', '3430');
INSERT INTO public.colonias VALUES (126, 2, 'Niños Héroes', '3440');
INSERT INTO public.colonias VALUES (127, 2, 'Nativitas', '3500');
INSERT INTO public.colonias VALUES (128, 2, 'Moderna', '3510');
INSERT INTO public.colonias VALUES (129, 2, 'Iztaccihuatl', '3520');
INSERT INTO public.colonias VALUES (130, 2, 'Villa de Cortés', '3530');
INSERT INTO public.colonias VALUES (131, 2, 'Del Carmen', '3540');
INSERT INTO public.colonias VALUES (132, 2, 'Zacahuitzco', '3550');
INSERT INTO public.colonias VALUES (133, 2, 'Albert', '3560');
INSERT INTO public.colonias VALUES (134, 2, 'Portales Oriente', '3570');
INSERT INTO public.colonias VALUES (135, 2, 'Miravalle', '3580');
INSERT INTO public.colonias VALUES (136, 2, 'Ermita', '3590');
INSERT INTO public.colonias VALUES (137, 2, 'Vértiz Narvarte', '3600');
INSERT INTO public.colonias VALUES (138, 2, 'Américas Unidas', '3610');
INSERT INTO public.colonias VALUES (139, 2, 'Periodista', '3620');
INSERT INTO public.colonias VALUES (140, 2, 'Independencia', '3630');
INSERT INTO public.colonias VALUES (141, 2, 'Del Lago', '3640');
INSERT INTO public.colonias VALUES (142, 2, 'Letrán Valle', '3650');
INSERT INTO public.colonias VALUES (143, 2, 'San Simón Ticumac', '3660');
INSERT INTO public.colonias VALUES (144, 2, 'Santa María Nonoalco', '3700');
INSERT INTO public.colonias VALUES (145, 2, 'Ciudad de los Deportes', '3710');
INSERT INTO public.colonias VALUES (146, 2, 'Nochebuena', '3720');
INSERT INTO public.colonias VALUES (147, 2, 'San Juan', '3730');
INSERT INTO public.colonias VALUES (148, 2, 'Extremadura Insurgentes', '3740');
INSERT INTO public.colonias VALUES (149, 2, 'San Pedro de los Pinos', '3800');
INSERT INTO public.colonias VALUES (150, 2, 'Nápoles', '3810');
INSERT INTO public.colonias VALUES (151, 2, '8 de Agosto', '3820');
INSERT INTO public.colonias VALUES (152, 2, 'Ampliación Nápoles', '3840');
INSERT INTO public.colonias VALUES (153, 2, 'San José Insurgentes', '3900');
INSERT INTO public.colonias VALUES (154, 2, 'Mixcoac', '3910');
INSERT INTO public.colonias VALUES (155, 2, 'Insurgentes Mixcoac', '3920');
INSERT INTO public.colonias VALUES (156, 2, 'Merced Gómez', '3930');
INSERT INTO public.colonias VALUES (157, 2, 'Crédito Constructor', '3940');
INSERT INTO public.colonias VALUES (158, 3, 'Villa Coyoacán', '4000');
INSERT INTO public.colonias VALUES (159, 3, 'Santa Catarina', '4010');
INSERT INTO public.colonias VALUES (160, 3, 'La Concepción', '4020');
INSERT INTO public.colonias VALUES (161, 3, 'San Lucas', '4030');
INSERT INTO public.colonias VALUES (162, 1, 'Rinconada de Tarango', '1619');
INSERT INTO public.colonias VALUES (163, 1, 'Lomas de Tarango', '1620');
INSERT INTO public.colonias VALUES (164, 1, 'Lomas de Puerta Grande', '1630');
INSERT INTO public.colonias VALUES (165, 1, 'Puerta Grande', '1630');
INSERT INTO public.colonias VALUES (166, 1, 'Los Juristas', '1630');
INSERT INTO public.colonias VALUES (167, 1, 'Herón Proal', '1640');
INSERT INTO public.colonias VALUES (168, 1, 'Ponciano Arriaga', '1645');
INSERT INTO public.colonias VALUES (169, 1, 'La Milagrosa', '1650');
INSERT INTO public.colonias VALUES (170, 1, 'Palmas Axotitla', '1650');
INSERT INTO public.colonias VALUES (171, 1, 'Tlacuitlapa', '1650');
INSERT INTO public.colonias VALUES (172, 1, 'Ampliación Tlacuitlapa', '1650');
INSERT INTO public.colonias VALUES (173, 1, '2o Reacomodo Tlacuitlapa', '1650');
INSERT INTO public.colonias VALUES (174, 1, 'El Ruedo', '1650');
INSERT INTO public.colonias VALUES (176, 1, 'La Joyita del Pueblo Tetelpan', '1700');
INSERT INTO public.colonias VALUES (177, 1, 'Ocotillos del Pueblo Tetelpan', '1700');
INSERT INTO public.colonias VALUES (178, 1, 'San Agustín del Pueblo Tetelpan', '1700');
INSERT INTO public.colonias VALUES (179, 1, '2a Del Moral del Pueblo Tetelpan', '1700');
INSERT INTO public.colonias VALUES (180, 1, 'Tecalcapa del Pueblo Tetelpan', '1700');
INSERT INTO public.colonias VALUES (181, 1, 'Tetelpan', '1700');
INSERT INTO public.colonias VALUES (182, 1, 'El Encino del Pueblo Tetelpan', '1708');
INSERT INTO public.colonias VALUES (183, 1, 'El Mirador del Pueblo Tetelpan', '1708');
INSERT INTO public.colonias VALUES (184, 1, 'Las Águilas', '1710');
INSERT INTO public.colonias VALUES (185, 1, 'Ampliación Alpes', '1710');
INSERT INTO public.colonias VALUES (186, 1, 'Lomas de Guadalupe', '1720');
INSERT INTO public.colonias VALUES (187, 1, 'Alcantarilla', '1729');
INSERT INTO public.colonias VALUES (188, 1, 'Lomas de las Águilas', '1730');
INSERT INTO public.colonias VALUES (189, 1, 'Puente Colorado', '1730');
INSERT INTO public.colonias VALUES (190, 1, 'La Peñita del Pueblo Tetelpan', '1740');
INSERT INTO public.colonias VALUES (191, 1, 'San Clemente Norte', '1740');
INSERT INTO public.colonias VALUES (192, 1, 'San Clemente Sur', '1740');
INSERT INTO public.colonias VALUES (193, 1, 'Las Águilas 1a Sección', '1750');
INSERT INTO public.colonias VALUES (194, 1, 'Las Águilas 2o Parque', '1750');
INSERT INTO public.colonias VALUES (195, 1, 'Las Águilas 3er. Parque', '1750');
INSERT INTO public.colonias VALUES (196, 1, 'Ampliación Las Águilas', '1759');
INSERT INTO public.colonias VALUES (197, 1, 'Atlamaya', '1760');
INSERT INTO public.colonias VALUES (198, 1, 'Flor de María', '1760');
INSERT INTO public.colonias VALUES (199, 1, 'La Herradura del Pueblo Tetelpan', '1760');
INSERT INTO public.colonias VALUES (200, 1, 'La Angostura', '1770');
INSERT INTO public.colonias VALUES (201, 1, 'San José del Olivar', '1770');
INSERT INTO public.colonias VALUES (202, 1, 'Olivar de los Padres', '1780');
INSERT INTO public.colonias VALUES (203, 1, 'Tizampampano del Pueblo Tetelpan', '1780');
INSERT INTO public.colonias VALUES (204, 1, 'Miguel Hidalgo', '1789');
INSERT INTO public.colonias VALUES (205, 1, 'Lomas de los Ángeles del Pueblo Tetelpan', '1790');
INSERT INTO public.colonias VALUES (206, 1, 'Lomas de San Ángel Inn', '1790');
INSERT INTO public.colonias VALUES (207, 1, 'San Bartolo Ameyalco', '1800');
INSERT INTO public.colonias VALUES (208, 1, 'Rancho San Francisco Pueblo San Bartolo Ameyalco', '1807');
INSERT INTO public.colonias VALUES (209, 1, 'Villa Verdún', '1810');
INSERT INTO public.colonias VALUES (210, 1, 'Lomas Axomiatla', '1820');
INSERT INTO public.colonias VALUES (211, 1, 'Ejido San Mateo', '1820');
INSERT INTO public.colonias VALUES (212, 1, 'Santa Rosa Xochiac', '1830');
INSERT INTO public.colonias VALUES (213, 1, 'Torres de Potrero', '1840');
INSERT INTO public.colonias VALUES (214, 1, 'Rincón de la Bolsa', '1849');
INSERT INTO public.colonias VALUES (215, 1, 'Rancho del Carmen del Pueblo San Bartolo Ameyalco', '1849');
INSERT INTO public.colonias VALUES (216, 4, 'Doctores', '6720');
INSERT INTO public.colonias VALUES (217, 4, 'Roma Sur', '6760');
INSERT INTO public.colonias VALUES (218, 4, 'Buenos Aires', '6780');
INSERT INTO public.colonias VALUES (219, 4, 'Obrera', '6800');
INSERT INTO public.colonias VALUES (220, 4, 'Tránsito', '6820');
INSERT INTO public.colonias VALUES (221, 4, 'Esperanza', '6840');
INSERT INTO public.colonias VALUES (222, 4, 'Asturias', '6850');
INSERT INTO public.colonias VALUES (223, 4, 'Vista Alegre', '6860');
INSERT INTO public.colonias VALUES (224, 4, 'Paulino Navarro', '6870');
INSERT INTO public.colonias VALUES (225, 4, 'Algarin', '6880');
INSERT INTO public.colonias VALUES (226, 4, 'Ampliación Asturias', '6890');
INSERT INTO public.colonias VALUES (227, 4, 'Nonoalco Tlatelolco', '6900');
INSERT INTO public.colonias VALUES (228, 4, 'San Simón Tolnáhuac', '6920');
INSERT INTO public.colonias VALUES (229, 5, 'Aragón la Villa', '7000');
INSERT INTO public.colonias VALUES (230, 5, 'Rosas del Tepeyac', '7010');
INSERT INTO public.colonias VALUES (231, 5, 'Santa Isabel Tola', '7010');
INSERT INTO public.colonias VALUES (232, 5, 'Tepetates', '7010');
INSERT INTO public.colonias VALUES (233, 5, 'Tepeyac Insurgentes', '7020');
INSERT INTO public.colonias VALUES (234, 5, 'Santiago Atzacoalco', '7040');
INSERT INTO public.colonias VALUES (235, 5, 'Villa Gustavo A. Madero', '7050');
INSERT INTO public.colonias VALUES (236, 5, '15 de Agosto', '7058');
INSERT INTO public.colonias VALUES (237, 5, 'Estanzuela', '7060');
INSERT INTO public.colonias VALUES (238, 5, 'Triunfo de La República', '7069');
INSERT INTO public.colonias VALUES (239, 5, 'La Cruz', '7070');
INSERT INTO public.colonias VALUES (240, 5, 'Dinamita', '7070');
INSERT INTO public.colonias VALUES (241, 5, 'Martín Carrera', '7070');
INSERT INTO public.colonias VALUES (242, 5, 'Gabriel Hernández', '7080');
INSERT INTO public.colonias VALUES (243, 5, 'Ampliación Gabriel Hernández', '7089');
INSERT INTO public.colonias VALUES (244, 5, 'C.T.M. Atzacoalco', '7090');
INSERT INTO public.colonias VALUES (245, 5, 'C.T.M. El Risco', '7090');
INSERT INTO public.colonias VALUES (246, 5, 'Cuautepec Barrio Alto', '7100');
INSERT INTO public.colonias VALUES (247, 5, 'San Miguel', '7100');
INSERT INTO public.colonias VALUES (248, 5, 'San Antonio', '7109');
INSERT INTO public.colonias VALUES (249, 5, 'Lomas de Cuautepec', '7110');
INSERT INTO public.colonias VALUES (250, 5, 'Malacates', '7119');
INSERT INTO public.colonias VALUES (251, 5, 'Ampliación Malacates', '7119');
INSERT INTO public.colonias VALUES (252, 5, 'Compositores Mexicanos', '7130');
INSERT INTO public.colonias VALUES (253, 5, 'El Tepetatal', '7130');
INSERT INTO public.colonias VALUES (254, 5, 'Arboledas', '7140');
INSERT INTO public.colonias VALUES (255, 5, 'Ampliación Arboledas', '7140');
INSERT INTO public.colonias VALUES (256, 5, 'Forestal', '7140');
INSERT INTO public.colonias VALUES (257, 5, 'Forestal I', '7140');
INSERT INTO public.colonias VALUES (258, 5, 'Forestal II', '7144');
INSERT INTO public.colonias VALUES (259, 5, 'La Lengüeta', '7144');
INSERT INTO public.colonias VALUES (260, 5, 'Parque Metropolitano', '7149');
INSERT INTO public.colonias VALUES (261, 5, 'Juventino Rosas', '7150');
INSERT INTO public.colonias VALUES (262, 5, 'La Casilda', '7150');
INSERT INTO public.colonias VALUES (263, 5, 'Loma La Palma', '7160');
INSERT INTO public.colonias VALUES (264, 5, 'Luis Donaldo Colosio', '7164');
INSERT INTO public.colonias VALUES (265, 5, 'Tlacaélel', '7164');
INSERT INTO public.colonias VALUES (266, 5, 'Graciano Sánchez', '7164');
INSERT INTO public.colonias VALUES (267, 5, 'Prados de Cuautepec', '7164');
INSERT INTO public.colonias VALUES (268, 5, 'Palmatitla', '7170');
INSERT INTO public.colonias VALUES (269, 5, 'Cocoyotes', '7180');
INSERT INTO public.colonias VALUES (270, 5, 'General Felipe Berriozabal', '7180');
INSERT INTO public.colonias VALUES (271, 3, 'El Reloj', '4640');
INSERT INTO public.colonias VALUES (272, 3, 'Santa Úrsula Coapa', '4650');
INSERT INTO public.colonias VALUES (273, 3, 'Joyas del Pedregal', '4660');
INSERT INTO public.colonias VALUES (274, 3, 'Pedregal de Carrasco', '4700');
INSERT INTO public.colonias VALUES (275, 3, 'Olímpica', '4710');
INSERT INTO public.colonias VALUES (276, 3, 'Cantil del Pedregal', '4730');
INSERT INTO public.colonias VALUES (277, 3, 'Bosques de Tetlameya', '4730');
INSERT INTO public.colonias VALUES (278, 3, 'El Caracol', '4739');
INSERT INTO public.colonias VALUES (279, 3, 'Alianza Popular Revolucionaria', '4800');
INSERT INTO public.colonias VALUES (280, 3, 'Los Cedros', '4800');
INSERT INTO public.colonias VALUES (281, 3, 'Prados de Coyoacán', '4810');
INSERT INTO public.colonias VALUES (282, 3, 'Emiliano Zapata', '4815');
INSERT INTO public.colonias VALUES (283, 3, 'Los Cipreses', '4830');
INSERT INTO public.colonias VALUES (284, 3, 'Ex-Ejido de San Pablo Tepetlapa', '4840');
INSERT INTO public.colonias VALUES (285, 3, 'Espartaco', '4870');
INSERT INTO public.colonias VALUES (286, 3, 'Jardines de Coyoacán', '4890');
INSERT INTO public.colonias VALUES (287, 3, 'Los Olivos', '4890');
INSERT INTO public.colonias VALUES (288, 3, 'El Parque de Coyoacán', '4899');
INSERT INTO public.colonias VALUES (289, 3, 'Culhuacán CTM Sección VIII', '4909');
INSERT INTO public.colonias VALUES (290, 3, 'Culhuacán CTM Sección IX-A', '4909');
INSERT INTO public.colonias VALUES (291, 3, 'Culhuacán CTM Sección IX-B', '4909');
INSERT INTO public.colonias VALUES (292, 3, 'Carmen Serdán', '4910');
INSERT INTO public.colonias VALUES (293, 3, 'Cafetales', '4918');
INSERT INTO public.colonias VALUES (294, 3, 'Emiliano Zapata Fraccionamiento Popular', '4919');
INSERT INTO public.colonias VALUES (295, 3, 'Los Girasoles', '4920');
INSERT INTO public.colonias VALUES (296, 3, 'Las Campanas', '4929');
INSERT INTO public.colonias VALUES (297, 3, 'Santa Cecilia', '4930');
INSERT INTO public.colonias VALUES (298, 3, 'Campestre Coyoacán', '4938');
INSERT INTO public.colonias VALUES (299, 3, 'Culhuacán CTM Sección X', '4939');
INSERT INTO public.colonias VALUES (300, 3, 'Los Sauces', '4940');
INSERT INTO public.colonias VALUES (301, 3, 'El Mirador', '4950');
INSERT INTO public.colonias VALUES (302, 3, 'Villa Quietud', '4960');
INSERT INTO public.colonias VALUES (303, 3, 'Haciendas de Coyoacán', '4970');
INSERT INTO public.colonias VALUES (304, 3, 'Ex-Ejido de Santa Úrsula Coapa', '4980');
INSERT INTO public.colonias VALUES (305, 3, 'Ex-Hacienda Coapa', '4980');
INSERT INTO public.colonias VALUES (306, 3, 'Viejo Ejido de Santa Úrsula Coapa', '4980');
INSERT INTO public.colonias VALUES (307, 6, 'Cuajimalpa', '5000');
INSERT INTO public.colonias VALUES (308, 6, 'Zentlapatl', '5010');
INSERT INTO public.colonias VALUES (309, 6, 'Loma del Padre', '5020');
INSERT INTO public.colonias VALUES (310, 6, 'San Pedro', '5030');
INSERT INTO public.colonias VALUES (311, 6, 'La Manzanita', '5030');
INSERT INTO public.colonias VALUES (312, 6, 'San Pablo Chimalpa', '5050');
INSERT INTO public.colonias VALUES (313, 6, 'Lomas de Vista Hermosa', '5100');
INSERT INTO public.colonias VALUES (314, 6, 'Cooperativa Palo Alto', '5110');
INSERT INTO public.colonias VALUES (315, 6, 'Granjas Palo Alto', '5118');
INSERT INTO public.colonias VALUES (316, 6, 'Campestre Palo Alto', '5119');
INSERT INTO public.colonias VALUES (317, 6, 'Bosques de las Lomas', '5120');
INSERT INTO public.colonias VALUES (318, 6, 'Lomas del Chamizal', '5129');
INSERT INTO public.colonias VALUES (319, 6, 'San José de los Cedros', '5200');
INSERT INTO public.colonias VALUES (320, 6, 'Granjas Navidad', '5219');
INSERT INTO public.colonias VALUES (321, 6, 'Tepetongo', '5220');
INSERT INTO public.colonias VALUES (322, 6, 'El Ébano', '5230');
INSERT INTO public.colonias VALUES (323, 6, 'El Molino', '5240');
INSERT INTO public.colonias VALUES (324, 6, 'Jesús del Monte', '5260');
INSERT INTO public.colonias VALUES (325, 6, 'Amado Nervo', '5269');
INSERT INTO public.colonias VALUES (326, 5, 'Pradera II Sección', '7509');
INSERT INTO public.colonias VALUES (327, 5, 'San Felipe de Jesús', '7510');
INSERT INTO public.colonias VALUES (328, 5, '25 de Julio', '7520');
INSERT INTO public.colonias VALUES (329, 5, 'Campestre Aragón', '7530');
INSERT INTO public.colonias VALUES (330, 5, 'La Esmeralda', '7540');
INSERT INTO public.colonias VALUES (331, 5, 'Providencia', '7550');
INSERT INTO public.colonias VALUES (332, 5, 'Ampliación Providencia', '7560');
INSERT INTO public.colonias VALUES (333, 5, 'Villa de Aragón', '7570');
INSERT INTO public.colonias VALUES (334, 5, 'Ampliación Casas Alemán', '7580');
INSERT INTO public.colonias VALUES (335, 5, 'Progreso Nacional', '7600');
INSERT INTO public.colonias VALUES (336, 5, 'Santa Rosa', '7620');
INSERT INTO public.colonias VALUES (337, 5, 'San José de la Escalera', '7630');
INSERT INTO public.colonias VALUES (338, 5, 'Santiago Atepetlac', '7640');
INSERT INTO public.colonias VALUES (339, 5, 'Ampliación Progreso Nacional', '7650');
INSERT INTO public.colonias VALUES (340, 5, 'Guadalupe Proletaria', '7670');
INSERT INTO public.colonias VALUES (341, 5, 'Ampliación Guadalupe Proletaria', '7680');
INSERT INTO public.colonias VALUES (342, 5, 'Nueva Industrial Vallejo', '7700');
INSERT INTO public.colonias VALUES (343, 5, 'Siete Maravillas', '7707');
INSERT INTO public.colonias VALUES (344, 5, 'Torres Lindavista', '7708');
INSERT INTO public.colonias VALUES (345, 5, 'Lindavista Vallejo I Sección', '7720');
INSERT INTO public.colonias VALUES (346, 5, 'Churubusco Tepeyac', '7730');
INSERT INTO public.colonias VALUES (347, 5, 'Montevideo', '7730');
INSERT INTO public.colonias VALUES (348, 5, 'San Bartolo Atepehuacan', '7730');
INSERT INTO public.colonias VALUES (349, 5, 'Planetario Lindavista', '7739');
INSERT INTO public.colonias VALUES (350, 5, 'Valle del Tepeyac', '7740');
INSERT INTO public.colonias VALUES (351, 5, 'Nueva Vallejo', '7750');
INSERT INTO public.colonias VALUES (352, 5, 'Lindavista Vallejo III Sección', '7754');
INSERT INTO public.colonias VALUES (353, 5, 'Lindavista Vallejo II Sección', '7755');
INSERT INTO public.colonias VALUES (354, 5, 'Magdalena de las Salinas', '7760');
INSERT INTO public.colonias VALUES (355, 5, 'Panamericana', '7770');
INSERT INTO public.colonias VALUES (356, 5, 'Ampliación Panamericana', '7770');
INSERT INTO public.colonias VALUES (357, 5, 'Defensores de La República', '7780');
INSERT INTO public.colonias VALUES (358, 5, 'Héroe de Nacozari', '7780');
INSERT INTO public.colonias VALUES (359, 5, 'Guadalupe Victoria', '7790');
INSERT INTO public.colonias VALUES (360, 5, 'Vallejo Poniente', '7790');
INSERT INTO public.colonias VALUES (361, 5, 'Industrial', '7800');
INSERT INTO public.colonias VALUES (362, 5, 'Estrella', '7810');
INSERT INTO public.colonias VALUES (363, 5, 'Aragón Inguarán', '7820');
INSERT INTO public.colonias VALUES (364, 5, 'Tres Estrellas', '7820');
INSERT INTO public.colonias VALUES (365, 5, 'Gertrudis Sánchez 1a Sección', '7830');
INSERT INTO public.colonias VALUES (366, 5, 'Gertrudis Sánchez 3a Sección', '7838');
INSERT INTO public.colonias VALUES (367, 5, 'Gertrudis Sánchez 2a Sección', '7839');
INSERT INTO public.colonias VALUES (368, 5, 'Guadalupe Tepeyac', '7840');
INSERT INTO public.colonias VALUES (369, 5, '7 de Noviembre', '7840');
INSERT INTO public.colonias VALUES (370, 5, 'Bondojito', '7850');
INSERT INTO public.colonias VALUES (371, 5, 'Faja de Oro', '7850');
INSERT INTO public.colonias VALUES (372, 5, 'Ampliación Emiliano Zapata', '7858');
INSERT INTO public.colonias VALUES (373, 5, 'Ampliación Mártires de Río Blanco', '7859');
INSERT INTO public.colonias VALUES (374, 5, 'La Joyita', '7860');
INSERT INTO public.colonias VALUES (375, 5, 'Tablas de San Agustín', '7860');
INSERT INTO public.colonias VALUES (376, 5, 'Belisario Domínguez', '7869');
INSERT INTO public.colonias VALUES (377, 5, 'Guadalupe Insurgentes', '7870');
INSERT INTO public.colonias VALUES (378, 5, 'Vallejo', '7870');
INSERT INTO public.colonias VALUES (379, 5, 'Mártires de Río Blanco', '7880');
INSERT INTO public.colonias VALUES (380, 5, 'Emiliano Zapata', '7889');
INSERT INTO public.colonias VALUES (381, 5, 'Cuchilla La Joya', '7890');
INSERT INTO public.colonias VALUES (382, 7, 'San Pablo', '9648');
INSERT INTO public.colonias VALUES (383, 7, 'Citlalli', '9660');
INSERT INTO public.colonias VALUES (384, 7, 'Palmitas', '9670');
INSERT INTO public.colonias VALUES (385, 7, 'Tenorios', '9680');
INSERT INTO public.colonias VALUES (386, 7, 'Barranca de Guadalupe', '9689');
INSERT INTO public.colonias VALUES (387, 7, 'Iztlahuacán', '9690');
INSERT INTO public.colonias VALUES (388, 7, 'Miravalles', '9696');
INSERT INTO public.colonias VALUES (389, 7, 'Miguel de La Madrid Hurtado', '9698');
INSERT INTO public.colonias VALUES (390, 7, 'Buenavista', '9700');
INSERT INTO public.colonias VALUES (391, 7, 'Carlos Hank González', '9700');
INSERT INTO public.colonias VALUES (392, 7, 'Desarrollo Urbano Quetzalcóatl', '9700');
INSERT INTO public.colonias VALUES (393, 7, 'Santa Cruz Meyehualco', '9700');
INSERT INTO public.colonias VALUES (394, 7, 'Degollado', '9704');
INSERT INTO public.colonias VALUES (395, 7, 'Degollado - Mexicatlalli', '9705');
INSERT INTO public.colonias VALUES (396, 7, 'San José Buenavista', '9706');
INSERT INTO public.colonias VALUES (397, 7, 'Mixcoatl', '9708');
INSERT INTO public.colonias VALUES (398, 7, 'Lomas de Santa Cruz', '9709');
INSERT INTO public.colonias VALUES (399, 7, 'Los Ángeles Apanoaya', '9710');
INSERT INTO public.colonias VALUES (400, 7, 'Francisco Villa', '9720');
INSERT INTO public.colonias VALUES (401, 7, 'La Era', '9720');
INSERT INTO public.colonias VALUES (402, 7, 'Reforma Política', '9730');
INSERT INTO public.colonias VALUES (403, 7, 'Presidentes de México', '9740');
INSERT INTO public.colonias VALUES (404, 7, 'Insurgentes', '9750');
INSERT INTO public.colonias VALUES (405, 7, 'La Polvorilla', '9750');
INSERT INTO public.colonias VALUES (406, 7, 'Las Peñas', '9750');
INSERT INTO public.colonias VALUES (407, 7, 'Consejo Agrarista Mexicano', '9760');
INSERT INTO public.colonias VALUES (408, 7, 'El Triángulo', '9769');
INSERT INTO public.colonias VALUES (409, 7, 'Puente Blanco', '9770');
INSERT INTO public.colonias VALUES (410, 7, 'Año de Juárez', '9780');
INSERT INTO public.colonias VALUES (411, 7, 'Lomas de San Lorenzo', '9780');
INSERT INTO public.colonias VALUES (412, 7, 'San Lorenzo Tezonco', '9790');
INSERT INTO public.colonias VALUES (413, 7, 'Culhuacán', '9800');
INSERT INTO public.colonias VALUES (414, 7, 'El Mirador', '9800');
INSERT INTO public.colonias VALUES (415, 7, 'Estrella Culhuacán', '9800');
INSERT INTO public.colonias VALUES (416, 7, 'Fuego Nuevo', '9800');
INSERT INTO public.colonias VALUES (417, 7, 'San Antonio Culhuacán', '9800');
INSERT INTO public.colonias VALUES (419, 7, 'San Simón Culhuacán', '9800');
INSERT INTO public.colonias VALUES (420, 7, 'Tula', '9800');
INSERT INTO public.colonias VALUES (421, 7, 'Valle de Luces', '9800');
INSERT INTO public.colonias VALUES (422, 7, 'Granjas Esmeralda', '9810');
INSERT INTO public.colonias VALUES (423, 7, 'Los Cipreses', '9810');
INSERT INTO public.colonias VALUES (424, 7, 'Minerva', '9810');
INSERT INTO public.colonias VALUES (425, 7, 'Progreso del Sur', '9810');
INSERT INTO public.colonias VALUES (426, 7, 'Valle del Sur', '9819');
INSERT INTO public.colonias VALUES (427, 7, 'El Santuario', '9820');
INSERT INTO public.colonias VALUES (428, 7, 'Estrella del Sur', '9820');
INSERT INTO public.colonias VALUES (429, 7, 'Ricardo Flores Magón', '9820');
INSERT INTO public.colonias VALUES (430, 7, 'Santa Isabel Industrial', '9820');
INSERT INTO public.colonias VALUES (431, 7, 'Ampliación Ricardo Flores Magón', '9828');
INSERT INTO public.colonias VALUES (432, 7, 'Ampliación El Santuario', '9829');
INSERT INTO public.colonias VALUES (433, 7, 'El Manto', '9830');
INSERT INTO public.colonias VALUES (434, 7, 'El Molino', '9830');
INSERT INTO public.colonias VALUES (435, 7, 'Lomas El Manto', '9830');
INSERT INTO public.colonias VALUES (436, 7, 'Los Ángeles', '9830');
INSERT INTO public.colonias VALUES (437, 7, 'Paraje San Juan', '9830');
INSERT INTO public.colonias VALUES (438, 7, 'San Miguel 8va. Ampliación', '9837');
INSERT INTO public.colonias VALUES (439, 8, 'Reforma Social', '11650');
INSERT INTO public.colonias VALUES (440, 8, 'Bosque de las Lomas', '11700');
INSERT INTO public.colonias VALUES (441, 8, 'Escandón I Sección', '11800');
INSERT INTO public.colonias VALUES (442, 8, 'Escandón II Sección', '11800');
INSERT INTO public.colonias VALUES (443, 8, '16 de Septiembre', '11810');
INSERT INTO public.colonias VALUES (444, 8, 'América', '11820');
INSERT INTO public.colonias VALUES (445, 8, 'Daniel Garza', '11830');
INSERT INTO public.colonias VALUES (446, 8, 'Ampliación Daniel Garza', '11840');
INSERT INTO public.colonias VALUES (447, 8, 'San Miguel Chapultepec I Sección', '11850');
INSERT INTO public.colonias VALUES (448, 8, 'San Miguel Chapultepec II Sección', '11850');
INSERT INTO public.colonias VALUES (449, 8, 'Observatorio', '11860');
INSERT INTO public.colonias VALUES (450, 8, 'Tacubaya', '11870');
INSERT INTO public.colonias VALUES (451, 8, 'Lomas de Bezares', '11910');
INSERT INTO public.colonias VALUES (452, 8, 'Real de las Lomas', '11920');
INSERT INTO public.colonias VALUES (453, 8, 'Lomas de Reforma', '11930');
INSERT INTO public.colonias VALUES (454, 8, 'Lomas Altas', '11950');
INSERT INTO public.colonias VALUES (455, 9, 'La Concepción', '12000');
INSERT INTO public.colonias VALUES (456, 9, 'La Luz', '12000');
INSERT INTO public.colonias VALUES (457, 9, 'Los Ángeles', '12000');
INSERT INTO public.colonias VALUES (458, 9, 'San Mateo', '12000');
INSERT INTO public.colonias VALUES (459, 9, 'Santa Cruz', '12000');
INSERT INTO public.colonias VALUES (460, 9, 'Santa Martha', '12000');
INSERT INTO public.colonias VALUES (461, 9, 'Villa Milpa Alta Centro', '12000');
INSERT INTO public.colonias VALUES (462, 9, 'San Agustin', '12070');
INSERT INTO public.colonias VALUES (463, 9, 'San Agustin Ohtenco', '12080');
INSERT INTO public.colonias VALUES (464, 9, 'Cruztitla', '12100');
INSERT INTO public.colonias VALUES (465, 9, 'Tecaxtitla', '12100');
INSERT INTO public.colonias VALUES (466, 9, 'Tenantitla', '12100');
INSERT INTO public.colonias VALUES (467, 9, 'Xaltipac', '12100');
INSERT INTO public.colonias VALUES (468, 9, 'Xochitepec', '12100');
INSERT INTO public.colonias VALUES (469, 9, 'Emiliano Zapata', '12110');
INSERT INTO public.colonias VALUES (470, 9, 'La Conchita', '12110');
INSERT INTO public.colonias VALUES (471, 9, 'Nochtla', '12200');
INSERT INTO public.colonias VALUES (472, 9, 'Ocotitla', '12200');
INSERT INTO public.colonias VALUES (473, 9, 'Panchimalco', '12200');
INSERT INTO public.colonias VALUES (474, 9, 'Tula', '12200');
INSERT INTO public.colonias VALUES (475, 9, 'San Bartolomé Xicomulco', '12250');
INSERT INTO public.colonias VALUES (476, 9, 'San Salvador Cuauhtenco', '12300');
INSERT INTO public.colonias VALUES (477, 9, 'Centro', '12400');
INSERT INTO public.colonias VALUES (478, 9, 'San Juan', '12400');
INSERT INTO public.colonias VALUES (479, 9, 'San Miguel', '12400');
INSERT INTO public.colonias VALUES (480, 9, 'Chalmita', '12410');
INSERT INTO public.colonias VALUES (481, 9, 'San Lorenzo Tlacoyucan', '12500');
INSERT INTO public.colonias VALUES (482, 9, 'San Jerónimo Miacatlán', '12600');
INSERT INTO public.colonias VALUES (483, 9, 'San Francisco Tecoxpa', '12700');
INSERT INTO public.colonias VALUES (484, 9, 'San Juan Tepenahuac', '12800');
INSERT INTO public.colonias VALUES (485, 9, 'La Lupita Teticpac', '12910');
INSERT INTO public.colonias VALUES (486, 9, 'San Marcos', '12920');
INSERT INTO public.colonias VALUES (488, 9, 'San José', '12940');
INSERT INTO public.colonias VALUES (489, 9, 'La Lupita Xolco', '12950');
INSERT INTO public.colonias VALUES (490, 10, 'La Asunción', '13000');
INSERT INTO public.colonias VALUES (491, 10, 'Santa Cecilia', '13010');
INSERT INTO public.colonias VALUES (492, 10, 'San José', '13020');
INSERT INTO public.colonias VALUES (493, 10, 'San Juan', '13030');
INSERT INTO public.colonias VALUES (494, 10, 'San Mateo', '13040');
INSERT INTO public.colonias VALUES (495, 10, 'La Habana', '13050');
INSERT INTO public.colonias VALUES (496, 10, 'La Guadalupe', '13060');
INSERT INTO public.colonias VALUES (497, 7, 'Plan de Iguala', '9838');
INSERT INTO public.colonias VALUES (498, 7, 'Ampliación Paraje San Juan', '9839');
INSERT INTO public.colonias VALUES (499, 7, 'San Juan Joya', '9839');
INSERT INTO public.colonias VALUES (500, 7, 'Los Reyes Culhuacán', '9840');
INSERT INTO public.colonias VALUES (501, 7, 'Ampliación Los Reyes', '9849');
INSERT INTO public.colonias VALUES (502, 7, 'San Juan Xalpa', '9850');
INSERT INTO public.colonias VALUES (503, 7, 'San Nicolás Tolentino', '9850');
INSERT INTO public.colonias VALUES (504, 7, 'Santa María del Monte', '9850');
INSERT INTO public.colonias VALUES (505, 7, 'Estado de Veracruz', '9856');
INSERT INTO public.colonias VALUES (506, 7, 'Ampliación Veracruzana', '9856');
INSERT INTO public.colonias VALUES (507, 7, 'Paraje San Juan Cerro', '9858');
INSERT INTO public.colonias VALUES (508, 7, 'Benito Juárez', '9859');
INSERT INTO public.colonias VALUES (509, 7, 'Bellavista', '9860');
INSERT INTO public.colonias VALUES (510, 7, 'Ampliación Bellavista', '9860');
INSERT INTO public.colonias VALUES (511, 7, 'Casa Blanca', '9860');
INSERT INTO public.colonias VALUES (512, 7, 'Cerro de La Estrella', '9860');
INSERT INTO public.colonias VALUES (513, 7, 'Parque Nacional Cerro de la Estrella', '9860');
INSERT INTO public.colonias VALUES (514, 7, 'El Rodeo', '9860');
INSERT INTO public.colonias VALUES (515, 7, 'San Juan Estrella', '9868');
INSERT INTO public.colonias VALUES (516, 7, '12 de Diciembre', '9870');
INSERT INTO public.colonias VALUES (517, 7, 'San Andrés Tomatlán', '9870');
INSERT INTO public.colonias VALUES (519, 7, 'Santa María Tomatlán', '9870');
INSERT INTO public.colonias VALUES (520, 7, 'El Vergel', '9880');
INSERT INTO public.colonias VALUES (521, 7, 'Granjas Estrella', '9880');
INSERT INTO public.colonias VALUES (522, 7, 'Lomas Estrella', '9890');
INSERT INTO public.colonias VALUES (523, 7, 'Carlos Jonguitud Barrios', '9897');
INSERT INTO public.colonias VALUES (524, 7, 'Guadalupe', '9900');
INSERT INTO public.colonias VALUES (525, 7, 'San Antonio', '9900');
INSERT INTO public.colonias VALUES (526, 7, 'San Lorenzo', '9900');
INSERT INTO public.colonias VALUES (527, 7, 'La Esperanza', '9910');
INSERT INTO public.colonias VALUES (528, 7, 'José López Portillo', '9920');
INSERT INTO public.colonias VALUES (529, 7, 'El Rosario', '9930');
INSERT INTO public.colonias VALUES (530, 7, 'Jardines de San Lorenzo Tezonco', '9940');
INSERT INTO public.colonias VALUES (531, 7, 'Celoalliotli', '9960');
INSERT INTO public.colonias VALUES (532, 7, 'USCOVI', '9960');
INSERT INTO public.colonias VALUES (533, 7, 'El Molino Tezonco', '9960');
INSERT INTO public.colonias VALUES (534, 7, 'Allapetlalli', '9960');
INSERT INTO public.colonias VALUES (535, 7, 'La Planta', '9960');
INSERT INTO public.colonias VALUES (536, 7, 'Cananea', '9969');
INSERT INTO public.colonias VALUES (537, 7, 'Valle de San Lorenzo', '9970');
INSERT INTO public.colonias VALUES (538, 11, 'Lomas Quebradas', '10000');
INSERT INTO public.colonias VALUES (539, 11, 'La Malinche', '10010');
INSERT INTO public.colonias VALUES (540, 11, 'San Bartolo Ameyalco', '10010');
INSERT INTO public.colonias VALUES (541, 11, 'Cuauhtémoc', '10020');
INSERT INTO public.colonias VALUES (542, 11, 'El Maestro', '10130');
INSERT INTO public.colonias VALUES (543, 11, 'San Jerónimo Lídice', '10200');
INSERT INTO public.colonias VALUES (544, 11, 'San Bernabé Ocotepec', '10300');
INSERT INTO public.colonias VALUES (545, 11, 'El Tanque', '10320');
INSERT INTO public.colonias VALUES (546, 11, 'Las Cruces', '10330');
INSERT INTO public.colonias VALUES (547, 11, 'Los Padres', '10340');
INSERT INTO public.colonias VALUES (548, 11, 'Lomas de San Bernabé', '10350');
INSERT INTO public.colonias VALUES (549, 11, 'Huayatla', '10360');
INSERT INTO public.colonias VALUES (550, 11, 'Ampliación Potrerillo', '10368');
INSERT INTO public.colonias VALUES (551, 11, 'Ampliación Lomas de San Bernabé', '10369');
INSERT INTO public.colonias VALUES (552, 11, 'Tierra Unida', '10369');
INSERT INTO public.colonias VALUES (553, 12, 'Tlalpuente', '14460');
INSERT INTO public.colonias VALUES (554, 12, 'Plan de Ayala', '14470');
INSERT INTO public.colonias VALUES (555, 12, 'La Palma', '14476');
INSERT INTO public.colonias VALUES (556, 12, 'Viveros Coatectlán', '14479');
INSERT INTO public.colonias VALUES (557, 12, 'La Magdalena Petlacalco', '14480');
INSERT INTO public.colonias VALUES (558, 12, 'San Miguel Xicalco', '14490');
INSERT INTO public.colonias VALUES (559, 12, 'San Miguel Topilejo', '14500');
INSERT INTO public.colonias VALUES (560, 12, 'Valle Escondido', '14600');
INSERT INTO public.colonias VALUES (561, 12, 'Colinas del Bosque', '14608');
INSERT INTO public.colonias VALUES (562, 12, 'Las Tórtolas', '14609');
INSERT INTO public.colonias VALUES (563, 12, 'Arenal Tepepan', '14610');
INSERT INTO public.colonias VALUES (564, 12, 'Club de Golf México', '14620');
INSERT INTO public.colonias VALUES (565, 12, 'San Buenaventura', '14629');
INSERT INTO public.colonias VALUES (566, 12, 'Chimalcoyoc', '14630');
INSERT INTO public.colonias VALUES (567, 12, 'Villa Tlalpan', '14630');
INSERT INTO public.colonias VALUES (568, 12, 'Ejidos de San Pedro Mártir', '14640');
INSERT INTO public.colonias VALUES (569, 12, 'Tecoantitla Xolalpa', '14643');
INSERT INTO public.colonias VALUES (570, 12, 'Fuentes de Tepepan', '14643');
INSERT INTO public.colonias VALUES (571, 12, 'Valle de Tepepan', '14646');
INSERT INTO public.colonias VALUES (572, 12, 'Juventud Unida', '14647');
INSERT INTO public.colonias VALUES (573, 12, 'Movimiento Organizado de Tlalpan', '14647');
INSERT INTO public.colonias VALUES (574, 12, 'Rinconada El Mirador', '14647');
INSERT INTO public.colonias VALUES (575, 12, 'San Pedro Mártir', '14650');
INSERT INTO public.colonias VALUES (576, 12, 'Heróico Colegio Militar', '14653');
INSERT INTO public.colonias VALUES (577, 12, 'Dolores Tlalli', '14654');
INSERT INTO public.colonias VALUES (578, 12, 'Valle Verde', '14655');
INSERT INTO public.colonias VALUES (579, 12, 'Tlalmille', '14657');
INSERT INTO public.colonias VALUES (580, 12, 'Mirador del Valle', '14658');
INSERT INTO public.colonias VALUES (581, 12, 'María Esther Zuno de Echeverría', '14659');
INSERT INTO public.colonias VALUES (582, 12, 'San Miguel Ajusco', '14700');
INSERT INTO public.colonias VALUES (583, 12, 'Santo Tomas Ajusco', '14710');
INSERT INTO public.colonias VALUES (584, 12, 'Belvedere Ajusco', '14720');
INSERT INTO public.colonias VALUES (585, 12, 'Lomas de Cuilotepec', '14730');
INSERT INTO public.colonias VALUES (586, 12, 'El Zacatón', '14734');
INSERT INTO public.colonias VALUES (587, 12, 'Lomas de Cuilotepec II Sección', '14735');
INSERT INTO public.colonias VALUES (588, 12, 'Lomas de Tepemecatl', '14735');
INSERT INTO public.colonias VALUES (589, 12, 'Vistas del Pedregal', '14737');
INSERT INTO public.colonias VALUES (590, 12, 'Bosques del Pedregal', '14738');
INSERT INTO public.colonias VALUES (591, 12, '2 de Octubre', '14739');
INSERT INTO public.colonias VALUES (592, 12, 'Lomas de Padierna Sur', '14740');
INSERT INTO public.colonias VALUES (593, 12, 'Mirador I', '14748');
INSERT INTO public.colonias VALUES (594, 12, 'Mirador II', '14748');
INSERT INTO public.colonias VALUES (595, 12, 'Chimilli', '14749');
INSERT INTO public.colonias VALUES (596, 12, 'Héroes de 1910', '14760');
INSERT INTO public.colonias VALUES (597, 12, 'Parres El Guarda', '14900');
INSERT INTO public.colonias VALUES (598, 13, 'General Ignacio Zaragoza', '15000');
INSERT INTO public.colonias VALUES (599, 13, 'Valentín Gómez Farias', '15010');
INSERT INTO public.colonias VALUES (600, 13, 'Puebla', '15020');
INSERT INTO public.colonias VALUES (601, 13, 'Zona Centro', '15100');
INSERT INTO public.colonias VALUES (602, 13, 'Janitzio', '15200');
INSERT INTO public.colonias VALUES (603, 13, 'Valle Gómez', '15210');
INSERT INTO public.colonias VALUES (604, 13, 'Nicolás Bravo', '15220');
INSERT INTO public.colonias VALUES (605, 13, 'Popular Rastro', '15220');
INSERT INTO public.colonias VALUES (606, 13, 'Emilio Carranza', '15230');
INSERT INTO public.colonias VALUES (607, 13, 'Michoacana', '15240');
INSERT INTO public.colonias VALUES (608, 13, 'Ampliación Michoacana', '15250');
INSERT INTO public.colonias VALUES (609, 13, 'Ampliación 20 de Noviembre', '15260');
INSERT INTO public.colonias VALUES (610, 13, 'Morelos', '15270');
INSERT INTO public.colonias VALUES (611, 13, 'Penitenciaria', '15280');
INSERT INTO public.colonias VALUES (612, 13, '10 de Mayo', '15290');
INSERT INTO public.colonias VALUES (613, 13, '20 de Noviembre', '15300');
INSERT INTO public.colonias VALUES (614, 13, '5o Tramo 20 de Noviembre', '15309');
INSERT INTO public.colonias VALUES (615, 13, 'Felipe Ángeles', '15310');
INSERT INTO public.colonias VALUES (616, 13, 'Azteca', '15320');
INSERT INTO public.colonias VALUES (617, 13, 'Tres Mosqueteros', '15330');
INSERT INTO public.colonias VALUES (618, 13, 'Ampliación Venustiano Carranza', '15339');
INSERT INTO public.colonias VALUES (619, 13, 'Venustiano Carranza', '15340');
INSERT INTO public.colonias VALUES (620, 13, 'Ampliación Penitenciaria', '15350');
INSERT INTO public.colonias VALUES (621, 13, 'Progresista', '15370');
INSERT INTO public.colonias VALUES (622, 13, 'Escuela de Tiro', '15380');
INSERT INTO public.colonias VALUES (623, 13, '7 de Julio', '15390');
INSERT INTO public.colonias VALUES (624, 13, 'Romero Rubio', '15400');
INSERT INTO public.colonias VALUES (625, 13, 'Simón Bolívar', '15410');
INSERT INTO public.colonias VALUES (626, 13, 'Ampliación Simón Bolívar', '15420');
INSERT INTO public.colonias VALUES (627, 13, 'Aquiles Serdán', '15430');
INSERT INTO public.colonias VALUES (628, 13, '1° de Mayo', '15440');
INSERT INTO public.colonias VALUES (629, 13, 'Damián Carmona', '15450');
INSERT INTO public.colonias VALUES (630, 13, 'Revolución', '15460');
INSERT INTO public.colonias VALUES (631, 13, 'Miguel Hidalgo', '15470');
INSERT INTO public.colonias VALUES (632, 13, 'Moctezuma 1a Sección', '15500');
INSERT INTO public.colonias VALUES (633, 13, 'Pensador Mexicano', '15510');
INSERT INTO public.colonias VALUES (634, 13, 'Peñón de los Baños', '15520');
INSERT INTO public.colonias VALUES (635, 13, 'Moctezuma 2a Sección', '15530');
INSERT INTO public.colonias VALUES (636, 13, 'Santa Cruz Aviación', '15540');
INSERT INTO public.colonias VALUES (637, 13, 'Arenal 1a Sección', '15600');
INSERT INTO public.colonias VALUES (638, 13, 'Cuchilla Pantitlán', '15610');
INSERT INTO public.colonias VALUES (639, 13, 'México (Licenciado Benito Juárez)', '15620');
INSERT INTO public.colonias VALUES (640, 13, 'Caracol', '15630');
INSERT INTO public.colonias VALUES (641, 13, 'Arenal 4a Sección', '15640');
INSERT INTO public.colonias VALUES (642, 13, 'Arenal Puerto Aéreo', '15640');
INSERT INTO public.colonias VALUES (643, 13, 'Ampliación Caracol', '15650');
INSERT INTO public.colonias VALUES (644, 13, 'Arenal 3a Sección', '15660');
INSERT INTO public.colonias VALUES (645, 13, 'Adolfo López Mateos', '15670');
INSERT INTO public.colonias VALUES (646, 13, 'Arenal 2a Sección', '15680');
INSERT INTO public.colonias VALUES (647, 13, 'Federal', '15700');
INSERT INTO public.colonias VALUES (648, 13, 'Industrial Puerto Aéreo', '15710');
INSERT INTO public.colonias VALUES (649, 13, '4 Árboles', '15730');
INSERT INTO public.colonias VALUES (650, 13, 'Aviación Civil', '15740');
INSERT INTO public.colonias VALUES (651, 13, 'Ampliación Aviación Civil', '15750');
INSERT INTO public.colonias VALUES (652, 13, 'Jamaica', '15800');
INSERT INTO public.colonias VALUES (653, 13, 'Merced Balbuena', '15810');
INSERT INTO public.colonias VALUES (654, 14, 'San Lorenzo Atemoaya', '16400');
INSERT INTO public.colonias VALUES (655, 14, 'Lomas de Tonalco', '16410');
INSERT INTO public.colonias VALUES (656, 14, 'San Jerónimo', '16420');
INSERT INTO public.colonias VALUES (657, 14, 'El Jazmín', '16428');
INSERT INTO public.colonias VALUES (658, 14, 'Rancho Tejomulco', '16429');
INSERT INTO public.colonias VALUES (659, 14, 'Xochipilli', '16430');
INSERT INTO public.colonias VALUES (660, 14, 'Año de Juárez', '16440');
INSERT INTO public.colonias VALUES (661, 14, 'Pocitos', '16443');
INSERT INTO public.colonias VALUES (662, 14, 'Santa María Nativitas', '16450');
INSERT INTO public.colonias VALUES (663, 14, 'Lomas de Nativitas', '16457');
INSERT INTO public.colonias VALUES (664, 14, 'Ampliación Nativitas', '16459');
INSERT INTO public.colonias VALUES (665, 14, 'Santa Cruz Acalpixca', '16500');
INSERT INTO public.colonias VALUES (666, 14, 'Apatlaco', '16513');
INSERT INTO public.colonias VALUES (667, 14, 'Del Puente', '16513');
INSERT INTO public.colonias VALUES (668, 14, 'La Gallera', '16514');
INSERT INTO public.colonias VALUES (669, 14, 'Tetitla', '16514');
INSERT INTO public.colonias VALUES (670, 14, 'Calpulco', '16514');
INSERT INTO public.colonias VALUES (671, 14, 'La Planta', '16520');
INSERT INTO public.colonias VALUES (672, 14, 'Las Cruces', '16530');
INSERT INTO public.colonias VALUES (673, 14, 'Las Flores', '16530');
INSERT INTO public.colonias VALUES (674, 14, 'Ahualapa', '16533');
INSERT INTO public.colonias VALUES (675, 14, 'Valle de Santa María', '16550');
INSERT INTO public.colonias VALUES (676, 14, 'San Gregorio Atlapulco', '16600');
INSERT INTO public.colonias VALUES (677, 14, 'San Andrés', '16604');
INSERT INTO public.colonias VALUES (678, 14, 'Los Reyes', '16605');
INSERT INTO public.colonias VALUES (679, 14, '3 de Mayo', '16606');
INSERT INTO public.colonias VALUES (680, 14, 'San Antonio', '16607');
INSERT INTO public.colonias VALUES (681, 14, 'La Candelaria', '16609');
INSERT INTO public.colonias VALUES (682, 14, 'San Luis Tlaxialtemalco', '16610');
INSERT INTO public.colonias VALUES (683, 14, 'Niños Héroes', '16614');
INSERT INTO public.colonias VALUES (684, 14, 'La Asunción', '16615');
INSERT INTO public.colonias VALUES (685, 14, 'Santa Cecilia', '16616');
INSERT INTO public.colonias VALUES (686, 14, 'San Sebastián', '16617');
INSERT INTO public.colonias VALUES (687, 14, 'San José', '16620');
INSERT INTO public.colonias VALUES (688, 14, 'La Guadalupana', '16629');
INSERT INTO public.colonias VALUES (689, 14, 'San Juan', '16629');
INSERT INTO public.colonias VALUES (690, 14, 'San Juan Moyotepec', '16630');
INSERT INTO public.colonias VALUES (691, 14, 'San Juan Minas', '16640');
INSERT INTO public.colonias VALUES (692, 14, 'Quirino Mendoza', '16710');
INSERT INTO public.colonias VALUES (693, 14, 'Del Carmen', '16720');
INSERT INTO public.colonias VALUES (694, 14, 'San Isidro', '16739');
INSERT INTO public.colonias VALUES (695, 14, 'Guadalupita', '16740');
INSERT INTO public.colonias VALUES (696, 14, 'Las Animas', '16749');
INSERT INTO public.colonias VALUES (697, 14, 'Calyequita', '16750');
INSERT INTO public.colonias VALUES (698, 14, 'San Felipe', '16770');
INSERT INTO public.colonias VALUES (699, 14, 'Santiaguito', '16776');
INSERT INTO public.colonias VALUES (700, 14, 'El Mirador', '16776');
INSERT INTO public.colonias VALUES (701, 14, 'Cerrillos Primera Sección', '16780');
INSERT INTO public.colonias VALUES (702, 14, 'El Sacrificio', '16780');
INSERT INTO public.colonias VALUES (703, 14, 'Cristo Rey', '16780');
INSERT INTO public.colonias VALUES (704, 14, 'Cerrillos Segunda Sección', '16780');
INSERT INTO public.colonias VALUES (705, 14, 'Cerrillos Tercera Sección', '16780');
INSERT INTO public.colonias VALUES (706, 14, 'Nativitas', '16797');
INSERT INTO public.colonias VALUES (707, 14, 'Las Mesitas', '16799');
INSERT INTO public.colonias VALUES (708, 14, 'San Mateo Xalpa', '16800');
INSERT INTO public.colonias VALUES (709, 14, 'San Andrés Ahuayucan', '16810');
INSERT INTO public.colonias VALUES (710, 14, 'Santa Inés', '16810');
INSERT INTO public.colonias VALUES (711, 14, 'Rosario Tlali', '16810');
INSERT INTO public.colonias VALUES (712, 14, 'El Calvario', '16813');
INSERT INTO public.colonias VALUES (713, 1, 'Lomas de Chamontoya', '1857');
INSERT INTO public.colonias VALUES (714, 1, 'Tlacoyaque', '1859');
INSERT INTO public.colonias VALUES (715, 1, 'Lomas de La Era', '1860');
INSERT INTO public.colonias VALUES (716, 1, 'Lomas del Capulín', '1863');
INSERT INTO public.colonias VALUES (717, 1, 'Lomas de los Cedros', '1870');
INSERT INTO public.colonias VALUES (718, 1, 'Jardines del Pedregal', '1900');
INSERT INTO public.colonias VALUES (719, 1, 'San Jerónimo Aculco', '1904');
INSERT INTO public.colonias VALUES (720, 15, 'Centro de Azcapotzalco', '2000');
INSERT INTO public.colonias VALUES (721, 15, 'Los Reyes', '2010');
INSERT INTO public.colonias VALUES (722, 15, 'San Rafael', '2010');
INSERT INTO public.colonias VALUES (723, 15, 'Nuevo Barrio San Rafael', '2010');
INSERT INTO public.colonias VALUES (724, 15, 'San Marcos', '2020');
INSERT INTO public.colonias VALUES (725, 15, 'Santo Tomás', '2020');
INSERT INTO public.colonias VALUES (726, 15, 'Del Maestro', '2040');
INSERT INTO public.colonias VALUES (727, 15, 'San Sebastián', '2040');
INSERT INTO public.colonias VALUES (728, 15, 'Libertad', '2050');
INSERT INTO public.colonias VALUES (729, 15, 'Santa María Malinalco', '2050');
INSERT INTO public.colonias VALUES (730, 15, 'Sindicato Mexicano de Electricistas', '2060');
INSERT INTO public.colonias VALUES (731, 15, 'Un Hogar Para Cada Trabajador', '2060');
INSERT INTO public.colonias VALUES (732, 15, 'Del Recreo', '2070');
INSERT INTO public.colonias VALUES (733, 15, 'Nextengo', '2070');
INSERT INTO public.colonias VALUES (734, 15, 'Clavería', '2080');
INSERT INTO public.colonias VALUES (735, 15, 'Sector Naval', '2080');
INSERT INTO public.colonias VALUES (736, 15, 'San Álvaro', '2090');
INSERT INTO public.colonias VALUES (737, 15, 'Ángel Zimbrón', '2099');
INSERT INTO public.colonias VALUES (738, 15, 'El Rosario', '2100');
INSERT INTO public.colonias VALUES (739, 15, 'San Martín Xochinahuac', '2120');
INSERT INTO public.colonias VALUES (740, 15, 'Nueva El Rosario', '2128');
INSERT INTO public.colonias VALUES (741, 15, 'Nueva España', '2129');
INSERT INTO public.colonias VALUES (742, 15, 'Tierra Nueva', '2130');
INSERT INTO public.colonias VALUES (743, 15, 'Santa Inés', '2140');
INSERT INTO public.colonias VALUES (744, 15, 'Pasteros', '2150');
INSERT INTO public.colonias VALUES (745, 15, 'Santo Domingo', '2160');
INSERT INTO public.colonias VALUES (746, 15, 'Reynosa Tamaulipas', '2200');
INSERT INTO public.colonias VALUES (747, 15, 'Santa Bárbara', '2230');
INSERT INTO public.colonias VALUES (748, 15, 'San Andrés', '2240');
INSERT INTO public.colonias VALUES (750, 15, 'Santa Catarina', '2250');
INSERT INTO public.colonias VALUES (751, 15, 'Industrial Vallejo', '2300');
INSERT INTO public.colonias VALUES (752, 15, 'Ferrería', '2310');
INSERT INTO public.colonias VALUES (753, 15, 'San Andrés de las Salinas', '2320');
INSERT INTO public.colonias VALUES (754, 15, 'Huautla de las Salinas', '2330');
INSERT INTO public.colonias VALUES (755, 15, 'Santa Cruz de las Salinas', '2340');
INSERT INTO public.colonias VALUES (756, 15, 'Las Salinas', '2360');
INSERT INTO public.colonias VALUES (757, 15, 'San Juan Tlihuaca', '2400');
INSERT INTO public.colonias VALUES (758, 15, 'Prados del Rosario', '2410');
INSERT INTO public.colonias VALUES (759, 15, 'Ex-Hacienda El Rosario', '2420');
INSERT INTO public.colonias VALUES (760, 15, 'Providencia', '2440');
INSERT INTO public.colonias VALUES (761, 15, 'Tezozomoc', '2459');
INSERT INTO public.colonias VALUES (762, 15, 'La Preciosa', '2460');
INSERT INTO public.colonias VALUES (763, 15, 'Ampliación Petrolera', '2470');
INSERT INTO public.colonias VALUES (764, 10, 'Santa Ana', '13060');
INSERT INTO public.colonias VALUES (765, 10, 'La Magdalena', '13070');
INSERT INTO public.colonias VALUES (766, 10, 'San Miguel', '13070');
INSERT INTO public.colonias VALUES (767, 10, 'Los Reyes', '13080');
INSERT INTO public.colonias VALUES (768, 10, 'Quiahuatla', '13090');
INSERT INTO public.colonias VALUES (769, 10, 'San Sebastián', '13093');
INSERT INTO public.colonias VALUES (770, 10, 'San Isidro', '13094');
INSERT INTO public.colonias VALUES (771, 10, 'San Andrés', '13099');
INSERT INTO public.colonias VALUES (773, 10, 'Ampliación Santa Catarina', '13120');
INSERT INTO public.colonias VALUES (774, 10, 'Santiago', '13120');
INSERT INTO public.colonias VALUES (775, 10, 'La Concepción', '13150');
INSERT INTO public.colonias VALUES (777, 10, 'Miguel Hidalgo', '13200');
INSERT INTO public.colonias VALUES (778, 10, 'Los Olivos', '13210');
INSERT INTO public.colonias VALUES (779, 10, 'Las Arboledas', '13219');
INSERT INTO public.colonias VALUES (780, 10, 'Ampliación Los Olivos', '13219');
INSERT INTO public.colonias VALUES (781, 10, 'La Nopalera', '13220');
INSERT INTO public.colonias VALUES (782, 10, 'Granjas Cabrera', '13230');
INSERT INTO public.colonias VALUES (783, 10, 'La Turba', '13250');
INSERT INTO public.colonias VALUES (784, 10, 'Del Mar', '13270');
INSERT INTO public.colonias VALUES (785, 10, 'La Draga', '13273');
INSERT INTO public.colonias VALUES (786, 10, 'Villa Centroamericana', '13278');
INSERT INTO public.colonias VALUES (787, 10, 'Agrícola Metropolitana', '13280');
INSERT INTO public.colonias VALUES (788, 10, 'Santa Ana Centro', '13300');
INSERT INTO public.colonias VALUES (789, 10, 'Santiago Centro', '13300');
INSERT INTO public.colonias VALUES (790, 10, 'Santa Ana Poniente', '13300');
INSERT INTO public.colonias VALUES (791, 10, 'Santa Ana Norte', '13300');
INSERT INTO public.colonias VALUES (792, 10, 'Santiago Norte', '13300');
INSERT INTO public.colonias VALUES (793, 10, 'Zapotitla', '13310');
INSERT INTO public.colonias VALUES (794, 10, 'Ampliación Zapotitla', '13315');
INSERT INTO public.colonias VALUES (795, 10, 'La Estación', '13319');
INSERT INTO public.colonias VALUES (796, 10, 'La Conchita Zapotitlán', '13360');
INSERT INTO public.colonias VALUES (797, 10, 'Santa Ana Sur', '13360');
INSERT INTO public.colonias VALUES (798, 10, 'Santiago Sur', '13360');
INSERT INTO public.colonias VALUES (799, 10, 'San Francisco Tlaltenco', '13400');
INSERT INTO public.colonias VALUES (800, 10, 'López Portillo', '13410');
INSERT INTO public.colonias VALUES (801, 10, 'Ampliación José López Portillo', '13419');
INSERT INTO public.colonias VALUES (802, 10, 'Selene', '13420');
INSERT INTO public.colonias VALUES (803, 10, 'Ampliación Selene', '13430');
INSERT INTO public.colonias VALUES (804, 10, 'Zacatenco', '13440');
INSERT INTO public.colonias VALUES (805, 10, 'Guadalupe Tlaltenco', '13450');
INSERT INTO public.colonias VALUES (806, 10, 'Ojo de Agua', '13450');
INSERT INTO public.colonias VALUES (807, 10, 'El Triángulo', '13460');
INSERT INTO public.colonias VALUES (808, 10, 'San Agustín', '13508');
INSERT INTO public.colonias VALUES (809, 10, 'La Soledad', '13508');
INSERT INTO public.colonias VALUES (811, 10, 'La Lupita', '13510');
INSERT INTO public.colonias VALUES (812, 10, 'Francisco Villa', '13520');
INSERT INTO public.colonias VALUES (813, 10, 'Jaime Torres Bodet', '13530');
INSERT INTO public.colonias VALUES (815, 10, 'El Rosario', '13540');
INSERT INTO public.colonias VALUES (816, 10, 'Tierra Blanca', '13540');
INSERT INTO public.colonias VALUES (817, 10, 'Ampliación La Conchita', '13545');
INSERT INTO public.colonias VALUES (818, 10, 'Peña Alta', '13549');
INSERT INTO public.colonias VALUES (819, 10, 'Jardines del Llano', '13550');
INSERT INTO public.colonias VALUES (820, 10, 'Potrero del Llano', '13550');
INSERT INTO public.colonias VALUES (821, 14, 'Santa Cruz Chavarrieta', '16840');
INSERT INTO public.colonias VALUES (822, 14, 'Chapultepec', '16850');
INSERT INTO public.colonias VALUES (823, 14, 'Santa Cruz de Guadalupe', '16860');
INSERT INTO public.colonias VALUES (824, 14, 'Santa Cecilia Tepetlapa', '16880');
INSERT INTO public.colonias VALUES (825, 14, 'San Francisco Tlalnepantla', '16900');
INSERT INTO public.colonias VALUES (826, 6, 'Manzanastitla', '5270');
INSERT INTO public.colonias VALUES (827, 6, 'Adolfo López Mateos', '5280');
INSERT INTO public.colonias VALUES (828, 6, 'El Molinito', '5310');
INSERT INTO public.colonias VALUES (829, 6, 'El Yaqui', '5320');
INSERT INTO public.colonias VALUES (830, 6, 'Lomas de Memetla', '5330');
INSERT INTO public.colonias VALUES (831, 6, 'Memetla', '5330');
INSERT INTO public.colonias VALUES (832, 6, 'Ampliación Memetla', '5330');
INSERT INTO public.colonias VALUES (833, 6, 'Ampliación el Yaqui', '5330');
INSERT INTO public.colonias VALUES (834, 6, 'Santa Fe Cuajimalpa', '5348');
INSERT INTO public.colonias VALUES (835, 6, 'Locaxco', '5360');
INSERT INTO public.colonias VALUES (836, 6, 'Las Tinajas', '5370');
INSERT INTO public.colonias VALUES (837, 6, 'Lomas de San Pedro', '5379');
INSERT INTO public.colonias VALUES (838, 6, 'El Tianguillo', '5400');
INSERT INTO public.colonias VALUES (839, 6, 'San Lorenzo Acopilco', '5410');
INSERT INTO public.colonias VALUES (840, 6, '1° de Mayo', '5410');
INSERT INTO public.colonias VALUES (841, 6, 'Contadero', '5500');
INSERT INTO public.colonias VALUES (842, 6, 'La Venta', '5520');
INSERT INTO public.colonias VALUES (843, 6, 'Abdías García Soto', '5530');
INSERT INTO public.colonias VALUES (844, 6, 'San Mateo Tlaltenango', '5600');
INSERT INTO public.colonias VALUES (845, 6, 'Santa Rosa Xochiac', '5610');
INSERT INTO public.colonias VALUES (846, 6, 'Cruz Blanca', '5700');
INSERT INTO public.colonias VALUES (847, 6, 'Las Maromas', '5710');
INSERT INTO public.colonias VALUES (848, 6, 'Xalpa', '5730');
INSERT INTO public.colonias VALUES (849, 6, 'La Pila', '5750');
INSERT INTO public.colonias VALUES (850, 6, 'Las Lajas', '5760');
INSERT INTO public.colonias VALUES (851, 6, 'Agua Bendita', '5780');
INSERT INTO public.colonias VALUES (852, 6, 'Puerto Las Cruces', '5790');
INSERT INTO public.colonias VALUES (853, 4, 'Centro (Área 1)', '6000');
INSERT INTO public.colonias VALUES (854, 4, 'Centro (Área 2)', '6010');
INSERT INTO public.colonias VALUES (855, 4, 'Centro (Área 3)', '6020');
INSERT INTO public.colonias VALUES (856, 4, 'Tabacalera', '6030');
INSERT INTO public.colonias VALUES (857, 4, 'Centro (Área 4)', '6040');
INSERT INTO public.colonias VALUES (858, 4, 'Centro (Área 5)', '6050');
INSERT INTO public.colonias VALUES (859, 4, 'Centro (Área 6)', '6060');
INSERT INTO public.colonias VALUES (860, 4, 'Centro (Área 7)', '6070');
INSERT INTO public.colonias VALUES (861, 4, 'Centro (Área 8)', '6080');
INSERT INTO public.colonias VALUES (862, 4, 'Centro (Área 9)', '6090');
INSERT INTO public.colonias VALUES (863, 4, 'Hipódromo', '6100');
INSERT INTO public.colonias VALUES (864, 4, 'Condesa', '6140');
INSERT INTO public.colonias VALUES (865, 4, 'Hipódromo Condesa', '6170');
INSERT INTO public.colonias VALUES (866, 4, 'Morelos', '6200');
INSERT INTO public.colonias VALUES (867, 4, 'Peralvillo', '6220');
INSERT INTO public.colonias VALUES (868, 4, 'Valle Gómez', '6240');
INSERT INTO public.colonias VALUES (869, 4, 'Ex-Hipódromo de Peralvillo', '6250');
INSERT INTO public.colonias VALUES (870, 4, 'Maza', '6270');
INSERT INTO public.colonias VALUES (871, 4, 'Felipe Pescador', '6280');
INSERT INTO public.colonias VALUES (872, 4, 'Guerrero', '6300');
INSERT INTO public.colonias VALUES (873, 4, 'Buenavista', '6350');
INSERT INTO public.colonias VALUES (874, 4, 'Santa María la Ribera', '6400');
INSERT INTO public.colonias VALUES (875, 4, 'Santa María Insurgentes', '6430');
INSERT INTO public.colonias VALUES (876, 4, 'Atlampa', '6450');
INSERT INTO public.colonias VALUES (877, 4, 'San Rafael', '6470');
INSERT INTO public.colonias VALUES (878, 4, 'Cuauhtémoc', '6500');
INSERT INTO public.colonias VALUES (879, 4, 'Juárez', '6600');
INSERT INTO public.colonias VALUES (880, 4, 'Roma Norte', '6700');
INSERT INTO public.colonias VALUES (881, 3, 'Parque San Andrés', '4040');
INSERT INTO public.colonias VALUES (882, 3, 'Del Carmen', '4100');
INSERT INTO public.colonias VALUES (883, 3, 'San Diego Churubusco', '4120');
INSERT INTO public.colonias VALUES (884, 3, 'San Mateo', '4120');
INSERT INTO public.colonias VALUES (885, 3, 'Campestre Churubusco', '4200');
INSERT INTO public.colonias VALUES (886, 3, 'Churubusco Country Club', '4210');
INSERT INTO public.colonias VALUES (887, 3, 'Prado Churubusco', '4230');
INSERT INTO public.colonias VALUES (888, 3, 'Hermosillo', '4240');
INSERT INTO public.colonias VALUES (889, 3, 'Paseos de Taxqueña', '4250');
INSERT INTO public.colonias VALUES (890, 3, 'San Francisco Culhuacán Barrio de San Francisco', '4260');
INSERT INTO public.colonias VALUES (891, 3, 'San Francisco Culhuacán Barrio de La Magdalena', '4260');
INSERT INTO public.colonias VALUES (892, 3, 'San Francisco Culhuacán Barrio de Santa Ana', '4260');
INSERT INTO public.colonias VALUES (893, 3, 'San Francisco Culhuacán Barrio de San Juan', '4260');
INSERT INTO public.colonias VALUES (894, 3, 'Ajusco', '4300');
INSERT INTO public.colonias VALUES (895, 3, 'Romero de Terreros', '4310');
INSERT INTO public.colonias VALUES (896, 3, 'Oxtopulco Universidad', '4318');
INSERT INTO public.colonias VALUES (897, 3, 'Cuadrante de San Francisco', '4320');
INSERT INTO public.colonias VALUES (898, 3, 'Pedregal de San Francisco', '4320');
INSERT INTO public.colonias VALUES (899, 3, 'El Rosedal', '4330');
INSERT INTO public.colonias VALUES (900, 3, 'Los Reyes', '4330');
INSERT INTO public.colonias VALUES (901, 3, 'Del Niño Jesús', '4330');
INSERT INTO public.colonias VALUES (902, 3, 'Copilco El Bajo', '4340');
INSERT INTO public.colonias VALUES (903, 3, 'Copilco El Alto', '4360');
INSERT INTO public.colonias VALUES (904, 3, 'Copilco Universidad', '4360');
INSERT INTO public.colonias VALUES (905, 3, 'Pedregal de Santo Domingo', '4369');
INSERT INTO public.colonias VALUES (906, 3, 'Atlántida', '4370');
INSERT INTO public.colonias VALUES (907, 3, 'Ciudad Jardín', '4370');
INSERT INTO public.colonias VALUES (908, 3, 'El Rosario', '4380');
INSERT INTO public.colonias VALUES (909, 3, 'La Candelaria', '4380');
INSERT INTO public.colonias VALUES (910, 3, 'Huayamilpas', '4390');
INSERT INTO public.colonias VALUES (911, 3, 'Nueva Díaz Ordaz', '4390');
INSERT INTO public.colonias VALUES (912, 3, 'Educación', '4400');
INSERT INTO public.colonias VALUES (913, 3, 'Petrolera Taxqueña', '4410');
INSERT INTO public.colonias VALUES (914, 3, 'Ex-Ejido de San Francisco Culhuacán', '4420');
INSERT INTO public.colonias VALUES (915, 3, 'Culhuacán CTM Sección V', '4440');
INSERT INTO public.colonias VALUES (916, 3, 'Culhuacán CTM Sección II', '4440');
INSERT INTO public.colonias VALUES (917, 3, 'Culhuacán CTM Sección I', '4440');
INSERT INTO public.colonias VALUES (918, 3, 'El Centinela', '4450');
INSERT INTO public.colonias VALUES (919, 3, 'Avante', '4460');
INSERT INTO public.colonias VALUES (920, 3, 'Presidentes Ejidales 1a Sección', '4470');
INSERT INTO public.colonias VALUES (921, 3, 'Presidentes Ejidales 2a Sección', '4470');
INSERT INTO public.colonias VALUES (922, 3, 'Culhuacán CTM Sección VI', '4480');
INSERT INTO public.colonias VALUES (923, 3, 'Culhuacán CTM Sección III', '4480');
INSERT INTO public.colonias VALUES (924, 3, 'Culhuacán CTM CROC', '4480');
INSERT INTO public.colonias VALUES (925, 3, 'Culhuacán CTM Sección X-A', '4480');
INSERT INTO public.colonias VALUES (926, 3, 'Culhuacán CTM Sección VII', '4489');
INSERT INTO public.colonias VALUES (927, 3, 'Culhuacán CTM Sección Piloto', '4490');
INSERT INTO public.colonias VALUES (928, 3, 'Culhuacán CTM Canal Nacional', '4490');
INSERT INTO public.colonias VALUES (929, 3, 'Jardines del Pedregal de San Ángel', '4500');
INSERT INTO public.colonias VALUES (930, 3, 'Universidad Nacional Autónoma de México', '4510');
INSERT INTO public.colonias VALUES (931, 3, 'La Otra Banda', '4519');
INSERT INTO public.colonias VALUES (932, 3, 'Insurgentes Cuicuilco', '4530');
INSERT INTO public.colonias VALUES (933, 3, 'Pedregal de Santa Úrsula', '4600');
INSERT INTO public.colonias VALUES (934, 3, 'Xotepingo', '4610');
INSERT INTO public.colonias VALUES (935, 3, 'San Pablo Tepetlapa', '4620');
INSERT INTO public.colonias VALUES (936, 3, 'Adolfo Ruiz Cortínes', '4630');
INSERT INTO public.colonias VALUES (937, 5, 'Ampliación Cocoyotes', '7180');
INSERT INTO public.colonias VALUES (938, 5, '6 de Junio', '7183');
INSERT INTO public.colonias VALUES (939, 5, 'Vista Hermosa', '7187');
INSERT INTO public.colonias VALUES (940, 5, 'Tlalpexco', '7188');
INSERT INTO public.colonias VALUES (941, 5, 'Ahuehuetes', '7189');
INSERT INTO public.colonias VALUES (942, 5, 'Valle de Madero', '7190');
INSERT INTO public.colonias VALUES (943, 5, 'Del Carmen', '7199');
INSERT INTO public.colonias VALUES (944, 5, 'Cuautepec de Madero', '7200');
INSERT INTO public.colonias VALUES (945, 5, 'Del Bosque', '7207');
INSERT INTO public.colonias VALUES (946, 5, 'Guadalupe Victoria Cuautepec', '7209');
INSERT INTO public.colonias VALUES (947, 5, 'Chalma de Guadalupe', '7210');
INSERT INTO public.colonias VALUES (948, 5, 'Ampliación Chalma de Guadalupe', '7214');
INSERT INTO public.colonias VALUES (949, 5, 'Castillo Chico', '7220');
INSERT INTO public.colonias VALUES (950, 5, 'Castillo Grande', '7220');
INSERT INTO public.colonias VALUES (951, 5, 'Ampliación Castillo Grande', '7224');
INSERT INTO public.colonias VALUES (952, 5, 'Zona Escolar', '7230');
INSERT INTO public.colonias VALUES (953, 5, 'Zona Escolar Oriente', '7239');
INSERT INTO public.colonias VALUES (954, 5, 'El Arbolillo', '7240');
INSERT INTO public.colonias VALUES (955, 5, 'Benito Juárez', '7250');
INSERT INTO public.colonias VALUES (956, 5, 'Ampliación Benito Juárez', '7259');
INSERT INTO public.colonias VALUES (957, 5, 'Solidaridad Nacional', '7268');
INSERT INTO public.colonias VALUES (958, 5, 'Residencial Acueducto de Guadalupe', '7270');
INSERT INTO public.colonias VALUES (959, 5, 'Acueducto de Guadalupe', '7279');
INSERT INTO public.colonias VALUES (960, 5, 'Jorge Negrete', '7280');
INSERT INTO public.colonias VALUES (961, 5, 'La Pastora', '7290');
INSERT INTO public.colonias VALUES (962, 5, 'Lindavista Norte', '7300');
INSERT INTO public.colonias VALUES (963, 5, 'Lindavista Sur', '7300');
INSERT INTO public.colonias VALUES (964, 5, 'Candelaria Ticomán', '7310');
INSERT INTO public.colonias VALUES (965, 5, 'La Purísima Ticomán', '7320');
INSERT INTO public.colonias VALUES (966, 5, 'Residencial la Escalera', '7320');
INSERT INTO public.colonias VALUES (967, 5, 'Santa María Ticomán', '7330');
INSERT INTO public.colonias VALUES (968, 5, 'La Laguna Ticomán', '7340');
INSERT INTO public.colonias VALUES (969, 5, 'San José Ticomán', '7340');
INSERT INTO public.colonias VALUES (970, 5, 'Guadalupe Ticomán', '7350');
INSERT INTO public.colonias VALUES (971, 5, 'San Juan y Guadalupe Ticomán', '7350');
INSERT INTO public.colonias VALUES (972, 5, 'San Rafael Ticomán', '7359');
INSERT INTO public.colonias VALUES (973, 5, 'San Pedro Zacatenco', '7360');
INSERT INTO public.colonias VALUES (974, 5, 'Residencial Zacatenco', '7369');
INSERT INTO public.colonias VALUES (975, 5, 'Capultitlan', '7370');
INSERT INTO public.colonias VALUES (976, 5, 'Maximino Ávila Camacho', '7380');
INSERT INTO public.colonias VALUES (977, 5, 'Tlacamaca', '7380');
INSERT INTO public.colonias VALUES (978, 5, 'Salvador Díaz Mirón', '7400');
INSERT INTO public.colonias VALUES (979, 5, 'Juan González Romero', '7410');
INSERT INTO public.colonias VALUES (980, 5, 'Villa Hermosa', '7410');
INSERT INTO public.colonias VALUES (981, 5, 'El Coyol', '7420');
INSERT INTO public.colonias VALUES (982, 5, 'Nueva Atzacoalco', '7420');
INSERT INTO public.colonias VALUES (983, 5, 'Del Obrero', '7430');
INSERT INTO public.colonias VALUES (984, 5, 'Vasco de Quiroga', '7440');
INSERT INTO public.colonias VALUES (985, 5, 'DM Nacional', '7450');
INSERT INTO public.colonias VALUES (986, 5, 'Ferrocarrilera', '7455');
INSERT INTO public.colonias VALUES (987, 5, 'LI Legislatura', '7456');
INSERT INTO public.colonias VALUES (988, 5, 'Granjas Modernas', '7460');
INSERT INTO public.colonias VALUES (989, 5, 'Constitución de la República', '7469');
INSERT INTO public.colonias VALUES (990, 5, 'Ampliación San Juan de Aragón', '7470');
INSERT INTO public.colonias VALUES (991, 5, 'San Pedro El Chico', '7480');
INSERT INTO public.colonias VALUES (992, 5, 'La Pradera', '7500');
INSERT INTO public.colonias VALUES (993, 7, 'San Miguel', '9360');
INSERT INTO public.colonias VALUES (994, 7, 'Ampliación San Miguel', '9360');
INSERT INTO public.colonias VALUES (995, 7, 'San Juanico Nextipac', '9400');
INSERT INTO public.colonias VALUES (996, 7, 'El Sifón', '9400');
INSERT INTO public.colonias VALUES (997, 7, 'Aculco', '9410');
INSERT INTO public.colonias VALUES (998, 7, 'Jardines de Churubusco', '9410');
INSERT INTO public.colonias VALUES (999, 7, 'Magdalena Atlazolpa', '9410');
INSERT INTO public.colonias VALUES (1000, 7, 'San José Aculco', '9410');
INSERT INTO public.colonias VALUES (1001, 7, 'Los Picos VI-B', '9420');
INSERT INTO public.colonias VALUES (1002, 7, 'Nueva Rosita', '9420');
INSERT INTO public.colonias VALUES (1003, 7, 'Purísima Atlazolpa', '9429');
INSERT INTO public.colonias VALUES (1004, 7, 'Apatlaco', '9430');
INSERT INTO public.colonias VALUES (1005, 7, 'El Triunfo', '9430');
INSERT INTO public.colonias VALUES (1006, 7, 'Ampliación El Triunfo', '9438');
INSERT INTO public.colonias VALUES (1007, 7, 'El Retoño', '9440');
INSERT INTO public.colonias VALUES (1008, 7, 'San Andrés Tetepilco', '9440');
INSERT INTO public.colonias VALUES (1009, 7, 'Zacahuitzco', '9440');
INSERT INTO public.colonias VALUES (1010, 7, 'Banjidal', '9450');
INSERT INTO public.colonias VALUES (1011, 7, 'Justo Sierra', '9460');
INSERT INTO public.colonias VALUES (1012, 7, 'Sinatel', '9470');
INSERT INTO public.colonias VALUES (1013, 7, 'Ampliación Sinatel', '9479');
INSERT INTO public.colonias VALUES (1014, 7, 'El Prado', '9480');
INSERT INTO public.colonias VALUES (1015, 7, 'Santa María Aztahuacán', '9500');
INSERT INTO public.colonias VALUES (1016, 7, 'Santa María Aztahuacán Ampliación', '9500');
INSERT INTO public.colonias VALUES (1017, 7, 'Santa Martha Acatitla', '9510');
INSERT INTO public.colonias VALUES (1018, 7, 'El Edén', '9520');
INSERT INTO public.colonias VALUES (1019, 7, 'San Sebastián Tecoloxtitla', '9520');
INSERT INTO public.colonias VALUES (1020, 7, 'Santa Martha Acatitla Sur', '9530');
INSERT INTO public.colonias VALUES (1021, 7, 'Monte Alban', '9550');
INSERT INTO public.colonias VALUES (1022, 7, 'Paraje Zacatepec', '9560');
INSERT INTO public.colonias VALUES (1024, 7, 'Ejército de Agua Prieta', '9578');
INSERT INTO public.colonias VALUES (1025, 7, 'Santiago Acahualtepec', '9600');
INSERT INTO public.colonias VALUES (1026, 7, 'Santiago Acahualtepec 1ra. Ampliación', '9608');
INSERT INTO public.colonias VALUES (1027, 7, 'Santiago Acahualtepec 2a. Ampliación', '9609');
INSERT INTO public.colonias VALUES (1028, 7, 'Lomas de Zaragoza', '9620');
INSERT INTO public.colonias VALUES (1029, 7, 'San Miguel Teotongo Sección Corrales', '9630');
INSERT INTO public.colonias VALUES (1030, 7, 'San Miguel Teotongo Sección Acorralado', '9630');
INSERT INTO public.colonias VALUES (1031, 7, 'San Miguel Teotongo Sección Avisadero', '9630');
INSERT INTO public.colonias VALUES (1032, 7, 'San Miguel Teotongo Sección Capilla', '9630');
INSERT INTO public.colonias VALUES (1033, 7, 'San Miguel Teotongo Sección Guadalupe', '9630');
INSERT INTO public.colonias VALUES (1034, 7, 'San Miguel Teotongo Sección Iztlahuaca', '9630');
INSERT INTO public.colonias VALUES (1035, 7, 'San Miguel Teotongo Sección Jardines', '9630');
INSERT INTO public.colonias VALUES (1036, 7, 'San Miguel Teotongo Sección La Cruz', '9630');
INSERT INTO public.colonias VALUES (1037, 7, 'San Miguel Teotongo Sección Loma Alta', '9630');
INSERT INTO public.colonias VALUES (1038, 7, 'San Miguel Teotongo Sección Mercedes', '9630');
INSERT INTO public.colonias VALUES (1039, 7, 'San Miguel Teotongo Sección Palmitas', '9630');
INSERT INTO public.colonias VALUES (1040, 7, 'San Miguel Teotongo Sección Puente', '9630');
INSERT INTO public.colonias VALUES (1041, 7, 'San Miguel Teotongo Sección Ranchito', '9630');
INSERT INTO public.colonias VALUES (1042, 7, 'San Miguel Teotongo Sección Rancho Bajo', '9630');
INSERT INTO public.colonias VALUES (1043, 7, 'San Miguel Teotongo Sección Torres', '9630');
INSERT INTO public.colonias VALUES (1044, 7, 'Campestre Potrero', '9637');
INSERT INTO public.colonias VALUES (1045, 7, 'Ampliación Emiliano Zapata', '9638');
INSERT INTO public.colonias VALUES (1046, 7, 'Lomas de la Estancia', '9640');
INSERT INTO public.colonias VALUES (1047, 7, 'Xalpa', '9640');
INSERT INTO public.colonias VALUES (1048, 5, 'La Joya', '7890');
INSERT INTO public.colonias VALUES (1049, 5, 'Nueva Tenochtitlán', '7890');
INSERT INTO public.colonias VALUES (1050, 5, 'La Malinche', '7899');
INSERT INTO public.colonias VALUES (1051, 5, 'Cuchilla del Tesoro', '7900');
INSERT INTO public.colonias VALUES (1052, 5, 'San Juan de Aragón VII Sección', '7910');
INSERT INTO public.colonias VALUES (1053, 5, 'San Juan de Aragón VI Sección', '7918');
INSERT INTO public.colonias VALUES (1054, 5, 'Ex Ejido San Juan de Aragón Sector 32', '7919');
INSERT INTO public.colonias VALUES (1055, 5, 'El Olivo', '7920');
INSERT INTO public.colonias VALUES (1056, 5, 'San Juan de Aragón', '7920');
INSERT INTO public.colonias VALUES (1057, 5, 'Indeco', '7930');
INSERT INTO public.colonias VALUES (1058, 5, 'Héroes de Chapultepec', '7939');
INSERT INTO public.colonias VALUES (1059, 5, 'Ex Ejido San Juan de Aragón Sector 33', '7940');
INSERT INTO public.colonias VALUES (1061, 5, 'Héroes de Cerro Prieto', '7960');
INSERT INTO public.colonias VALUES (1062, 5, 'Ex Escuela de Tiro', '7960');
INSERT INTO public.colonias VALUES (1063, 5, 'Fernando Casas Alemán', '7960');
INSERT INTO public.colonias VALUES (1064, 5, 'San Juan de Aragón I Sección', '7969');
INSERT INTO public.colonias VALUES (1065, 5, 'San Juan de Aragón II Sección', '7969');
INSERT INTO public.colonias VALUES (1066, 5, 'San Juan de Aragón III Sección', '7970');
INSERT INTO public.colonias VALUES (1067, 5, 'San Juan de Aragón IV Sección', '7979');
INSERT INTO public.colonias VALUES (1068, 5, 'San Juan de Aragón V Sección', '7979');
INSERT INTO public.colonias VALUES (1069, 5, 'Narciso Bassols', '7980');
INSERT INTO public.colonias VALUES (1070, 5, 'C.T.M. Aragón', '7990');
INSERT INTO public.colonias VALUES (1071, 16, 'Gabriel Ramos Millán Sección Bramadero', '8000');
INSERT INTO public.colonias VALUES (1072, 16, 'Ex-Ejido de La Magdalena Mixiuhca', '8010');
INSERT INTO public.colonias VALUES (1073, 16, 'Ampliación Gabriel Ramos Millán', '8020');
INSERT INTO public.colonias VALUES (1074, 16, 'Gabriel Ramos Millán Sección Cuchilla', '8030');
INSERT INTO public.colonias VALUES (1075, 16, 'Carlos Zapata Vela', '8040');
INSERT INTO public.colonias VALUES (1076, 16, 'Agrícola Pantitlán', '8100');
INSERT INTO public.colonias VALUES (1077, 16, 'Viaducto Piedad', '8200');
INSERT INTO public.colonias VALUES (1078, 16, 'Nueva Santa Anita', '8210');
INSERT INTO public.colonias VALUES (1079, 16, 'San Pedro', '8220');
INSERT INTO public.colonias VALUES (1080, 16, 'San Francisco Xicaltongo', '8230');
INSERT INTO public.colonias VALUES (1081, 16, 'Santiago Norte', '8240');
INSERT INTO public.colonias VALUES (1082, 16, 'Santa Anita', '8300');
INSERT INTO public.colonias VALUES (1083, 16, 'La Cruz', '8310');
INSERT INTO public.colonias VALUES (1084, 16, 'Fraccionamiento Coyuya', '8320');
INSERT INTO public.colonias VALUES (1085, 16, 'Granjas México', '8400');
INSERT INTO public.colonias VALUES (1086, 16, 'Cuchilla Agrícola Oriental', '8420');
INSERT INTO public.colonias VALUES (1087, 16, 'Agrícola Oriental', '8500');
INSERT INTO public.colonias VALUES (1088, 16, 'El Rodeo', '8510');
INSERT INTO public.colonias VALUES (1089, 16, 'La Asunción', '8600');
INSERT INTO public.colonias VALUES (1090, 16, 'Zapotla', '8610');
INSERT INTO public.colonias VALUES (1091, 16, 'Los Reyes', '8620');
INSERT INTO public.colonias VALUES (1092, 16, 'San Miguel', '8650');
INSERT INTO public.colonias VALUES (1093, 16, 'Juventino Rosas', '8700');
INSERT INTO public.colonias VALUES (1094, 16, 'Tlazintla', '8710');
INSERT INTO public.colonias VALUES (1095, 16, 'Gabriel Ramos Millán Sección Tlacotal', '8720');
INSERT INTO public.colonias VALUES (1096, 16, 'Gabriel Ramos Millán', '8730');
INSERT INTO public.colonias VALUES (1097, 16, 'INPI Picos', '8760');
INSERT INTO public.colonias VALUES (1098, 16, 'Los Picos de Iztacalco Sección 2A', '8760');
INSERT INTO public.colonias VALUES (1099, 16, 'Los Picos de Iztacalco Sección 1B', '8760');
INSERT INTO public.colonias VALUES (1100, 16, 'Los Picos de Iztacalco Sección 1A', '8770');
INSERT INTO public.colonias VALUES (1101, 8, 'Argentina Antigua', '11270');
INSERT INTO public.colonias VALUES (1102, 8, 'Torre Blanca', '11280');
INSERT INTO public.colonias VALUES (1103, 8, 'Ampliación Torre Blanca', '11289');
INSERT INTO public.colonias VALUES (1104, 8, 'Huíchapan', '11290');
INSERT INTO public.colonias VALUES (1105, 8, 'San Diego Ocoyoacac', '11290');
INSERT INTO public.colonias VALUES (1106, 8, 'Verónica Anzures', '11300');
INSERT INTO public.colonias VALUES (1107, 8, 'Mariano Escobedo', '11310');
INSERT INTO public.colonias VALUES (1108, 8, 'Anáhuac I Sección', '11320');
INSERT INTO public.colonias VALUES (1109, 8, 'Anáhuac II Sección', '11320');
INSERT INTO public.colonias VALUES (1110, 8, 'Un Hogar Para Nosotros', '11330');
INSERT INTO public.colonias VALUES (1111, 8, 'Santo Tomas', '11340');
INSERT INTO public.colonias VALUES (1112, 8, 'Plutarco Elías Calles', '11350');
INSERT INTO public.colonias VALUES (1113, 8, 'Agricultura', '11360');
INSERT INTO public.colonias VALUES (1114, 8, 'Tlaxpana', '11370');
INSERT INTO public.colonias VALUES (1115, 8, 'Popotla', '11400');
INSERT INTO public.colonias VALUES (1116, 8, 'Legaria', '11410');
INSERT INTO public.colonias VALUES (1117, 8, 'Tacuba', '11410');
INSERT INTO public.colonias VALUES (1118, 8, 'Nextitla', '11420');
INSERT INTO public.colonias VALUES (1119, 8, 'Pensil Norte', '11430');
INSERT INTO public.colonias VALUES (1120, 8, 'Ventura Pérez de Alva', '11430');
INSERT INTO public.colonias VALUES (1121, 8, 'Reforma Pensil', '11440');
INSERT INTO public.colonias VALUES (1122, 8, 'San Juanico', '11440');
INSERT INTO public.colonias VALUES (1123, 8, 'Ahuehuetes Anáhuac', '11450');
INSERT INTO public.colonias VALUES (1124, 8, 'Modelo Pensil', '11450');
INSERT INTO public.colonias VALUES (1125, 8, 'Peralitos', '11450');
INSERT INTO public.colonias VALUES (1126, 8, 'Dos Lagos', '11460');
INSERT INTO public.colonias VALUES (1127, 8, 'Lago Norte', '11460');
INSERT INTO public.colonias VALUES (1128, 8, 'Lago Sur', '11460');
INSERT INTO public.colonias VALUES (1129, 8, 'Los Manzanos', '11460');
INSERT INTO public.colonias VALUES (1130, 8, '5 de Mayo', '11470');
INSERT INTO public.colonias VALUES (1131, 8, 'Deportivo Pensil', '11470');
INSERT INTO public.colonias VALUES (1132, 8, 'Francisco I Madero', '11480');
INSERT INTO public.colonias VALUES (1133, 8, 'Popo', '11480');
INSERT INTO public.colonias VALUES (1134, 8, 'Ampliación Popo', '11489');
INSERT INTO public.colonias VALUES (1135, 8, 'Cuauhtémoc Pensil', '11490');
INSERT INTO public.colonias VALUES (1136, 8, 'Pensil Sur', '11490');
INSERT INTO public.colonias VALUES (1137, 8, 'Irrigación', '11500');
INSERT INTO public.colonias VALUES (1138, 8, 'Polanco I Sección', '11510');
INSERT INTO public.colonias VALUES (1139, 8, 'Granada', '11520');
INSERT INTO public.colonias VALUES (1140, 8, 'Ampliación Granada', '11529');
INSERT INTO public.colonias VALUES (1141, 8, 'Polanco II Sección', '11530');
INSERT INTO public.colonias VALUES (1142, 8, 'Polanco III Sección', '11540');
INSERT INTO public.colonias VALUES (1143, 8, 'Polanco IV Sección', '11550');
INSERT INTO public.colonias VALUES (1144, 8, 'Polanco V Sección', '11560');
INSERT INTO public.colonias VALUES (1145, 8, 'Chapultepec Morales', '11570');
INSERT INTO public.colonias VALUES (1146, 8, 'Bosque de Chapultepec I Sección', '11580');
INSERT INTO public.colonias VALUES (1147, 8, 'Anzures', '11590');
INSERT INTO public.colonias VALUES (1148, 8, 'Residencial Militar', '11600');
INSERT INTO public.colonias VALUES (1149, 8, 'Manuel Ávila Camacho', '11610');
INSERT INTO public.colonias VALUES (1150, 8, 'Campo Militar 1', '11619');
INSERT INTO public.colonias VALUES (1151, 1, 'San Ángel', '1000');
INSERT INTO public.colonias VALUES (1152, 1, 'Los Alpes', '1010');
INSERT INTO public.colonias VALUES (1153, 1, 'Guadalupe Inn', '1020');
INSERT INTO public.colonias VALUES (1154, 1, 'Axotla', '1030');
INSERT INTO public.colonias VALUES (1155, 1, 'Florida', '1030');
INSERT INTO public.colonias VALUES (1156, 1, 'Campestre', '1040');
INSERT INTO public.colonias VALUES (1157, 1, 'Tlacopac', '1049');
INSERT INTO public.colonias VALUES (1158, 1, 'Ex-Hacienda de Guadalupe Chimalistac', '1050');
INSERT INTO public.colonias VALUES (1159, 1, 'Altavista', '1060');
INSERT INTO public.colonias VALUES (1160, 1, 'San Ángel Inn', '1060');
INSERT INTO public.colonias VALUES (1161, 1, 'Chimalistac', '1070');
INSERT INTO public.colonias VALUES (1162, 1, 'Progreso Tizapan', '1080');
INSERT INTO public.colonias VALUES (1163, 1, 'Ermita Tizapan', '1089');
INSERT INTO public.colonias VALUES (1164, 1, 'La Otra Banda', '1090');
INSERT INTO public.colonias VALUES (1165, 1, 'Loreto', '1090');
INSERT INTO public.colonias VALUES (1166, 1, 'Tizapan', '1090');
INSERT INTO public.colonias VALUES (1167, 1, 'Pólvora', '1100');
INSERT INTO public.colonias VALUES (1168, 1, 'La Conchita', '1109');
INSERT INTO public.colonias VALUES (1169, 1, 'Belém de las Flores', '1110');
INSERT INTO public.colonias VALUES (1170, 1, 'El Capulín', '1110');
INSERT INTO public.colonias VALUES (1171, 1, 'Ampliación El Capulín', '1110');
INSERT INTO public.colonias VALUES (1172, 1, 'Liberales de 1857', '1110');
INSERT INTO public.colonias VALUES (1173, 1, 'Acueducto', '1120');
INSERT INTO public.colonias VALUES (1174, 1, 'Cove', '1120');
INSERT INTO public.colonias VALUES (1175, 1, 'Hidalgo', '1120');
INSERT INTO public.colonias VALUES (1176, 1, 'Las Américas', '1120');
INSERT INTO public.colonias VALUES (1177, 1, 'Ampliación Acueducto', '1125');
INSERT INTO public.colonias VALUES (1178, 1, 'Paraíso', '1130');
INSERT INTO public.colonias VALUES (1179, 1, 'Molino de Santo Domingo', '1130');
INSERT INTO public.colonias VALUES (1180, 1, 'Real del Monte', '1130');
INSERT INTO public.colonias VALUES (1181, 1, 'Reacomodo Pino Suárez', '1139');
INSERT INTO public.colonias VALUES (1182, 1, 'Bellavista', '1140');
INSERT INTO public.colonias VALUES (1183, 1, 'José Maria Pino Suárez', '1140');
INSERT INTO public.colonias VALUES (1184, 1, 'Cristo Rey', '1150');
INSERT INTO public.colonias VALUES (1185, 1, 'Tolteca', '1150');
INSERT INTO public.colonias VALUES (1186, 1, 'Bosque', '1160');
INSERT INTO public.colonias VALUES (1187, 1, 'Isidro Fabela', '1160');
INSERT INTO public.colonias VALUES (1188, 1, 'Maria G. de García Ruiz', '1160');
INSERT INTO public.colonias VALUES (1189, 1, '1a Victoria', '1160');
INSERT INTO public.colonias VALUES (1190, 1, 'Abraham M. González', '1170');
INSERT INTO public.colonias VALUES (1191, 1, 'Carola', '1180');
INSERT INTO public.colonias VALUES (1192, 1, '8 de Agosto', '1180');
INSERT INTO public.colonias VALUES (1193, 1, 'San Pedro de los Pinos', '1180');
INSERT INTO public.colonias VALUES (1194, 1, 'Arturo Martínez', '1200');
INSERT INTO public.colonias VALUES (1196, 1, 'Lomas de Santa Fe', '1219');
INSERT INTO public.colonias VALUES (1197, 1, 'Bonanza', '1220');
INSERT INTO public.colonias VALUES (1198, 1, 'Cuevitas', '1220');
INSERT INTO public.colonias VALUES (1199, 1, 'El Cuernito', '1220');
INSERT INTO public.colonias VALUES (1200, 1, 'Mártires de Tacubaya', '1220');
INSERT INTO public.colonias VALUES (1201, 1, 'Zenón Delgado', '1220');
INSERT INTO public.colonias VALUES (1202, 16, 'Santiago Sur', '8800');
INSERT INTO public.colonias VALUES (1203, 16, 'Reforma Iztaccíhuatl Norte', '8810');
INSERT INTO public.colonias VALUES (1204, 16, 'Militar Marte', '8830');
INSERT INTO public.colonias VALUES (1205, 16, 'Reforma Iztaccíhuatl Sur', '8840');
INSERT INTO public.colonias VALUES (1206, 16, 'INFONAVIT Iztacalco', '8900');
INSERT INTO public.colonias VALUES (1207, 16, 'Santa Cruz', '8910');
INSERT INTO public.colonias VALUES (1208, 16, 'Jardines Tecma', '8920');
INSERT INTO public.colonias VALUES (1209, 16, 'Campamento 2 de Octubre', '8930');
INSERT INTO public.colonias VALUES (1210, 7, 'La Asunción', '9000');
INSERT INTO public.colonias VALUES (1211, 7, 'San Ignacio', '9000');
INSERT INTO public.colonias VALUES (1212, 7, 'San José', '9000');
INSERT INTO public.colonias VALUES (1213, 7, 'San Lucas', '9000');
INSERT INTO public.colonias VALUES (1215, 7, 'San Pedro', '9000');
INSERT INTO public.colonias VALUES (1216, 7, 'Santa Bárbara', '9000');
INSERT INTO public.colonias VALUES (1217, 7, 'Real del Moral', '9010');
INSERT INTO public.colonias VALUES (1218, 7, 'Doctor Alfonso Ortiz Tirado', '9020');
INSERT INTO public.colonias VALUES (1219, 7, 'Paseos de Churubusco', '9030');
INSERT INTO public.colonias VALUES (1220, 7, 'Central de Abasto', '9040');
INSERT INTO public.colonias VALUES (1221, 7, 'Escuadrón 201', '9060');
INSERT INTO public.colonias VALUES (1222, 7, 'Sector Popular', '9060');
INSERT INTO public.colonias VALUES (1223, 7, 'Granjas de San Antonio', '9070');
INSERT INTO public.colonias VALUES (1224, 7, 'Cacama', '9080');
INSERT INTO public.colonias VALUES (1225, 7, 'Unidad Modelo', '9089');
INSERT INTO public.colonias VALUES (1226, 7, 'Héroes de Churubusco', '9090');
INSERT INTO public.colonias VALUES (1227, 7, 'Mexicaltzingo', '9099');
INSERT INTO public.colonias VALUES (1228, 7, 'Juan Escutia', '9100');
INSERT INTO public.colonias VALUES (1229, 7, 'San Lorenzo Xicotencatl', '9130');
INSERT INTO public.colonias VALUES (1230, 7, 'Santa Martha Acatitla Norte', '9140');
INSERT INTO public.colonias VALUES (1231, 7, 'Ermita Zaragoza', '9180');
INSERT INTO public.colonias VALUES (1232, 7, 'Unidad Vicente Guerrero', '9200');
INSERT INTO public.colonias VALUES (1233, 7, 'Chinampac de Juárez', '9208');
INSERT INTO public.colonias VALUES (1234, 7, 'Renovación', '9209');
INSERT INTO public.colonias VALUES (1235, 7, 'Tepalcates', '9210');
INSERT INTO public.colonias VALUES (1236, 7, 'Unidad Ejército Constitucionalista', '9220');
INSERT INTO public.colonias VALUES (1237, 7, 'Álvaro Obregón', '9230');
INSERT INTO public.colonias VALUES (1238, 7, 'Ejército de Oriente', '9230');
INSERT INTO public.colonias VALUES (1239, 7, 'El Paraíso', '9230');
INSERT INTO public.colonias VALUES (1240, 7, 'José María Morelos y Pavón', '9230');
INSERT INTO public.colonias VALUES (1241, 7, 'Ejército de Oriente Zona Peñón', '9239');
INSERT INTO public.colonias VALUES (1242, 7, 'Progresista', '9240');
INSERT INTO public.colonias VALUES (1243, 7, 'La Regadera', '9250');
INSERT INTO public.colonias VALUES (1244, 7, 'Constitución de 1917', '9260');
INSERT INTO public.colonias VALUES (1245, 7, 'Colonial Iztapalapa', '9270');
INSERT INTO public.colonias VALUES (1246, 7, 'Jacarandas', '9280');
INSERT INTO public.colonias VALUES (1248, 7, 'Guadalupe del Moral', '9300');
INSERT INTO public.colonias VALUES (1249, 7, 'Leyes de Reforma 1a Sección', '9310');
INSERT INTO public.colonias VALUES (1250, 7, 'Leyes de Reforma 2a Sección', '9310');
INSERT INTO public.colonias VALUES (1251, 7, 'Leyes de Reforma 3a Sección', '9310');
INSERT INTO public.colonias VALUES (1252, 7, 'Cuchilla del Moral', '9319');
INSERT INTO public.colonias VALUES (1253, 7, 'Sideral', '9320');
INSERT INTO public.colonias VALUES (1254, 7, 'Albarrada', '9350');
INSERT INTO public.colonias VALUES (1255, 7, 'Eva Sámano de López Mateos', '9359');
INSERT INTO public.colonias VALUES (1256, 11, 'Palmas', '10370');
INSERT INTO public.colonias VALUES (1257, 11, 'Atacaxco', '10378');
INSERT INTO public.colonias VALUES (1258, 11, 'Vista Hermosa', '10379');
INSERT INTO public.colonias VALUES (1259, 11, 'Barros Sierra', '10380');
INSERT INTO public.colonias VALUES (1260, 11, 'San Jerónimo Aculco', '10400');
INSERT INTO public.colonias VALUES (1261, 11, 'Barrio San Francisco', '10500');
INSERT INTO public.colonias VALUES (1262, 11, 'Barranca Seca', '10580');
INSERT INTO public.colonias VALUES (1263, 11, 'El Rosal', '10600');
INSERT INTO public.colonias VALUES (1264, 11, 'El Toro', '10610');
INSERT INTO public.colonias VALUES (1265, 11, 'Potrerillo', '10620');
INSERT INTO public.colonias VALUES (1266, 11, 'El Ocotal', '10630');
INSERT INTO public.colonias VALUES (1267, 11, 'La Carbonera', '10640');
INSERT INTO public.colonias VALUES (1268, 11, 'Pueblo Nuevo Alto', '10640');
INSERT INTO public.colonias VALUES (1269, 11, 'Pueblo Nuevo Bajo', '10640');
INSERT INTO public.colonias VALUES (1270, 11, 'El Ermitaño', '10660');
INSERT INTO public.colonias VALUES (1271, 11, 'Héroes de Padierna', '10700');
INSERT INTO public.colonias VALUES (1272, 11, 'Santa Teresa', '10710');
INSERT INTO public.colonias VALUES (1273, 11, 'La Cruz', '10800');
INSERT INTO public.colonias VALUES (1274, 11, 'San Francisco', '10810');
INSERT INTO public.colonias VALUES (1275, 11, 'La Guadalupe', '10820');
INSERT INTO public.colonias VALUES (1276, 11, 'La Concepción', '10830');
INSERT INTO public.colonias VALUES (1277, 11, 'Las Calles', '10840');
INSERT INTO public.colonias VALUES (1278, 11, 'Plazuela del Pedregal', '10840');
INSERT INTO public.colonias VALUES (1279, 11, 'San Nicolás Totolapan', '10900');
INSERT INTO public.colonias VALUES (1280, 11, 'La Magdalena', '10910');
INSERT INTO public.colonias VALUES (1281, 11, 'Las Huertas', '10920');
INSERT INTO public.colonias VALUES (1282, 11, 'Tierra Colorada', '10926');
INSERT INTO public.colonias VALUES (1283, 8, 'Lomas de Chapultepec I Sección', '11000');
INSERT INTO public.colonias VALUES (1284, 8, 'Lomas de Chapultepec VIII Sección', '11000');
INSERT INTO public.colonias VALUES (1285, 8, 'Lomas de Chapultepec II Sección', '11000');
INSERT INTO public.colonias VALUES (1286, 8, 'Lomas de Chapultepec III Sección', '11000');
INSERT INTO public.colonias VALUES (1287, 8, 'Lomas de Chapultepec IV Sección', '11000');
INSERT INTO public.colonias VALUES (1288, 8, 'Lomas de Chapultepec V Sección', '11000');
INSERT INTO public.colonias VALUES (1289, 8, 'Lomas de Chapultepec VI Sección', '11000');
INSERT INTO public.colonias VALUES (1290, 8, 'Lomas de Chapultepec VII Sección', '11000');
INSERT INTO public.colonias VALUES (1291, 8, 'Molino del Rey', '11040');
INSERT INTO public.colonias VALUES (1292, 8, 'Bosque de Chapultepec II Sección', '11100');
INSERT INTO public.colonias VALUES (1293, 8, 'Bosque de Chapultepec III Sección', '11100');
INSERT INTO public.colonias VALUES (1294, 8, 'Lomas Hermosa', '11200');
INSERT INTO public.colonias VALUES (1295, 8, 'Lomas de Sotelo', '11200');
INSERT INTO public.colonias VALUES (1296, 8, 'San Lorenzo Tlaltenango', '11210');
INSERT INTO public.colonias VALUES (1297, 8, 'Periodista', '11220');
INSERT INTO public.colonias VALUES (1298, 8, 'Argentina Poniente', '11230');
INSERT INTO public.colonias VALUES (1299, 8, 'Ignacio Manuel Altamirano', '11240');
INSERT INTO public.colonias VALUES (1300, 8, '10 de Abril', '11250');
INSERT INTO public.colonias VALUES (1301, 8, 'México Nuevo', '11260');
INSERT INTO public.colonias VALUES (1302, 8, 'San Joaquín', '11260');
INSERT INTO public.colonias VALUES (1303, 10, 'San Bartolomé', '13600');
INSERT INTO public.colonias VALUES (1305, 10, 'Santa Cruz', '13625');
INSERT INTO public.colonias VALUES (1308, 10, 'San Nicolás Tetelco', '13700');
INSERT INTO public.colonias VALUES (1309, 10, 'Tepantitlamilco', '13700');
INSERT INTO public.colonias VALUES (1310, 12, 'Tlalpan Centro', '14000');
INSERT INTO public.colonias VALUES (1311, 12, 'Tlalpan', '14000');
INSERT INTO public.colonias VALUES (1312, 12, 'Parque del Pedregal', '14010');
INSERT INTO public.colonias VALUES (1313, 12, 'Villa Olímpica', '14020');
INSERT INTO public.colonias VALUES (1314, 12, 'Isidro Fabela', '14030');
INSERT INTO public.colonias VALUES (1315, 12, 'Ampliación Isidro Fabela', '14039');
INSERT INTO public.colonias VALUES (1316, 12, 'Cantera Puente de Piedra', '14040');
INSERT INTO public.colonias VALUES (1317, 12, 'Pueblo Quieto', '14040');
INSERT INTO public.colonias VALUES (1318, 12, 'Comuneros de Santa Úrsula', '14049');
INSERT INTO public.colonias VALUES (1319, 12, 'Toriello Guerra', '14050');
INSERT INTO public.colonias VALUES (1320, 12, 'Peña Pobre', '14060');
INSERT INTO public.colonias VALUES (1321, 12, 'Rómulo Sánchez Mireles', '14070');
INSERT INTO public.colonias VALUES (1322, 12, 'San Fernando', '14070');
INSERT INTO public.colonias VALUES (1323, 12, 'San Pedro Apóstol', '14070');
INSERT INTO public.colonias VALUES (1324, 12, 'Belisario Domínguez Sección XVI', '14080');
INSERT INTO public.colonias VALUES (1325, 12, 'Del Niño Jesús', '14080');
INSERT INTO public.colonias VALUES (1326, 12, 'La Joya', '14090');
INSERT INTO public.colonias VALUES (1327, 12, 'Pedregal de San Nicolás 1A Sección', '14100');
INSERT INTO public.colonias VALUES (1328, 12, 'Pedregal de San Nicolás 2A Sección', '14100');
INSERT INTO public.colonias VALUES (1329, 12, 'Pedregal de San Nicolás 3A Sección', '14100');
INSERT INTO public.colonias VALUES (1330, 12, 'Pedregal de San Nicolás 4A Sección', '14100');
INSERT INTO public.colonias VALUES (1331, 12, 'Pedregal de San Nicolás 5ª Sección', '14100');
INSERT INTO public.colonias VALUES (1332, 12, 'Chichicaspatl', '14108');
INSERT INTO public.colonias VALUES (1333, 12, 'Ampliación Fuentes del Pedregal', '14110');
INSERT INTO public.colonias VALUES (1334, 12, 'Rincón del Pedregal', '14120');
INSERT INTO public.colonias VALUES (1335, 12, 'Fuentes del Pedregal', '14140');
INSERT INTO public.colonias VALUES (1336, 12, 'Lomas del Pedregal Framboyanes', '14150');
INSERT INTO public.colonias VALUES (1337, 12, 'Popular Santa Teresa', '14160');
INSERT INTO public.colonias VALUES (1338, 12, 'Héroes de Padierna', '14200');
INSERT INTO public.colonias VALUES (1339, 12, 'Jardines del Ajusco', '14200');
INSERT INTO public.colonias VALUES (1340, 12, 'Colinas del Ajusco', '14208');
INSERT INTO public.colonias VALUES (1341, 12, 'Torres de Padierna', '14209');
INSERT INTO public.colonias VALUES (1342, 12, 'Jardines en la Montaña', '14210');
INSERT INTO public.colonias VALUES (1343, 12, 'Six Flags (Reino Aventura)', '14219');
INSERT INTO public.colonias VALUES (1344, 12, 'Parque Nacional Bosque del Pedregal', '14219');
INSERT INTO public.colonias VALUES (1345, 12, 'Cuchilla de Padierna', '14220');
INSERT INTO public.colonias VALUES (1346, 12, 'Lomas del Pedregal', '14220');
INSERT INTO public.colonias VALUES (1347, 12, 'Cultura Maya', '14230');
INSERT INTO public.colonias VALUES (1348, 12, 'Los Encinos', '14239');
INSERT INTO public.colonias VALUES (1349, 12, 'Lomas de Padierna', '14240');
INSERT INTO public.colonias VALUES (1350, 12, 'Lomas Hidalgo', '14240');
INSERT INTO public.colonias VALUES (1351, 12, 'Cruz del Farol', '14248');
INSERT INTO public.colonias VALUES (1352, 12, 'Miguel Hidalgo 2A Sección', '14250');
INSERT INTO public.colonias VALUES (1353, 12, 'Miguel Hidalgo 3A Sección', '14250');
INSERT INTO public.colonias VALUES (1354, 12, 'Miguel Hidalgo 4A Sección', '14250');
INSERT INTO public.colonias VALUES (1355, 12, 'Miguel Hidalgo', '14250');
INSERT INTO public.colonias VALUES (1356, 12, 'El Capulín', '14260');
INSERT INTO public.colonias VALUES (1357, 12, 'Miguel Hidalgo 1A Sección', '14260');
INSERT INTO public.colonias VALUES (1358, 12, 'Zacayucan Peña Pobre', '14266');
INSERT INTO public.colonias VALUES (1359, 12, 'De Caramagüey', '14267');
INSERT INTO public.colonias VALUES (1360, 12, 'La Lonja', '14268');
INSERT INTO public.colonias VALUES (1361, 12, 'La Fama', '14269');
INSERT INTO public.colonias VALUES (1362, 12, 'Primavera', '14270');
INSERT INTO public.colonias VALUES (1363, 12, 'Verano', '14270');
INSERT INTO public.colonias VALUES (1364, 12, 'Paraje 38', '14275');
INSERT INTO public.colonias VALUES (1365, 12, 'Nueva Oriental Coapa', '14300');
INSERT INTO public.colonias VALUES (1366, 12, 'Residencial Acoxpa', '14300');
INSERT INTO public.colonias VALUES (1367, 12, 'Residencial Miramontes', '14300');
INSERT INTO public.colonias VALUES (1368, 12, 'Ex Hacienda Coapa', '14308');
INSERT INTO public.colonias VALUES (1369, 12, 'Belisario Domínguez', '14310');
INSERT INTO public.colonias VALUES (1370, 12, 'Floresta Coyoacán', '14310');
INSERT INTO public.colonias VALUES (1371, 12, 'Vergel Coapa', '14320');
INSERT INTO public.colonias VALUES (1372, 12, 'Rinconada Coapa 2A Sección', '14325');
INSERT INTO public.colonias VALUES (1373, 12, 'Tenorios', '14326');
INSERT INTO public.colonias VALUES (1374, 12, 'Granjas Coapa', '14330');
INSERT INTO public.colonias VALUES (1375, 12, 'Rinconada Coapa 1A Sección', '14330');
INSERT INTO public.colonias VALUES (1376, 12, 'Vergel de Coyoacán', '14340');
INSERT INTO public.colonias VALUES (1377, 12, 'Vergel del Sur', '14340');
INSERT INTO public.colonias VALUES (1378, 12, 'Prado Coapa 1A Sección', '14350');
INSERT INTO public.colonias VALUES (1379, 12, 'Prado Coapa 2A Sección', '14357');
INSERT INTO public.colonias VALUES (1380, 12, 'Prado Coapa 3A Sección', '14357');
INSERT INTO public.colonias VALUES (1381, 12, 'Magisterial', '14360');
INSERT INTO public.colonias VALUES (1382, 12, 'Magisterial Coapa', '14360');
INSERT INTO public.colonias VALUES (1383, 12, 'Residencial Chimali', '14370');
INSERT INTO public.colonias VALUES (1384, 12, 'San Lorenzo Huipulco', '14370');
INSERT INTO public.colonias VALUES (1385, 12, 'Villa Lázaro Cárdenas', '14370');
INSERT INTO public.colonias VALUES (1386, 12, 'Arboledas del Sur', '14376');
INSERT INTO public.colonias VALUES (1387, 12, 'Hacienda San Juan', '14377');
INSERT INTO public.colonias VALUES (1388, 12, 'A.M.S.A', '14380');
INSERT INTO public.colonias VALUES (1389, 12, 'San Bartolo El Chico', '14380');
INSERT INTO public.colonias VALUES (1390, 12, 'Rancho los Colorines', '14386');
INSERT INTO public.colonias VALUES (1391, 12, 'Ex Hacienda San Juan de Dios', '14387');
INSERT INTO public.colonias VALUES (1392, 12, 'Guadalupe', '14388');
INSERT INTO public.colonias VALUES (1393, 12, 'Arenal de Guadalupe', '14389');
INSERT INTO public.colonias VALUES (1394, 12, 'Rinconada Las Hadas', '14390');
INSERT INTO public.colonias VALUES (1395, 12, 'Narciso Mendoza', '14390');
INSERT INTO public.colonias VALUES (1396, 12, 'Residencial Villa Coapa', '14390');
INSERT INTO public.colonias VALUES (1397, 12, 'Villa Coapa', '14390');
INSERT INTO public.colonias VALUES (1398, 12, 'San Andrés Totoltepec', '14400');
INSERT INTO public.colonias VALUES (1399, 12, 'Divisadero', '14406');
INSERT INTO public.colonias VALUES (1400, 12, 'Nuevo Renacimiento de Axalco', '14408');
INSERT INTO public.colonias VALUES (1401, 12, 'Tecorral', '14409');
INSERT INTO public.colonias VALUES (1402, 12, 'Bosques de Tepeximilpa', '14410');
INSERT INTO public.colonias VALUES (1403, 12, 'Fuentes Brotantes', '14410');
INSERT INTO public.colonias VALUES (1404, 12, 'Cumbres de Tepetongo', '14420');
INSERT INTO public.colonias VALUES (1405, 12, 'Mesa de los Hornos', '14420');
INSERT INTO public.colonias VALUES (1406, 12, 'Santa Úrsula Xitla', '14420');
INSERT INTO public.colonias VALUES (1407, 12, 'Texcaltenco', '14426');
INSERT INTO public.colonias VALUES (1408, 12, 'Tlaxcaltenco la Mesa', '14426');
INSERT INTO public.colonias VALUES (1409, 12, 'San Juan Tepeximilpa', '14427');
INSERT INTO public.colonias VALUES (1410, 12, 'Tepeximilpa la Paz', '14427');
INSERT INTO public.colonias VALUES (1411, 12, 'Santísima Trinidad', '14429');
INSERT INTO public.colonias VALUES (1412, 12, 'El Truenito', '14430');
INSERT INTO public.colonias VALUES (1413, 12, 'Tlalcoligia', '14430');
INSERT INTO public.colonias VALUES (1414, 12, 'Pedregal de Santa Úrsula Xitla', '14438');
INSERT INTO public.colonias VALUES (1415, 12, 'Pedregal de las Águilas', '14439');
INSERT INTO public.colonias VALUES (1416, 12, 'Los Volcanes', '14440');
INSERT INTO public.colonias VALUES (1417, 12, 'El Mirador 1A Sección', '14449');
INSERT INTO public.colonias VALUES (1418, 12, 'El Mirador 2A Sección', '14449');
INSERT INTO public.colonias VALUES (1419, 12, 'El Mirador 3A Sección', '14449');
INSERT INTO public.colonias VALUES (1420, 12, 'Atocpa', '14456');
INSERT INTO public.colonias VALUES (1421, 12, 'Atocpa Sur', '14456');
INSERT INTO public.colonias VALUES (1422, 15, 'Petrolera', '2480');
INSERT INTO public.colonias VALUES (1423, 15, 'San Mateo', '2490');
INSERT INTO public.colonias VALUES (1424, 15, 'Unidad Cuitláhuac', '2500');
INSERT INTO public.colonias VALUES (1425, 15, 'El Jagüey', '2519');
INSERT INTO public.colonias VALUES (1426, 15, 'Estación Pantaco', '2520');
INSERT INTO public.colonias VALUES (1427, 15, 'Jardín Azpeitia', '2530');
INSERT INTO public.colonias VALUES (1428, 15, 'Pro-Hogar', '2600');
INSERT INTO public.colonias VALUES (1429, 15, 'Coltongo', '2630');
INSERT INTO public.colonias VALUES (1431, 15, 'Monte Alto', '2640');
INSERT INTO public.colonias VALUES (1432, 15, 'Trabajadores de Hierro', '2650');
INSERT INTO public.colonias VALUES (1433, 15, 'Euzkadi', '2660');
INSERT INTO public.colonias VALUES (1434, 15, 'Cosmopolita', '2670');
INSERT INTO public.colonias VALUES (1435, 15, 'Potrero del Llano', '2680');
INSERT INTO public.colonias VALUES (1436, 15, 'San Miguel Amantla', '2700');
INSERT INTO public.colonias VALUES (1437, 15, 'San Pedro Xalpa', '2710');
INSERT INTO public.colonias VALUES (1438, 15, 'Ampliación San Pedro Xalpa', '2719');
INSERT INTO public.colonias VALUES (1439, 15, 'San Antonio', '2720');
INSERT INTO public.colonias VALUES (1440, 15, 'San Bartolo Cahualtongo', '2720');
INSERT INTO public.colonias VALUES (1441, 15, 'San Francisco Tetecala', '2730');
INSERT INTO public.colonias VALUES (1442, 15, 'Santiago Ahuizotla', '2750');
INSERT INTO public.colonias VALUES (1443, 15, 'Industrial San Antonio', '2760');
INSERT INTO public.colonias VALUES (1444, 15, 'Santa Lucía', '2760');
INSERT INTO public.colonias VALUES (1445, 15, 'Santa Cruz Acayucan', '2770');
INSERT INTO public.colonias VALUES (1446, 15, 'Plenitud', '2780');
INSERT INTO public.colonias VALUES (1447, 15, 'Santa Apolonia', '2790');
INSERT INTO public.colonias VALUES (1448, 15, 'Nueva Santa María', '2800');
INSERT INTO public.colonias VALUES (1449, 15, 'Ignacio Allende', '2810');
INSERT INTO public.colonias VALUES (1450, 15, 'Victoria de las Democracias', '2810');
INSERT INTO public.colonias VALUES (1451, 15, 'San Bernabé', '2830');
INSERT INTO public.colonias VALUES (1452, 15, 'Obrero Popular', '2840');
INSERT INTO public.colonias VALUES (1453, 15, 'Tlatilco', '2860');
INSERT INTO public.colonias VALUES (1454, 15, 'San Salvador Xochimanca', '2870');
INSERT INTO public.colonias VALUES (1455, 15, 'Aguilera', '2900');
INSERT INTO public.colonias VALUES (1456, 15, 'Aldana', '2910');
INSERT INTO public.colonias VALUES (1457, 15, 'Ampliación Cosmopolita', '2920');
INSERT INTO public.colonias VALUES (1458, 15, 'Liberación', '2930');
INSERT INTO public.colonias VALUES (1459, 15, 'Porvenir', '2940');
INSERT INTO public.colonias VALUES (1460, 15, 'Del Gas', '2950');
INSERT INTO public.colonias VALUES (1461, 15, 'San Francisco Xocotitla', '2960');
INSERT INTO public.colonias VALUES (1462, 15, 'Ampliación Del Gas', '2970');
INSERT INTO public.colonias VALUES (1463, 15, 'Arenal', '2980');
INSERT INTO public.colonias VALUES (1464, 15, 'Patrimonio Familiar', '2980');
INSERT INTO public.colonias VALUES (1465, 15, 'La Raza', '2990');
INSERT INTO public.colonias VALUES (1466, 2, 'Piedad Narvarte', '3000');
INSERT INTO public.colonias VALUES (1467, 2, 'Atenor Salas', '3010');
INSERT INTO public.colonias VALUES (1468, 2, 'Narvarte Poniente', '3020');
INSERT INTO public.colonias VALUES (1469, 2, 'Narvarte Oriente', '3023');
INSERT INTO public.colonias VALUES (1470, 2, 'Del Valle Centro', '3100');
INSERT INTO public.colonias VALUES (1471, 2, 'Insurgentes San Borja', '3100');
INSERT INTO public.colonias VALUES (1472, 13, 'Lorenzo Boturini', '15820');
INSERT INTO public.colonias VALUES (1473, 13, 'Artes Gráficas', '15830');
INSERT INTO public.colonias VALUES (1474, 13, 'Sevilla', '15840');
INSERT INTO public.colonias VALUES (1475, 13, 'Magdalena Mixiuhca', '15850');
INSERT INTO public.colonias VALUES (1476, 13, 'La Magdalena Mixiuhca', '15860');
INSERT INTO public.colonias VALUES (1477, 13, 'Aarón Sáenz', '15870');
INSERT INTO public.colonias VALUES (1478, 13, 'Jardín Balbuena', '15900');
INSERT INTO public.colonias VALUES (1479, 13, 'Del Parque', '15960');
INSERT INTO public.colonias VALUES (1480, 13, 'Aeronáutica Militar', '15970');
INSERT INTO public.colonias VALUES (1481, 13, '24 de Abril', '15980');
INSERT INTO public.colonias VALUES (1482, 13, 'Álvaro Obregón', '15990');
INSERT INTO public.colonias VALUES (1483, 14, 'La Concepción Tlacoapa', '16000');
INSERT INTO public.colonias VALUES (1486, 14, 'Bosque Residencial del Sur', '16010');
INSERT INTO public.colonias VALUES (1487, 14, 'Las Peritas', '16010');
INSERT INTO public.colonias VALUES (1488, 14, 'Paseos del Sur', '16010');
INSERT INTO public.colonias VALUES (1489, 14, 'San Bartolo El Chico', '16010');
INSERT INTO public.colonias VALUES (1490, 14, 'San Juan Tepepan', '16020');
INSERT INTO public.colonias VALUES (1491, 14, 'Santa María Tepepan', '16020');
INSERT INTO public.colonias VALUES (1492, 14, 'Ampliación Tepepan', '16029');
INSERT INTO public.colonias VALUES (1493, 14, 'Huichapan', '16030');
INSERT INTO public.colonias VALUES (1494, 14, 'La Noria', '16030');
INSERT INTO public.colonias VALUES (1495, 14, 'Potrero de San Bernardino', '16030');
INSERT INTO public.colonias VALUES (1496, 14, 'Ampliación La Noria', '16030');
INSERT INTO public.colonias VALUES (1497, 14, '18', '16034');
INSERT INTO public.colonias VALUES (1498, 14, 'San Lorenzo La Cebada', '16035');
INSERT INTO public.colonias VALUES (1499, 14, 'Rinconada Coapa', '16035');
INSERT INTO public.colonias VALUES (1500, 14, 'Mercado de Flores Plantas y Hortalizas', '16036');
INSERT INTO public.colonias VALUES (1501, 14, 'Ampliación San Marcos Norte', '16038');
INSERT INTO public.colonias VALUES (1503, 14, 'San Lorenzo', '16040');
INSERT INTO public.colonias VALUES (1504, 14, 'Jardines del Sur', '16050');
INSERT INTO public.colonias VALUES (1505, 14, 'San Marcos', '16050');
INSERT INTO public.colonias VALUES (1506, 14, 'Tierra Nueva', '16050');
INSERT INTO public.colonias VALUES (1507, 14, 'Pueblo Santiago Tepalcatlalpan, U.H. Rinconada del Sur', '16059');
INSERT INTO public.colonias VALUES (1509, 14, 'Belén', '16070');
INSERT INTO public.colonias VALUES (1510, 14, 'El Rosario', '16070');
INSERT INTO public.colonias VALUES (1511, 14, 'La Guadalupita', '16070');
INSERT INTO public.colonias VALUES (1512, 14, 'Santa Crucita', '16070');
INSERT INTO public.colonias VALUES (1513, 14, 'La Santísima', '16080');
INSERT INTO public.colonias VALUES (1514, 14, 'San Cristóbal', '16080');
INSERT INTO public.colonias VALUES (1515, 14, 'San Diego', '16080');
INSERT INTO public.colonias VALUES (1516, 14, 'San Esteban', '16080');
INSERT INTO public.colonias VALUES (1517, 14, 'Caltongo', '16083');
INSERT INTO public.colonias VALUES (1518, 14, 'San Pedro', '16090');
INSERT INTO public.colonias VALUES (1519, 14, 'Tablas de San Lorenzo', '16090');
INSERT INTO public.colonias VALUES (1520, 14, 'Xaltocan', '16090');
INSERT INTO public.colonias VALUES (1521, 14, 'Santa Cruz Xochitepec', '16100');
INSERT INTO public.colonias VALUES (1522, 14, 'Santiago Tepalcatlalpan', '16200');
INSERT INTO public.colonias VALUES (1523, 14, 'Pueblo Santiago Tepalcatlalpan U.H. Res. Santiago', '16210');
INSERT INTO public.colonias VALUES (1524, 14, 'La Concha', '16210');
INSERT INTO public.colonias VALUES (1525, 14, 'Tlaxopan', '16240');
INSERT INTO public.colonias VALUES (1526, 14, 'San Lucas Xochimanca', '16300');
INSERT INTO public.colonias VALUES (1527, 14, 'La Cañada', '16310');
INSERT INTO public.colonias VALUES (1528, 14, 'San Lucas Oriente', '16320');
INSERT INTO public.colonias VALUES (1529, 14, 'Texmic', '16340');
INSERT INTO public.colonias VALUES (1530, 17, 'San Cristóbal Centro', '55000');
INSERT INTO public.colonias VALUES (1531, 17, 'Ecatepec Centro', '55000');
INSERT INTO public.colonias VALUES (1532, 17, 'La Cruz de San Cristóbal', '55000');
INSERT INTO public.colonias VALUES (1533, 17, 'Bonito Arboledas', '55010');
INSERT INTO public.colonias VALUES (1534, 17, 'Privada de Ecatepec', '55010');
INSERT INTO public.colonias VALUES (1535, 17, 'Los Lirios', '55010');
INSERT INTO public.colonias VALUES (1536, 17, 'Camino Nacional', '55010');
INSERT INTO public.colonias VALUES (1537, 17, 'Laureles Residencial', '55010');
INSERT INTO public.colonias VALUES (1538, 17, 'Guadalupe Victoria', '55010');
INSERT INTO public.colonias VALUES (1539, 17, 'Ampliación Guadalupe Victoria', '55010');
INSERT INTO public.colonias VALUES (1540, 17, 'Villa Esmeralda', '55010');
INSERT INTO public.colonias VALUES (1541, 17, 'Pozo de la Pila', '55010');
INSERT INTO public.colonias VALUES (1542, 17, 'El Progreso de Guadalupe Victoria', '55010');
INSERT INTO public.colonias VALUES (1543, 17, 'Rancho Victoria II', '55010');
INSERT INTO public.colonias VALUES (1544, 17, 'Barrio Nuevo Tultitlán', '55010');
INSERT INTO public.colonias VALUES (1545, 17, 'Rancho Victoria', '55010');
INSERT INTO public.colonias VALUES (1546, 17, 'El Obraje (Diamante)', '55010');
INSERT INTO public.colonias VALUES (1547, 17, 'Mathzi II', '55010');
INSERT INTO public.colonias VALUES (1548, 17, 'Mathzi I', '55010');
INSERT INTO public.colonias VALUES (1549, 17, 'El Diamante', '55010');
INSERT INTO public.colonias VALUES (1550, 17, 'Las Piedras', '55010');
INSERT INTO public.colonias VALUES (1551, 17, 'El Manchon', '55010');
INSERT INTO public.colonias VALUES (1552, 17, 'Bonito las Flores', '55010');
INSERT INTO public.colonias VALUES (1553, 17, 'Mathzi III', '55010');
INSERT INTO public.colonias VALUES (1554, 17, 'Parque Residencial Coacalco', '55014');
INSERT INTO public.colonias VALUES (1555, 17, 'La Joya', '55016');
INSERT INTO public.colonias VALUES (1556, 17, 'Tío Marin', '55016');
INSERT INTO public.colonias VALUES (1558, 17, 'Tía Joaquina', '55016');
INSERT INTO public.colonias VALUES (1559, 17, 'Villas de la Joya', '55016');
INSERT INTO public.colonias VALUES (1560, 17, 'Torres de Altavista', '55016');
INSERT INTO public.colonias VALUES (1561, 17, 'Mesa de los Leones', '55016');
INSERT INTO public.colonias VALUES (1562, 17, 'El Tejocote', '55017');
INSERT INTO public.colonias VALUES (1563, 17, 'El Capulín', '55018');
INSERT INTO public.colonias VALUES (1564, 17, 'FOVISSSTE (José María Morelos y Pavón)', '55018');
INSERT INTO public.colonias VALUES (1565, 17, 'Granja el Rosal', '55018');
INSERT INTO public.colonias VALUES (1566, 17, 'Ecatepec 2000', '55018');
INSERT INTO public.colonias VALUES (1567, 17, 'San Carlos', '55018');
INSERT INTO public.colonias VALUES (1568, 17, 'La Monera', '55020');
INSERT INTO public.colonias VALUES (1569, 17, 'Misión de los 40', '55020');
INSERT INTO public.colonias VALUES (1570, 17, 'Panitzin', '55020');
INSERT INTO public.colonias VALUES (1571, 17, 'Sergio Méndez Arceo', '55020');
INSERT INTO public.colonias VALUES (1572, 17, 'Boulevares de San Cristóbal', '55020');
INSERT INTO public.colonias VALUES (1573, 17, 'El Calvario', '55020');
INSERT INTO public.colonias VALUES (1574, 17, 'Boulevares la Nacional', '55020');
INSERT INTO public.colonias VALUES (1575, 17, 'Tierra Blanca', '55020');
INSERT INTO public.colonias VALUES (1576, 17, 'Ex-Hacienda Jauregui', '55020');
INSERT INTO public.colonias VALUES (1578, 17, 'Magisterial 2000', '55020');
INSERT INTO public.colonias VALUES (1579, 17, '10 de Abril', '55020');
INSERT INTO public.colonias VALUES (1580, 17, 'Bosques de San Javier', '55020');
INSERT INTO public.colonias VALUES (1581, 17, 'La Palma II', '55020');
INSERT INTO public.colonias VALUES (1582, 17, 'El Terremote', '55020');
INSERT INTO public.colonias VALUES (1583, 17, 'Martell', '55020');
INSERT INTO public.colonias VALUES (1584, 17, 'Bursaab', '55020');
INSERT INTO public.colonias VALUES (1585, 17, 'Plazas Ecatepec', '55020');
INSERT INTO public.colonias VALUES (1586, 17, 'Residencial San Cristóbal', '55020');
INSERT INTO public.colonias VALUES (1587, 17, 'Tierra Blanca Segunda Sección (Ejido Ecatepec)', '55020');
INSERT INTO public.colonias VALUES (1588, 17, 'Los Héroes Ecatepec Sección I', '55023');
INSERT INTO public.colonias VALUES (1589, 17, 'Los Héroes Ecatepec Sección III', '55023');
INSERT INTO public.colonias VALUES (1590, 17, 'Los Héroes Ecatepec Sección II', '55023');
INSERT INTO public.colonias VALUES (1591, 17, 'Los Héroes Ecatepec Sección IV', '55023');
INSERT INTO public.colonias VALUES (1592, 17, 'Ejidos de San Cristóbal', '55024');
INSERT INTO public.colonias VALUES (1593, 17, 'El Carmen', '55024');
INSERT INTO public.colonias VALUES (1594, 17, 'Ejidal Emiliano Zapata', '55024');
INSERT INTO public.colonias VALUES (1595, 17, 'San Benjamin', '55025');
INSERT INTO public.colonias VALUES (1596, 17, 'Santa Águeda', '55025');
INSERT INTO public.colonias VALUES (1597, 17, 'Los Sauces', '55025');
INSERT INTO public.colonias VALUES (1598, 17, 'Galaxia Ecatepec', '55025');
INSERT INTO public.colonias VALUES (1599, 17, 'Ampliación el Carmen', '55025');
INSERT INTO public.colonias VALUES (1600, 17, 'El Árbol', '55027');
INSERT INTO public.colonias VALUES (1601, 17, 'La Huerta', '55027');
INSERT INTO public.colonias VALUES (1602, 17, 'Vista Hermosa', '55028');
INSERT INTO public.colonias VALUES (1603, 17, 'Granjas Ecatepec 1a Sección', '55029');
INSERT INTO public.colonias VALUES (1604, 17, 'Granjas Ecatepec 2a Sección', '55029');
INSERT INTO public.colonias VALUES (1605, 17, 'Ehécatl (Paseos de Ecatepec)', '55029');
INSERT INTO public.colonias VALUES (1606, 17, 'Ejidos de San Andrés', '55029');
INSERT INTO public.colonias VALUES (1607, 17, 'San Francisco de Asís', '55029');
INSERT INTO public.colonias VALUES (1608, 17, 'Laguna del Rey', '55029');
INSERT INTO public.colonias VALUES (1609, 17, 'Luis Donaldo Colosio', '55029');
INSERT INTO public.colonias VALUES (1610, 17, 'Potrero de Rey', '55029');
INSERT INTO public.colonias VALUES (1611, 17, 'Abel Martínez Montañez', '55029');
INSERT INTO public.colonias VALUES (1612, 17, 'Playa Golondrinas', '55029');
INSERT INTO public.colonias VALUES (1613, 17, 'Golondrinas', '55029');
INSERT INTO public.colonias VALUES (1614, 17, 'Independencia', '55029');
INSERT INTO public.colonias VALUES (1615, 17, 'Colinas de Ecatepec', '55030');
INSERT INTO public.colonias VALUES (1616, 17, 'Chula Vista', '55030');
INSERT INTO public.colonias VALUES (1617, 17, 'Doce de Diciembre', '55030');
INSERT INTO public.colonias VALUES (1618, 17, 'Tata Félix', '55030');
INSERT INTO public.colonias VALUES (1619, 17, 'Hogares Marla', '55030');
INSERT INTO public.colonias VALUES (1620, 17, 'Izcalli Ecatepec', '55030');
INSERT INTO public.colonias VALUES (1621, 17, 'Ampliación Izcalli Ecatepec Tata Félix', '55030');
INSERT INTO public.colonias VALUES (1622, 17, 'La Curiela', '55030');
INSERT INTO public.colonias VALUES (1623, 17, 'La Mora', '55030');
INSERT INTO public.colonias VALUES (1624, 17, 'La Floresta', '55030');
INSERT INTO public.colonias VALUES (1625, 17, 'La Palma I', '55030');
INSERT INTO public.colonias VALUES (1626, 17, 'La Panorámica', '55036');
INSERT INTO public.colonias VALUES (1628, 17, 'Álamos de San Cristóbal', '55040');
INSERT INTO public.colonias VALUES (1629, 17, 'Boulevares Impala', '55040');
INSERT INTO public.colonias VALUES (1630, 17, 'Casas Coloniales Morelos', '55040');
INSERT INTO public.colonias VALUES (1631, 17, 'Fuentes de San Cristóbal', '55040');
INSERT INTO public.colonias VALUES (1632, 17, 'Hogares Mexicanos', '55040');
INSERT INTO public.colonias VALUES (1633, 17, 'Jardines de Ecatepec', '55040');
INSERT INTO public.colonias VALUES (1634, 17, 'La Propiedad', '55040');
INSERT INTO public.colonias VALUES (1635, 17, 'Renovación Jajalpa', '55040');
INSERT INTO public.colonias VALUES (1636, 17, 'San Juan Alcahuacan', '55040');
INSERT INTO public.colonias VALUES (1637, 17, 'El Salado', '55050');
INSERT INTO public.colonias VALUES (1638, 17, 'La Pradera', '55050');
INSERT INTO public.colonias VALUES (1639, 17, 'Vivienda del Taxista', '55050');
INSERT INTO public.colonias VALUES (1640, 17, 'Adolfo Ruiz Cortines', '55050');
INSERT INTO public.colonias VALUES (1641, 17, 'Aquiles Serdán', '55050');
INSERT INTO public.colonias VALUES (1642, 17, 'Bosques de Ecatepec', '55050');
INSERT INTO public.colonias VALUES (1643, 17, 'Residencial Fuentes de Ecatepec', '55050');
INSERT INTO public.colonias VALUES (1644, 17, 'Gustavo Baz Prada', '55050');
INSERT INTO public.colonias VALUES (1645, 17, 'Izcalli Jardines', '55050');
INSERT INTO public.colonias VALUES (1646, 17, 'Nuevo Díaz Ordaz', '55050');
INSERT INTO public.colonias VALUES (1647, 17, 'San Martín de Porres', '55050');
INSERT INTO public.colonias VALUES (1648, 17, 'Rinconada San Martín', '55050');
INSERT INTO public.colonias VALUES (1649, 17, 'Hacienda Santa María', '55050');
INSERT INTO public.colonias VALUES (1650, 17, 'Ex Rancho Jajalpa', '55050');
INSERT INTO public.colonias VALUES (1651, 17, 'Rancho Jajalpa', '55050');
INSERT INTO public.colonias VALUES (1652, 17, 'Pirules de Villancico 2a Sección', '55050');
INSERT INTO public.colonias VALUES (1653, 17, 'La Veleta', '55055');
INSERT INTO public.colonias VALUES (1654, 17, 'Jardines de los Báez 1a Sección', '55055');
INSERT INTO public.colonias VALUES (1655, 17, 'Jardines de los Báez 2a Sección', '55055');
INSERT INTO public.colonias VALUES (1656, 17, 'Jardines de los Báez 3a Sección', '55055');
INSERT INTO public.colonias VALUES (1657, 17, 'Llano de los Báez', '55055');
INSERT INTO public.colonias VALUES (1659, 17, 'Ampliación Llano de los Báez Sección Izcalli', '55055');
INSERT INTO public.colonias VALUES (1660, 17, 'Jubilados y Pensionados', '55055');
INSERT INTO public.colonias VALUES (1661, 17, 'El Sol de Ecatepec', '55055');
INSERT INTO public.colonias VALUES (1662, 17, 'Villas de Ecatepec', '55056');
INSERT INTO public.colonias VALUES (1663, 17, 'Pirules de Villancico 1a Sección', '55059');
INSERT INTO public.colonias VALUES (1664, 17, 'Venta de Carpio', '55060');
INSERT INTO public.colonias VALUES (1665, 17, 'La Guadalupana', '55060');
INSERT INTO public.colonias VALUES (1666, 17, 'Los Héroes Ecatepec Sección V', '55060');
INSERT INTO public.colonias VALUES (1667, 17, 'Privadas de Ecatepec', '55060');
INSERT INTO public.colonias VALUES (1668, 17, 'Ciudad Cuauhtémoc Sección Chiconautla 3000', '55063');
INSERT INTO public.colonias VALUES (1669, 17, 'Ciudad Cuauhtémoc Sección Nopalera I y II', '55064');
INSERT INTO public.colonias VALUES (1670, 17, 'San Isidro Atlautenco', '55064');
INSERT INTO public.colonias VALUES (1671, 17, 'Ampliación San Isidro Atlautenco', '55064');
INSERT INTO public.colonias VALUES (1673, 17, 'Vistas de Ecatepec (Sección B)', '55064');
INSERT INTO public.colonias VALUES (1674, 17, 'La Venta (La Guadalupana)', '55064');
INSERT INTO public.colonias VALUES (1675, 17, 'Vistas de Ecatepec (Sección A)', '55064');
INSERT INTO public.colonias VALUES (1676, 17, 'Joyas de Atlautenco', '55064');
INSERT INTO public.colonias VALUES (1677, 17, 'Santa Cruz Venta de Carpio', '55065');
INSERT INTO public.colonias VALUES (1678, 17, 'El Potrero', '55066');
INSERT INTO public.colonias VALUES (1679, 17, 'Terremote', '55066');
INSERT INTO public.colonias VALUES (1680, 17, 'Pirules de Bayisco', '55066');
INSERT INTO public.colonias VALUES (1681, 17, 'Casas Reales', '55066');
INSERT INTO public.colonias VALUES (1682, 17, 'Las Brisas', '55066');
INSERT INTO public.colonias VALUES (1683, 17, 'Santa María Chiconautla', '55066');
INSERT INTO public.colonias VALUES (1684, 17, 'Santo Tomás Chiconautla', '55066');
INSERT INTO public.colonias VALUES (1685, 17, 'Zopilocalco', '55066');
INSERT INTO public.colonias VALUES (1686, 17, 'Bosques de Santo Tomás', '55066');
INSERT INTO public.colonias VALUES (1687, 17, 'Portal Chiconautla', '55066');
INSERT INTO public.colonias VALUES (1688, 17, 'Campo Santo', '55066');
INSERT INTO public.colonias VALUES (1689, 17, 'Los Ídolos', '55066');
INSERT INTO public.colonias VALUES (1690, 17, 'Jaime Salvador', '55066');
INSERT INTO public.colonias VALUES (1691, 17, 'La Cerca', '55066');
INSERT INTO public.colonias VALUES (1692, 17, 'La Preciosa', '55066');
INSERT INTO public.colonias VALUES (1693, 17, 'México Nuevo', '55066');
INSERT INTO public.colonias VALUES (1694, 17, 'Ciudad Cuauhtémoc Sección Geo 2000', '55067');
INSERT INTO public.colonias VALUES (1695, 17, 'Ciudad Cuauhtémoc Sección Tepoztlaco', '55067');
INSERT INTO public.colonias VALUES (1696, 17, 'Ciudad Cuauhtémoc Sección Cuitlahuac', '55067');
INSERT INTO public.colonias VALUES (1697, 17, 'Ciudad Cuauhtémoc Sección Embajada', '55067');
INSERT INTO public.colonias VALUES (1698, 17, 'Ciudad Cuauhtémoc Sección Moctezuma', '55067');
INSERT INTO public.colonias VALUES (1699, 17, 'Ciudad Cuauhtémoc Sección Quetzalcoatl', '55067');
INSERT INTO public.colonias VALUES (1700, 17, 'Ciudad Cuauhtémoc Sección Tizoc', '55067');
INSERT INTO public.colonias VALUES (1701, 17, 'Ciudad Cuauhtémoc Sección Tonatiuh', '55067');
INSERT INTO public.colonias VALUES (1702, 17, 'Ciudad Cuauhtémoc Sección Xochiquetzal', '55067');
INSERT INTO public.colonias VALUES (1703, 17, 'Los Llanetes', '55067');
INSERT INTO public.colonias VALUES (1704, 17, 'Coyometla', '55067');
INSERT INTO public.colonias VALUES (1705, 17, 'Niños Héroes', '55067');
INSERT INTO public.colonias VALUES (1706, 17, 'Ciudad Cuauhtémoc Sección Tlaloc', '55067');
INSERT INTO public.colonias VALUES (1707, 17, 'La Fortaleza', '55067');
INSERT INTO public.colonias VALUES (1708, 17, 'Moneda de 100 Pesos', '55067');
INSERT INTO public.colonias VALUES (1709, 17, 'Tepetzingo el Chico', '55067');
INSERT INTO public.colonias VALUES (1710, 17, 'Ciudad Cuauhtémoc Sección Tepetzingo', '55067');
INSERT INTO public.colonias VALUES (1711, 17, 'C.T.M. Guadalupana', '55067');
INSERT INTO public.colonias VALUES (1712, 17, 'Tepopotla', '55067');
INSERT INTO public.colonias VALUES (1713, 17, 'El Hoyo del Tepetate', '55067');
INSERT INTO public.colonias VALUES (1715, 17, 'El Hoyo', '55068');
INSERT INTO public.colonias VALUES (1716, 17, 'Ignacio Pichardo Pagaza', '55068');
INSERT INTO public.colonias VALUES (1717, 17, 'El Mirador', '55068');
INSERT INTO public.colonias VALUES (1719, 17, 'Los Pajaritos', '55069');
INSERT INTO public.colonias VALUES (1720, 17, 'La Garita', '55069');
INSERT INTO public.colonias VALUES (1722, 17, 'Carlos Salinas de Gortari', '55070');
INSERT INTO public.colonias VALUES (1723, 17, 'Colonial Ecatepec', '55070');
INSERT INTO public.colonias VALUES (1724, 17, '19 de Septiembre', '55070');
INSERT INTO public.colonias VALUES (1725, 17, 'Ampliación 19 de Septiembre', '55070');
INSERT INTO public.colonias VALUES (1726, 17, 'Plan de Arroyo', '55070');
INSERT INTO public.colonias VALUES (1727, 17, 'Jardines de Morelos Sección Cerros', '55070');
INSERT INTO public.colonias VALUES (1728, 17, 'Jardines de Morelos Sección Elementos', '55070');
INSERT INTO public.colonias VALUES (1729, 17, 'Jardines de Morelos Sección Flores', '55070');
INSERT INTO public.colonias VALUES (1730, 17, 'Jardines de Morelos Sección Fuentes', '55070');
INSERT INTO public.colonias VALUES (1731, 17, 'Jardines de Morelos Sección Islas', '55070');
INSERT INTO public.colonias VALUES (1732, 17, 'Jardines de Morelos Sección Bosques', '55070');
INSERT INTO public.colonias VALUES (1733, 17, 'Jardines de Morelos Sección Lagos', '55070');
INSERT INTO public.colonias VALUES (1734, 17, 'Jardines de Morelos Sección Montes', '55070');
INSERT INTO public.colonias VALUES (1735, 17, 'Jardines de Morelos Sección Playas', '55070');
INSERT INTO public.colonias VALUES (1736, 17, 'Jardines de Morelos Sección Ríos', '55070');
INSERT INTO public.colonias VALUES (1737, 17, 'Llanos de Morelos I', '55070');
INSERT INTO public.colonias VALUES (1738, 17, 'Villas del Sol', '55070');
INSERT INTO public.colonias VALUES (1739, 17, 'Llanos de Morelos II', '55070');
INSERT INTO public.colonias VALUES (1740, 17, 'Sol II', '55070');
INSERT INTO public.colonias VALUES (1741, 17, 'Julia Marin', '55070');
INSERT INTO public.colonias VALUES (1742, 17, 'Profopec (Polígonos VII)', '55070');
INSERT INTO public.colonias VALUES (1743, 17, 'La Purísima', '55074');
INSERT INTO public.colonias VALUES (1744, 17, 'Mexicanos Unidos I', '55074');
INSERT INTO public.colonias VALUES (1745, 17, 'Playas de San Juan', '55074');
INSERT INTO public.colonias VALUES (1746, 17, 'Uprovi', '55074');
INSERT INTO public.colonias VALUES (1747, 17, 'Viento Nuevo', '55074');
INSERT INTO public.colonias VALUES (1748, 17, 'Los Alcatraces', '55074');
INSERT INTO public.colonias VALUES (1749, 17, 'Los Pinos', '55074');
INSERT INTO public.colonias VALUES (1750, 17, 'Ampliación 19 de Septiembre 1A Sección', '55074');
INSERT INTO public.colonias VALUES (1751, 17, 'Los Cordeles', '55074');
INSERT INTO public.colonias VALUES (1752, 17, 'Mexicanos Unidos II', '55074');
INSERT INTO public.colonias VALUES (1753, 17, 'Ejido de Atlautenco', '55074');
INSERT INTO public.colonias VALUES (1754, 17, 'Jardines de Morelos 5a Sección', '55075');
INSERT INTO public.colonias VALUES (1755, 17, 'Las Américas', '55076');
INSERT INTO public.colonias VALUES (1756, 17, 'Arboledas de San Carlos', '55080');
INSERT INTO public.colonias VALUES (1757, 17, 'Xochicuac I', '55080');
INSERT INTO public.colonias VALUES (1758, 17, 'El Bosque', '55080');
INSERT INTO public.colonias VALUES (1759, 17, 'Francisco Villa', '55080');
INSERT INTO public.colonias VALUES (1760, 17, 'Jesús Sánchez', '55080');
INSERT INTO public.colonias VALUES (1761, 17, 'Nuevo Laredo', '55080');
INSERT INTO public.colonias VALUES (1762, 17, 'Xochicuac II', '55080');
INSERT INTO public.colonias VALUES (1763, 17, 'Lomas de Ecatepec', '55080');
INSERT INTO public.colonias VALUES (1764, 17, 'Lomas de Atzolco', '55080');
INSERT INTO public.colonias VALUES (1766, 17, 'El Ranchito', '55084');
INSERT INTO public.colonias VALUES (1767, 17, 'Viveros Tulpetlac', '55085');
INSERT INTO public.colonias VALUES (1768, 17, 'Lomas de San Carlos Zona Comunal', '55087');
INSERT INTO public.colonias VALUES (1770, 17, 'El Arbolito Jajalpa', '55090');
INSERT INTO public.colonias VALUES (1771, 17, 'El Jaguey', '55090');
INSERT INTO public.colonias VALUES (1772, 17, 'San José Jajalpa', '55090');
INSERT INTO public.colonias VALUES (1773, 17, 'Jajalpa', '55090');
INSERT INTO public.colonias VALUES (1774, 17, 'Las Palmas Ecatepec', '55090');
INSERT INTO public.colonias VALUES (1775, 17, 'Los Laureles', '55090');
INSERT INTO public.colonias VALUES (1776, 17, 'Obrera Jajalpa', '55090');
INSERT INTO public.colonias VALUES (1777, 17, 'Jajalpa Olímpica', '55090');
INSERT INTO public.colonias VALUES (1778, 17, 'Río Piedras', '55090');
INSERT INTO public.colonias VALUES (1779, 17, 'Bonito Ecatepec', '55090');
INSERT INTO public.colonias VALUES (1780, 17, 'El Pocito', '55090');
INSERT INTO public.colonias VALUES (1781, 17, 'Ecatepec 40 Casas', '55090');
INSERT INTO public.colonias VALUES (1782, 17, 'Villas Jajalpa', '55094');
INSERT INTO public.colonias VALUES (1784, 17, 'Jardines de Cerro Gordo', '55100');
INSERT INTO public.colonias VALUES (1785, 17, 'Los Reyes Ecatepec', '55100');
INSERT INTO public.colonias VALUES (1786, 17, 'Río de Luz', '55100');
INSERT INTO public.colonias VALUES (1787, 17, 'Industrias Ecatepec', '55100');
INSERT INTO public.colonias VALUES (1788, 17, 'Tulpetlac', '55100');
INSERT INTO public.colonias VALUES (1789, 17, 'Francisco I. Madero', '55100');
INSERT INTO public.colonias VALUES (1790, 17, 'Villas 1o de Agosto', '55100');
INSERT INTO public.colonias VALUES (1791, 17, 'Pro Revolución', '55100');
INSERT INTO public.colonias VALUES (1792, 17, 'Viviendas Venta de Carpio', '55100');
INSERT INTO public.colonias VALUES (1793, 17, 'Primero de Mayo', '55100');
INSERT INTO public.colonias VALUES (1794, 17, 'Patrimonio Social', '55100');
INSERT INTO public.colonias VALUES (1795, 17, 'Villa 1o de Mayo', '55100');
INSERT INTO public.colonias VALUES (1796, 17, 'Granjas Populares Guadalupe Tulpetlac', '55104');
INSERT INTO public.colonias VALUES (1797, 17, 'El Paraíso', '55105');
INSERT INTO public.colonias VALUES (1798, 17, 'Ignacio L. Vallarta', '55105');
INSERT INTO public.colonias VALUES (1799, 17, 'Industrias Tulpetlac', '55107');
INSERT INTO public.colonias VALUES (1800, 17, 'Tolotzin I', '55114');
INSERT INTO public.colonias VALUES (1801, 17, 'José María Morelos y Pavón Sagitario X', '55115');
INSERT INTO public.colonias VALUES (1802, 17, 'Josefa Ortiz de Domínguez Sagitario VII', '55117');
INSERT INTO public.colonias VALUES (1803, 17, 'Alfredo del Mazo', '55118');
INSERT INTO public.colonias VALUES (1804, 17, 'Progreso de la Unión', '55118');
INSERT INTO public.colonias VALUES (1805, 17, 'Joyas de Ecatepec', '55118');
INSERT INTO public.colonias VALUES (1806, 17, 'Colonos de México (Alfredo Torres Martínez)', '55118');
INSERT INTO public.colonias VALUES (1807, 17, 'Juan de la Barrera', '55118');
INSERT INTO public.colonias VALUES (1808, 17, 'Ampliación Joyas de Ecatepec', '55118');
INSERT INTO public.colonias VALUES (1809, 17, 'Sosa Ecatepec', '55118');
INSERT INTO public.colonias VALUES (1810, 17, 'Cuchilla de la Draga', '55118');
INSERT INTO public.colonias VALUES (1811, 17, 'El Dique', '55119');
INSERT INTO public.colonias VALUES (1812, 17, 'Potrero Chico', '55119');
INSERT INTO public.colonias VALUES (1813, 17, 'Valle de Ecatepec Estado de México CTM XIII', '55119');
INSERT INTO public.colonias VALUES (1814, 17, 'Ciudad Azteca Sección Poniente', '55120');
INSERT INTO public.colonias VALUES (1815, 17, 'Ciudad Azteca Sección Oriente', '55120');
INSERT INTO public.colonias VALUES (1816, 17, 'Aldeas de Aragón I', '55125');
INSERT INTO public.colonias VALUES (1817, 17, 'Aldeas de Aragón II', '55125');
INSERT INTO public.colonias VALUES (1818, 17, 'Profopec (Polígono I)', '55126');
INSERT INTO public.colonias VALUES (1819, 17, 'Profopec IV (Polígono IV El Cegor)', '55127');
INSERT INTO public.colonias VALUES (1820, 17, 'José Antonio Torres', '55128');
INSERT INTO public.colonias VALUES (1821, 17, 'La Florida (Ciudad Azteca)', '55129');
INSERT INTO public.colonias VALUES (1822, 17, 'Josefa Ortiz de Domínguez', '55129');
INSERT INTO public.colonias VALUES (1823, 17, 'Nuevo Paseo de San Agustín', '55130');
INSERT INTO public.colonias VALUES (1824, 17, 'Nuevo Paseo de San Agustín 2a Secc', '55130');
INSERT INTO public.colonias VALUES (1825, 17, 'Nuevo Paseo de San Agustín 3a Sección', '55130');
INSERT INTO public.colonias VALUES (1826, 17, 'Olímpica 68 I', '55130');
INSERT INTO public.colonias VALUES (1827, 17, 'Plaza de Santa Clara', '55130');
INSERT INTO public.colonias VALUES (1828, 17, 'Vicente Coss Ramírez', '55130');
INSERT INTO public.colonias VALUES (1829, 17, 'Ciudad y Puerto', '55130');
INSERT INTO public.colonias VALUES (1830, 17, 'Nuevo Paseo San Agustín 3a B', '55130');
INSERT INTO public.colonias VALUES (1831, 17, 'Laderas del Peñón', '55135');
INSERT INTO public.colonias VALUES (1832, 17, 'INDECO Santa Clara (Campiñas de Aragón)', '55137');
INSERT INTO public.colonias VALUES (1833, 17, 'Valle de Santiago', '55138');
INSERT INTO public.colonias VALUES (1834, 17, 'Campiñas de Aragón', '55139');
INSERT INTO public.colonias VALUES (1835, 17, 'Jardines de Aragón', '55140');
INSERT INTO public.colonias VALUES (1836, 17, 'Rinconada de Aragón', '55140');
INSERT INTO public.colonias VALUES (1837, 17, 'Tolotzin II', '55146');
INSERT INTO public.colonias VALUES (1838, 17, 'Los Álamos', '55147');
INSERT INTO public.colonias VALUES (1839, 17, 'Villas de Aragón', '55148');
INSERT INTO public.colonias VALUES (1840, 17, 'Alborada de Aragón', '55148');
INSERT INTO public.colonias VALUES (1841, 17, 'Ignacio Allende', '55149');
INSERT INTO public.colonias VALUES (1842, 17, 'Profopec (Polígono II)', '55158');
INSERT INTO public.colonias VALUES (1843, 17, 'Central Michoacana', '55170');
INSERT INTO public.colonias VALUES (1844, 17, '16 de Septiembre', '55170');
INSERT INTO public.colonias VALUES (1845, 17, 'Sagitario IV', '55170');
INSERT INTO public.colonias VALUES (1846, 17, 'Profopec (Polígono V)', '55176');
INSERT INTO public.colonias VALUES (1847, 17, 'México Colonial II', '55180');
INSERT INTO public.colonias VALUES (1848, 17, 'Profopec (Polígono III)', '55187');
INSERT INTO public.colonias VALUES (1849, 17, 'México Colonial I', '55188');
INSERT INTO public.colonias VALUES (1850, 17, 'Novela Mexicana I', '55189');
INSERT INTO public.colonias VALUES (1851, 17, 'Lázaro Cárdenas V Zona', '55190');
INSERT INTO public.colonias VALUES (1852, 17, 'División del Norte', '55200');
INSERT INTO public.colonias VALUES (1853, 17, 'Emiliano Zapata 1a Sección', '55200');
INSERT INTO public.colonias VALUES (1854, 17, 'Gustavo Díaz Ordaz', '55200');
INSERT INTO public.colonias VALUES (1855, 17, 'Granjas Valle de Guadalupe Sección B', '55200');
INSERT INTO public.colonias VALUES (1856, 17, 'La Estrella', '55210');
INSERT INTO public.colonias VALUES (1857, 17, 'La Popular', '55210');
INSERT INTO public.colonias VALUES (1858, 17, 'Valle de Anáhuac Sección A', '55210');
INSERT INTO public.colonias VALUES (1859, 17, 'Cuchilla A. Rosales', '55218');
INSERT INTO public.colonias VALUES (1860, 17, 'Jardines de San Gabriel', '55220');
INSERT INTO public.colonias VALUES (1861, 17, 'Jardines del Tepeyac', '55220');
INSERT INTO public.colonias VALUES (1862, 17, 'Vicente Guerrero', '55220');
INSERT INTO public.colonias VALUES (1863, 17, 'Emiliano Zapata 1a Sección A', '55220');
INSERT INTO public.colonias VALUES (1864, 17, 'La Media Luna', '55230');
INSERT INTO public.colonias VALUES (1865, 17, 'La Glorieta', '55234');
INSERT INTO public.colonias VALUES (1866, 17, 'Unidad Obrero CTM XIV', '55235');
INSERT INTO public.colonias VALUES (1867, 17, 'Códice Mendocino II', '55236');
INSERT INTO public.colonias VALUES (1868, 17, 'Códice Mendocino I', '55236');
INSERT INTO public.colonias VALUES (1869, 17, 'Sagitario V', '55236');
INSERT INTO public.colonias VALUES (1870, 17, 'Ampliación Códice Mendocino', '55236');
INSERT INTO public.colonias VALUES (1871, 17, 'Estrella de Oriente', '55237');
INSERT INTO public.colonias VALUES (1872, 17, 'Ejercito del Trabajo II', '55238');
INSERT INTO public.colonias VALUES (1873, 17, 'Izcalli Santa Clara', '55238');
INSERT INTO public.colonias VALUES (1874, 17, 'Sagitario I', '55238');
INSERT INTO public.colonias VALUES (1875, 17, 'Felipe Ángeles (Antes Sagitario II)', '55238');
INSERT INTO public.colonias VALUES (1876, 17, 'Sagitario III', '55238');
INSERT INTO public.colonias VALUES (1877, 17, 'Alborada', '55240');
INSERT INTO public.colonias VALUES (1878, 17, 'La Florida', '55240');
INSERT INTO public.colonias VALUES (1879, 17, 'Melchor Muzquiz', '55240');
INSERT INTO public.colonias VALUES (1880, 17, 'Villas Cosmos', '55242');
INSERT INTO public.colonias VALUES (1881, 17, 'Haciendas de Aragón', '55243');
INSERT INTO public.colonias VALUES (1882, 17, 'Parques de Aragón', '55244');
INSERT INTO public.colonias VALUES (1883, 17, 'Paseos de Aragón', '55244');
INSERT INTO public.colonias VALUES (1884, 17, 'Castillos de Aragón', '55244');
INSERT INTO public.colonias VALUES (1885, 17, 'México Independiente', '55245');
INSERT INTO public.colonias VALUES (1886, 17, 'Petroquímica Ecatepec', '55246');
INSERT INTO public.colonias VALUES (1887, 17, 'Ciudad Oriente', '55247');
INSERT INTO public.colonias VALUES (1888, 17, 'CROC Aragón', '55247');
INSERT INTO public.colonias VALUES (1889, 17, 'Fuentes de Aragón', '55248');
INSERT INTO public.colonias VALUES (1890, 17, 'Ecatepec Federación (Mártires de Río Blanco)', '55249');
INSERT INTO public.colonias VALUES (1891, 17, 'Poesía Mexicana', '55249');
INSERT INTO public.colonias VALUES (1892, 17, 'Nueva Aragón', '55260');
INSERT INTO public.colonias VALUES (1893, 17, 'Prizo I', '55264');
INSERT INTO public.colonias VALUES (1894, 17, 'Prizo II', '55264');
INSERT INTO public.colonias VALUES (1895, 17, 'Fernando de Alba Nezahualpilli', '55264');
INSERT INTO public.colonias VALUES (1896, 17, 'Prizo III', '55264');
INSERT INTO public.colonias VALUES (1897, 17, 'México Insurgente', '55266');
INSERT INTO public.colonias VALUES (1898, 17, 'México Revolucionario', '55266');
INSERT INTO public.colonias VALUES (1899, 17, 'Ciudad Amanecer', '55267');
INSERT INTO public.colonias VALUES (1900, 17, 'Quinto Sol', '55267');
INSERT INTO public.colonias VALUES (1901, 17, 'Sauces V', '55267');
INSERT INTO public.colonias VALUES (1902, 17, 'Sauces II', '55267');
INSERT INTO public.colonias VALUES (1903, 17, 'Sauces VI', '55268');
INSERT INTO public.colonias VALUES (1904, 17, 'Sauces Coalición', '55268');
INSERT INTO public.colonias VALUES (1905, 17, 'Novela Mexicana II', '55268');
INSERT INTO public.colonias VALUES (1906, 17, 'Sauces I', '55269');
INSERT INTO public.colonias VALUES (1907, 17, 'México Prehispánico I', '55269');
INSERT INTO public.colonias VALUES (1908, 17, 'México Prehispánico II', '55269');
INSERT INTO public.colonias VALUES (1909, 17, 'Sauces P.R.I.', '55269');
INSERT INTO public.colonias VALUES (1910, 17, 'Emiliano Zapata 2a Secc', '55270');
INSERT INTO public.colonias VALUES (1911, 17, 'El Chamizal', '55270');
INSERT INTO public.colonias VALUES (1912, 17, 'Granjas Valle de Guadalupe Sección A', '55270');
INSERT INTO public.colonias VALUES (1913, 17, 'Granjas Valle de Guadalupe Sección C', '55270');
INSERT INTO public.colonias VALUES (1914, 17, 'Renacimiento de Aragón', '55280');
INSERT INTO public.colonias VALUES (1915, 17, 'Valle de Aragón 3ra. Sección Oriente', '55280');
INSERT INTO public.colonias VALUES (1916, 17, 'Ampliación Valle de Aragón Sección A', '55280');
INSERT INTO public.colonias VALUES (1917, 17, 'Valle de Aragón 3ra. Sección Poniente', '55280');
INSERT INTO public.colonias VALUES (1918, 17, 'Nuevo Valle de Aragón', '55280');
INSERT INTO public.colonias VALUES (1919, 17, 'Renacimiento Chico', '55284');
INSERT INTO public.colonias VALUES (1920, 17, 'Fernando Alba Ixtlaxóchitl', '55287');
INSERT INTO public.colonias VALUES (1921, 17, 'Nezahualpilli', '55288');
INSERT INTO public.colonias VALUES (1922, 17, 'Bugambilias de Aragón', '55289');
INSERT INTO public.colonias VALUES (1923, 17, 'Arboledas de Aragón', '55290');
INSERT INTO public.colonias VALUES (1924, 17, 'Granjas Independencia', '55290');
INSERT INTO public.colonias VALUES (1925, 17, 'Granjas Independencia Sección A', '55290');
INSERT INTO public.colonias VALUES (1926, 17, 'Granjas Independencia Sección B', '55290');
INSERT INTO public.colonias VALUES (1927, 17, 'Granjas Independencia Sección C', '55290');
INSERT INTO public.colonias VALUES (1928, 17, 'Solidaridad 90 (Mártires de Río Blanco)', '55290');
INSERT INTO public.colonias VALUES (1929, 17, 'Av. Central CROC', '55294');
INSERT INTO public.colonias VALUES (1930, 17, 'Licenciado Pedro Ojeda Paullada', '55295');
INSERT INTO public.colonias VALUES (1931, 17, 'Ampliación Pedro Ojeda Paullada', '55295');
INSERT INTO public.colonias VALUES (1932, 17, 'Ampliación Nicolás Bravo', '55295');
INSERT INTO public.colonias VALUES (1933, 17, 'Franja Valle de Guadalupe', '55295');
INSERT INTO public.colonias VALUES (1934, 17, 'Nicolás Bravo', '55296');
INSERT INTO public.colonias VALUES (1935, 17, 'A.S.A.', '55296');
INSERT INTO public.colonias VALUES (1936, 17, 'Las Flores de Aragón', '55296');
INSERT INTO public.colonias VALUES (1937, 17, 'Héroes de Granaditas', '55297');
INSERT INTO public.colonias VALUES (1938, 17, 'Ejercito del Trabajo III', '55298');
INSERT INTO public.colonias VALUES (1939, 17, 'Ejercito del Trabajo I', '55299');
INSERT INTO public.colonias VALUES (1940, 17, 'Piedra Grande', '55300');
INSERT INTO public.colonias VALUES (1941, 17, 'Benito Juárez Xalostoc Norte', '55308');
INSERT INTO public.colonias VALUES (1942, 17, 'Benito Juárez La Mesa', '55308');
INSERT INTO public.colonias VALUES (1943, 17, 'Cuauhtémoc Xalostoc', '55310');
INSERT INTO public.colonias VALUES (1944, 17, 'San Pedro Xalostoc', '55310');
INSERT INTO public.colonias VALUES (1945, 17, 'Ampliación San Pedro Xalostoc', '55316');
INSERT INTO public.colonias VALUES (1946, 17, 'El Arbolito Xalostoc', '55317');
INSERT INTO public.colonias VALUES (1947, 17, 'El Cardonal Xalostoc', '55320');
INSERT INTO public.colonias VALUES (1948, 17, 'El Nardo', '55320');
INSERT INTO public.colonias VALUES (1949, 17, 'Esfuerzo Nacional', '55320');
INSERT INTO public.colonias VALUES (1950, 17, 'Santa María Xalostoc', '55320');
INSERT INTO public.colonias VALUES (1951, 17, 'Tolotzin V', '55330');
INSERT INTO public.colonias VALUES (1952, 17, '5 de Septiembre', '55330');
INSERT INTO public.colonias VALUES (1953, 17, 'Jardines de Xalostoc', '55330');
INSERT INTO public.colonias VALUES (1954, 17, 'Las Vegas Xalostoc', '55330');
INSERT INTO public.colonias VALUES (1955, 17, 'San Francisco Xalostoc', '55330');
INSERT INTO public.colonias VALUES (1956, 17, 'Ampliación San Francisco Xalostoc', '55330');
INSERT INTO public.colonias VALUES (1957, 17, 'Prados de Xalostoc', '55330');
INSERT INTO public.colonias VALUES (1958, 17, 'La Laguna 21', '55330');
INSERT INTO public.colonias VALUES (1959, 17, 'Melchor Ocampo', '55338');
INSERT INTO public.colonias VALUES (1960, 17, 'Villas de Guadalupe Xalostoc', '55339');
INSERT INTO public.colonias VALUES (1961, 17, 'Benito Juárez Xalostoc', '55340');
INSERT INTO public.colonias VALUES (1962, 17, 'Rustica Xalostoc', '55340');
INSERT INTO public.colonias VALUES (1963, 17, 'Viveros de Xalostoc', '55340');
INSERT INTO public.colonias VALUES (1964, 17, 'Ampliación San José Xalostoc', '55347');
INSERT INTO public.colonias VALUES (1965, 17, 'Parque Industrial Xalostoc', '55348');
INSERT INTO public.colonias VALUES (1966, 17, 'Urbana Ixhuatepec', '55349');
INSERT INTO public.colonias VALUES (1968, 17, 'San José Xalostoc', '55360');
INSERT INTO public.colonias VALUES (1969, 17, 'Ampliación San Miguel Xalostoc', '55369');
INSERT INTO public.colonias VALUES (1970, 17, 'Altavilla', '55390');
INSERT INTO public.colonias VALUES (1971, 17, 'San Miguel Xalostoc', '55390');
INSERT INTO public.colonias VALUES (1972, 17, 'Santa María Tulpetlac', '55400');
INSERT INTO public.colonias VALUES (1973, 17, 'Aldeas I', '55400');
INSERT INTO public.colonias VALUES (1974, 17, 'Aldeas II', '55400');
INSERT INTO public.colonias VALUES (1975, 17, 'Nieves', '55400');
INSERT INTO public.colonias VALUES (1976, 17, 'ISSEMYM', '55400');
INSERT INTO public.colonias VALUES (1977, 17, 'Ejido de Santa María Tulpetlac', '55404');
INSERT INTO public.colonias VALUES (1978, 17, 'Ecatepec las Fuentes', '55404');
INSERT INTO public.colonias VALUES (1979, 17, 'El Charco', '55404');
INSERT INTO public.colonias VALUES (1980, 17, 'El Chamizalito', '55404');
INSERT INTO public.colonias VALUES (1981, 17, 'El Charco II', '55404');
INSERT INTO public.colonias VALUES (1983, 17, 'Talleres Gráficos', '55407');
INSERT INTO public.colonias VALUES (1984, 17, 'Cuchilla Lázaro Cárdenas', '55407');
INSERT INTO public.colonias VALUES (1985, 17, 'Tecuescomac', '55410');
INSERT INTO public.colonias VALUES (1986, 17, 'Lomas de San Carlos Cantera', '55410');
INSERT INTO public.colonias VALUES (1987, 17, 'El Ostor', '55410');
INSERT INTO public.colonias VALUES (1988, 17, 'Xochitenco', '55414');
INSERT INTO public.colonias VALUES (1989, 17, 'El Parque', '55414');
INSERT INTO public.colonias VALUES (1990, 17, 'Nueva Rufino Tamayo', '55414');
INSERT INTO public.colonias VALUES (1991, 17, 'Tepetlac Texalpa', '55414');
INSERT INTO public.colonias VALUES (1992, 17, 'La Nopalera 2a. Sección Tulpetlac', '55414');
INSERT INTO public.colonias VALUES (1993, 17, 'Lomas Verdes Tlaljuyaca', '55414');
INSERT INTO public.colonias VALUES (1994, 17, 'Margarita Maza de Juárez', '55414');
INSERT INTO public.colonias VALUES (1995, 17, 'Buenos Aires', '55415');
INSERT INTO public.colonias VALUES (1996, 17, 'El Rosal', '55415');
INSERT INTO public.colonias VALUES (1997, 17, 'Mexihuiloya', '55415');
INSERT INTO public.colonias VALUES (1998, 17, 'El Almarcigo Norte', '55415');
INSERT INTO public.colonias VALUES (1999, 17, 'El Almarcigo Sur', '55415');
INSERT INTO public.colonias VALUES (2000, 17, 'Ampliación Almarcigo', '55415');
INSERT INTO public.colonias VALUES (2001, 17, 'Texalpa', '55416');
INSERT INTO public.colonias VALUES (2002, 17, 'Benito Juárez 1ra. Sección', '55416');
INSERT INTO public.colonias VALUES (2003, 17, 'Benito Juárez 2da. Sección', '55416');
INSERT INTO public.colonias VALUES (2004, 17, 'Benito Juárez 3ra. Sección', '55416');
INSERT INTO public.colonias VALUES (2005, 17, 'La Virgen', '55416');
INSERT INTO public.colonias VALUES (2006, 17, 'Progreso Tlajoyuca', '55416');
INSERT INTO public.colonias VALUES (2007, 17, 'Guadalupe Coatzochico', '55417');
INSERT INTO public.colonias VALUES (2008, 17, 'Mexicalco I', '55418');
INSERT INTO public.colonias VALUES (2009, 17, 'Rufino Tamayo', '55418');
INSERT INTO public.colonias VALUES (2010, 17, 'Ampliación Santa María Tulpetlac', '55418');
INSERT INTO public.colonias VALUES (2011, 17, 'Cuauhtémoc', '55418');
INSERT INTO public.colonias VALUES (2012, 17, 'El Callejón', '55418');
INSERT INTO public.colonias VALUES (2013, 17, 'Progreso Chico Tulpetlac', '55418');
INSERT INTO public.colonias VALUES (2014, 17, 'Villas Tulpetlac', '55418');
INSERT INTO public.colonias VALUES (2015, 17, 'Mexicalco II y IV', '55418');
INSERT INTO public.colonias VALUES (2016, 17, 'Mexicalco III', '55418');
INSERT INTO public.colonias VALUES (2017, 17, 'Tlatempa', '55419');
INSERT INTO public.colonias VALUES (2018, 17, 'El Cortijo', '55419');
INSERT INTO public.colonias VALUES (2019, 17, 'Cerro Gordo', '55420');
INSERT INTO public.colonias VALUES (2021, 17, 'Bellavista', '55429');
INSERT INTO public.colonias VALUES (2022, 17, 'Tepetzicasco', '55429');
INSERT INTO public.colonias VALUES (2023, 17, 'La Cuesta Santa Clara', '55429');
INSERT INTO public.colonias VALUES (2024, 17, 'José María Pino Suárez', '55430');
INSERT INTO public.colonias VALUES (2025, 17, 'Jardines de Casa Nueva', '55430');
INSERT INTO public.colonias VALUES (2026, 17, 'Conjunto Ejecutivo', '55430');
INSERT INTO public.colonias VALUES (2027, 17, 'Junta de San Juan', '55430');
INSERT INTO public.colonias VALUES (2028, 17, 'Jardines de Santa Clara', '55450');
INSERT INTO public.colonias VALUES (2029, 17, 'Prados de Santa Clara', '55450');
INSERT INTO public.colonias VALUES (2030, 17, 'Conjunto Guanajuato', '55458');
INSERT INTO public.colonias VALUES (2031, 17, 'América Santa Clara', '55459');
INSERT INTO public.colonias VALUES (2032, 17, 'Faja de Oro', '55490');
INSERT INTO public.colonias VALUES (2033, 17, 'Miguel Hidalgo', '55490');
INSERT INTO public.colonias VALUES (2034, 17, 'Finca San Miguel', '55490');
INSERT INTO public.colonias VALUES (2035, 17, 'Héroes de la Independencia', '55498');
INSERT INTO public.colonias VALUES (2036, 17, 'Conjunto Tepeyac Hidalgo', '55500');
INSERT INTO public.colonias VALUES (2037, 17, 'Buenavista', '55506');
INSERT INTO public.colonias VALUES (2038, 17, 'La Palma', '55507');
INSERT INTO public.colonias VALUES (2039, 17, 'Ampliación Coanalco', '55508');
INSERT INTO public.colonias VALUES (2040, 17, 'Coanalco Buenavista', '55508');
INSERT INTO public.colonias VALUES (2041, 17, 'La Presa', '55509');
INSERT INTO public.colonias VALUES (2042, 17, 'Plan de Ayala', '55509');
INSERT INTO public.colonias VALUES (2043, 17, 'Tablas del Pozo', '55510');
INSERT INTO public.colonias VALUES (2044, 17, 'Tepeolulco', '55510');
INSERT INTO public.colonias VALUES (2045, 17, 'El Pozo', '55510');
INSERT INTO public.colonias VALUES (2046, 17, 'Los Bordos', '55515');
INSERT INTO public.colonias VALUES (2047, 17, 'La Teja', '55515');
INSERT INTO public.colonias VALUES (2048, 17, 'Boca Barranca', '55516');
INSERT INTO public.colonias VALUES (2050, 17, 'La Agüita', '55518');
INSERT INTO public.colonias VALUES (2051, 17, 'La Lomita', '55518');
INSERT INTO public.colonias VALUES (2052, 17, 'Arboledas de Xalostoc', '55518');
INSERT INTO public.colonias VALUES (2053, 17, 'San Andrés de la Cañada', '55519');
INSERT INTO public.colonias VALUES (2054, 17, 'La Esperanza', '55519');
INSERT INTO public.colonias VALUES (2055, 17, 'Carlos Hank González', '55520');
INSERT INTO public.colonias VALUES (2056, 17, 'El Gallito', '55530');
INSERT INTO public.colonias VALUES (2057, 17, 'San Jaco (El Gallito)', '55530');
INSERT INTO public.colonias VALUES (2058, 17, 'Santa Clara', '55530');
INSERT INTO public.colonias VALUES (2060, 17, 'Santa Clara Coatitla', '55540');
INSERT INTO public.colonias VALUES (2061, 17, 'Real de Santa Clara', '55540');
INSERT INTO public.colonias VALUES (2062, 17, 'Rinconada de Santa Clara', '55540');
INSERT INTO public.colonias VALUES (2064, 17, 'Área Zapotecas', '55548');
INSERT INTO public.colonias VALUES (2065, 17, 'Cantera Guadalupana', '55548');
INSERT INTO public.colonias VALUES (2066, 17, 'Dos de Octubre', '55548');
INSERT INTO public.colonias VALUES (2067, 17, 'Área Santa Cruz', '55549');
INSERT INTO public.colonias VALUES (2068, 18, 'Toluca de Lerdo Centro', '50000');
INSERT INTO public.colonias VALUES (2069, 18, 'Celanese', '50010');
INSERT INTO public.colonias VALUES (2070, 18, 'Club Jardín', '50010');
INSERT INTO public.colonias VALUES (2071, 18, 'Guadalupe', '50010');
INSERT INTO public.colonias VALUES (2072, 18, 'La Cruz Comalco', '50010');
INSERT INTO public.colonias VALUES (2073, 18, 'La Magdalena', '50010');
INSERT INTO public.colonias VALUES (2074, 18, 'Los Girasoles', '50010');
INSERT INTO public.colonias VALUES (2075, 18, 'Los Girasoles II', '50010');
INSERT INTO public.colonias VALUES (2076, 18, 'Los Girasoles III', '50010');
INSERT INTO public.colonias VALUES (2077, 18, 'Los Girasoles IV', '50010');
INSERT INTO public.colonias VALUES (2078, 18, 'San Lorenzo Tepaltitlán Centro', '50010');
INSERT INTO public.colonias VALUES (2079, 18, 'Tlacopa', '50010');
INSERT INTO public.colonias VALUES (2080, 18, 'Universidad', '50010');
INSERT INTO public.colonias VALUES (2081, 18, 'Las Flores', '50010');
INSERT INTO public.colonias VALUES (2082, 18, 'San Angelín', '50010');
INSERT INTO public.colonias VALUES (2083, 18, 'Galaxias de San Lorenzo', '50010');
INSERT INTO public.colonias VALUES (2084, 18, 'El Tejocote', '50010');
INSERT INTO public.colonias VALUES (2085, 18, 'El Balcón', '50010');
INSERT INTO public.colonias VALUES (2086, 18, 'Los Girasoles I', '50010');
INSERT INTO public.colonias VALUES (2087, 18, 'San Juan de la Cruz', '50010');
INSERT INTO public.colonias VALUES (2088, 18, 'Hacienda San Agustín', '50010');
INSERT INTO public.colonias VALUES (2089, 18, 'La Loma', '50010');
INSERT INTO public.colonias VALUES (2090, 18, 'Del Panteón', '50010');
INSERT INTO public.colonias VALUES (2091, 18, 'Villas Tepaltitlán', '50010');
INSERT INTO public.colonias VALUES (2092, 18, 'Gran Morada', '50010');
INSERT INTO public.colonias VALUES (2093, 18, 'Jardines de la Crespa', '50016');
INSERT INTO public.colonias VALUES (2094, 18, 'Parque industrial San Antonio', '50016');
INSERT INTO public.colonias VALUES (2095, 18, 'De la Crespa', '50016');
INSERT INTO public.colonias VALUES (2096, 18, 'Brisas', '50017');
INSERT INTO public.colonias VALUES (2097, 18, 'Rincón de San Lorenzo', '50017');
INSERT INTO public.colonias VALUES (2098, 18, 'Bosques de la Mora', '50020');
INSERT INTO public.colonias VALUES (2099, 18, 'Los Ángeles', '50020');
INSERT INTO public.colonias VALUES (2100, 18, 'Rancho la Mora', '50020');
INSERT INTO public.colonias VALUES (2101, 18, 'Rinconada de la Mora', '50020');
INSERT INTO public.colonias VALUES (2102, 18, 'Santiago Miltepec', '50020');
INSERT INTO public.colonias VALUES (2103, 18, '3 Caminos', '50020');
INSERT INTO public.colonias VALUES (2104, 18, 'Valle de Santiago Residencial', '50020');
INSERT INTO public.colonias VALUES (2105, 18, 'Los Frailes', '50026');
INSERT INTO public.colonias VALUES (2106, 18, 'Carlos Hank González', '50026');
INSERT INTO public.colonias VALUES (2107, 18, 'La Retama', '50040');
INSERT INTO public.colonias VALUES (2108, 18, 'La Teresona', '50040');
INSERT INTO public.colonias VALUES (2109, 18, 'Unión', '50040');
INSERT INTO public.colonias VALUES (2110, 18, 'San Luis Obispo', '50040');
INSERT INTO public.colonias VALUES (2111, 18, 'San Miguel Apinahuizco', '50040');
INSERT INTO public.colonias VALUES (2112, 18, 'Sector Popular', '50040');
INSERT INTO public.colonias VALUES (2113, 18, 'Sor Juana Inés de la Cruz', '50040');
INSERT INTO public.colonias VALUES (2114, 18, 'Electricistas Locales', '50040');
INSERT INTO public.colonias VALUES (2115, 18, 'El Cóporo', '50050');
INSERT INTO public.colonias VALUES (2116, 18, 'Santa Bárbara', '50050');
INSERT INTO public.colonias VALUES (2117, 18, 'Zopilocalco Sur', '50050');
INSERT INTO public.colonias VALUES (2118, 18, 'Zopilocalco Norte', '50050');
INSERT INTO public.colonias VALUES (2119, 18, 'Doctores', '50060');
INSERT INTO public.colonias VALUES (2120, 18, 'Lomas Altas', '50060');
INSERT INTO public.colonias VALUES (2121, 18, 'Niños Héroes (Pensiones)', '50060');
INSERT INTO public.colonias VALUES (2122, 18, 'San Juan Buenavista', '50060');
INSERT INTO public.colonias VALUES (2123, 18, 'Huitzila', '50060');
INSERT INTO public.colonias VALUES (2124, 18, 'Independencia', '50070');
INSERT INTO public.colonias VALUES (2125, 18, 'Meteoro', '50070');
INSERT INTO public.colonias VALUES (2126, 18, 'Villas Fontana I', '50070');
INSERT INTO public.colonias VALUES (2127, 18, 'Villas Fontana II', '50070');
INSERT INTO public.colonias VALUES (2128, 18, 'Fidel Velázquez', '50070');
INSERT INTO public.colonias VALUES (2129, 18, 'Reforma y Ferrocarriles Nacionales', '50070');
INSERT INTO public.colonias VALUES (2130, 18, 'Toluca', '50071');
INSERT INTO public.colonias VALUES (2131, 18, 'Las Torres', '50075');
INSERT INTO public.colonias VALUES (2132, 18, 'Científicos', '50075');
INSERT INTO public.colonias VALUES (2133, 18, 'La Merced (Alameda)', '50080');
INSERT INTO public.colonias VALUES (2134, 18, 'San Bernardino', '50080');
INSERT INTO public.colonias VALUES (2135, 18, '5 de Mayo', '50090');
INSERT INTO public.colonias VALUES (2136, 18, 'Santa Clara', '50090');
INSERT INTO public.colonias VALUES (2137, 18, 'Bosques de San Mateo', '50100');
INSERT INTO public.colonias VALUES (2138, 18, '14 de Diciembre', '50100');
INSERT INTO public.colonias VALUES (2139, 18, 'El Trigo', '50100');
INSERT INTO public.colonias VALUES (2140, 18, 'La Joya', '50100');
INSERT INTO public.colonias VALUES (2141, 18, 'La Ribera I', '50100');
INSERT INTO public.colonias VALUES (2142, 18, 'La Ribera II', '50100');
INSERT INTO public.colonias VALUES (2143, 18, 'La Ribera III', '50100');
INSERT INTO public.colonias VALUES (2144, 18, 'Miguel Hidalgo (Corralitos)', '50100');
INSERT INTO public.colonias VALUES (2145, 18, 'Niños Héroes', '50100');
INSERT INTO public.colonias VALUES (2146, 18, 'Nueva Oxtotitlán', '50100');
INSERT INTO public.colonias VALUES (2147, 18, 'Parque de San Mateo', '50100');
INSERT INTO public.colonias VALUES (2148, 18, 'Parques Nacionales', '50100');
INSERT INTO public.colonias VALUES (2149, 18, 'Protinbos', '50100');
INSERT INTO public.colonias VALUES (2150, 18, 'Rincón del Parque', '50100');
INSERT INTO public.colonias VALUES (2151, 18, 'San Mateo Oxtotitlán', '50100');
INSERT INTO public.colonias VALUES (2152, 18, 'Ex-Hacienda San Jorge', '50100');
INSERT INTO public.colonias VALUES (2153, 18, 'Tlayaca', '50100');
INSERT INTO public.colonias VALUES (2154, 18, 'Tlanepantla', '50100');
INSERT INTO public.colonias VALUES (2155, 18, 'Atotonilco', '50100');
INSERT INTO public.colonias VALUES (2156, 18, 'Lomas de San Mateo', '50100');
INSERT INTO public.colonias VALUES (2157, 18, 'Cultural', '50110');
INSERT INTO public.colonias VALUES (2158, 18, 'Del Deporte', '50110');
INSERT INTO public.colonias VALUES (2159, 18, 'Guadalupe San Buenaventura', '50110');
INSERT INTO public.colonias VALUES (2160, 18, 'Plazas de San Buenaventura', '50110');
INSERT INTO public.colonias VALUES (2161, 18, 'San Buenaventura', '50110');
INSERT INTO public.colonias VALUES (2162, 18, 'Vicente Guerrero', '50110');
INSERT INTO public.colonias VALUES (2163, 18, 'Villas de San Buenaventura', '50110');
INSERT INTO public.colonias VALUES (2164, 18, 'Real del Bosque', '50110');
INSERT INTO public.colonias VALUES (2165, 18, 'Loma Bonita', '50115');
INSERT INTO public.colonias VALUES (2166, 18, 'Ciprés', '50120');
INSERT INTO public.colonias VALUES (2167, 18, 'Federal (Adolfo López Mateos)', '50120');
INSERT INTO public.colonias VALUES (2168, 18, 'Granjas', '50120');
INSERT INTO public.colonias VALUES (2169, 18, 'Morelos 1a Sección', '50120');
INSERT INTO public.colonias VALUES (2170, 18, 'Morelos 2a Secc', '50120');
INSERT INTO public.colonias VALUES (2171, 18, 'Residencial Colón', '50120');
INSERT INTO public.colonias VALUES (2172, 18, 'Tollocan INFONAVIT', '50120');
INSERT INTO public.colonias VALUES (2173, 18, 'Zona Militar', '50122');
INSERT INTO public.colonias VALUES (2174, 18, 'Altamirano', '50130');
INSERT INTO public.colonias VALUES (2175, 18, 'Américas', '50130');
INSERT INTO public.colonias VALUES (2176, 18, 'Cuauhtémoc', '50130');
INSERT INTO public.colonias VALUES (2177, 18, 'Francisco Murguía El Ranchito', '50130');
INSERT INTO public.colonias VALUES (2179, 18, 'Nueva Santa María de las Rosas', '50140');
INSERT INTO public.colonias VALUES (2180, 18, 'Nueva Santa María', '50140');
INSERT INTO public.colonias VALUES (2181, 18, 'Santa María de las Rosas', '50140');
INSERT INTO public.colonias VALUES (2182, 18, 'Valle Don Camilo', '50140');
INSERT INTO public.colonias VALUES (2183, 18, 'Valle Verde', '50140');
INSERT INTO public.colonias VALUES (2184, 18, 'Villas Florencia', '50140');
INSERT INTO public.colonias VALUES (2185, 18, 'Terminal', '50140');
INSERT INTO public.colonias VALUES (2186, 18, 'San Sebastián', '50150');
INSERT INTO public.colonias VALUES (2187, 18, 'Izcalli IPIEM', '50150');
INSERT INTO public.colonias VALUES (2188, 18, 'Izcalli Toluca', '50150');
INSERT INTO public.colonias VALUES (2189, 18, 'Juan Beltrán', '50150');
INSERT INTO public.colonias VALUES (2190, 18, 'Progreso', '50150');
INSERT INTO public.colonias VALUES (2191, 18, 'Salvador Sánchez Colín', '50150');
INSERT INTO public.colonias VALUES (2192, 18, 'Vértice', '50150');
INSERT INTO public.colonias VALUES (2193, 18, 'Comisión Federal de Electricidad', '50150');
INSERT INTO public.colonias VALUES (2194, 18, 'Santa Ana Tlapaltitlán', '50160');
INSERT INTO public.colonias VALUES (2195, 18, 'Villas de Santa Ana I', '50160');
INSERT INTO public.colonias VALUES (2196, 18, 'Villas de Santa Ana II', '50160');
INSERT INTO public.colonias VALUES (2197, 18, 'Villas de Santa Ana III', '50160');
INSERT INTO public.colonias VALUES (2198, 18, 'Villas de Santa Ana IV', '50160');
INSERT INTO public.colonias VALUES (2199, 18, 'Villas de Santa Ana V', '50160');
INSERT INTO public.colonias VALUES (2200, 18, 'Villas de Santa Ana VI', '50160');
INSERT INTO public.colonias VALUES (2201, 18, 'Villas de Santa Ana VII', '50160');
INSERT INTO public.colonias VALUES (2202, 18, 'Villas de Santa Ana', '50160');
INSERT INTO public.colonias VALUES (2203, 18, 'La Machincuepa', '50168');
INSERT INTO public.colonias VALUES (2204, 18, 'Santa María Zozoquilpan', '50168');
INSERT INTO public.colonias VALUES (2205, 18, 'Héroes del 5 de Mayo', '50170');
INSERT INTO public.colonias VALUES (2206, 18, 'Isidro Fabela 1a Sección', '50170');
INSERT INTO public.colonias VALUES (2207, 18, 'Las Haciendas', '50170');
INSERT INTO public.colonias VALUES (2208, 18, 'Ocho Cedros', '50170');
INSERT INTO public.colonias VALUES (2209, 18, 'El Seminario 1a Sección', '50170');
INSERT INTO public.colonias VALUES (2210, 18, 'El Seminario 2a Sección', '50170');
INSERT INTO public.colonias VALUES (2211, 18, 'El Seminario 3a Sección', '50170');
INSERT INTO public.colonias VALUES (2212, 18, 'El Seminario 4a Sección', '50170');
INSERT INTO public.colonias VALUES (2213, 18, 'El Seminario 5a Sección', '50170');
INSERT INTO public.colonias VALUES (2214, 18, 'Villa Hogar', '50170');
INSERT INTO public.colonias VALUES (2215, 18, 'Isidro Fabela 2a Sección', '50170');
INSERT INTO public.colonias VALUES (2216, 18, 'Ocho Cedros 2a Sección', '50170');
INSERT INTO public.colonias VALUES (2217, 18, 'San Fermín Residencial', '50180');
INSERT INTO public.colonias VALUES (2218, 18, 'Azteca', '50180');
INSERT INTO public.colonias VALUES (2219, 18, 'Bosques de Colón', '50180');
INSERT INTO public.colonias VALUES (2220, 18, 'Del Parque', '50180');
INSERT INTO public.colonias VALUES (2221, 18, 'Hermanos de la Vega', '50180');
INSERT INTO public.colonias VALUES (2222, 18, 'Lázaro Cárdenas', '50180');
INSERT INTO public.colonias VALUES (2223, 18, 'Ampliación Lázaro Cárdenas', '50180');
INSERT INTO public.colonias VALUES (2224, 18, 'Moderna de la Cruz', '50180');
INSERT INTO public.colonias VALUES (2226, 18, 'Benito Juárez', '50190');
INSERT INTO public.colonias VALUES (2227, 18, 'Emiliano Zapata', '50190');
INSERT INTO public.colonias VALUES (2228, 18, 'Eva Sámano de López Mateos', '50190');
INSERT INTO public.colonias VALUES (2229, 18, 'Unidad Victoria', '50190');
INSERT INTO public.colonias VALUES (2230, 18, 'San Cristóbal Huichochitlán', '50200');
INSERT INTO public.colonias VALUES (2231, 18, 'San Andrés Cuexcontitlán', '50200');
INSERT INTO public.colonias VALUES (2232, 18, 'La Trinidad', '50200');
INSERT INTO public.colonias VALUES (2233, 18, 'Barrio San Gabriel', '50200');
INSERT INTO public.colonias VALUES (2234, 18, 'Armando Neyra Chavez', '50200');
INSERT INTO public.colonias VALUES (2235, 18, 'Natividad', '50200');
INSERT INTO public.colonias VALUES (2236, 18, 'La Concepción', '50200');
INSERT INTO public.colonias VALUES (2237, 18, 'Santa Rosa', '50200');
INSERT INTO public.colonias VALUES (2238, 18, 'San José Guadalupe', '50200');
INSERT INTO public.colonias VALUES (2239, 18, 'San Salvador', '50200');
INSERT INTO public.colonias VALUES (2240, 18, 'Paseos del Pilar', '50200');
INSERT INTO public.colonias VALUES (2241, 18, 'Ejido de la Y Sección Siete A Revolución', '50205');
INSERT INTO public.colonias VALUES (2242, 18, 'Jicaltepec Cuexcontitlán', '50205');
INSERT INTO public.colonias VALUES (2243, 18, 'San Diego de los Padres Cuexcontitlán', '50205');
INSERT INTO public.colonias VALUES (2244, 18, 'San Diego de los Padres Otzacatipan', '50205');
INSERT INTO public.colonias VALUES (2245, 18, 'San Diego Linares', '50206');
INSERT INTO public.colonias VALUES (2246, 18, 'La Loma Cuexcontitlán', '50206');
INSERT INTO public.colonias VALUES (2247, 18, 'Toluca (Licenciado Adolfo López Mateos)', '50209');
INSERT INTO public.colonias VALUES (2248, 18, 'Fuentes de San José', '50210');
INSERT INTO public.colonias VALUES (2249, 18, 'Paseo Arboleda', '50210');
INSERT INTO public.colonias VALUES (2250, 18, 'Áurea', '50210');
INSERT INTO public.colonias VALUES (2251, 18, 'Los Sauces I', '50210');
INSERT INTO public.colonias VALUES (2252, 18, 'Los Sauces II', '50210');
INSERT INTO public.colonias VALUES (2253, 18, 'Los Sauces III', '50210');
INSERT INTO public.colonias VALUES (2254, 18, 'Ex Hacienda San José', '50210');
INSERT INTO public.colonias VALUES (2255, 18, 'Santa Cruz Otzacatipan', '50210');
INSERT INTO public.colonias VALUES (2256, 18, 'Los Sauces IV', '50210');
INSERT INTO public.colonias VALUES (2257, 18, 'Los Sauces V', '50210');
INSERT INTO public.colonias VALUES (2258, 18, 'Valle de la Hacienda', '50210');
INSERT INTO public.colonias VALUES (2259, 18, 'Hacienda del Valle II', '50210');
INSERT INTO public.colonias VALUES (2260, 18, 'Bosques de Cantabria', '50210');
INSERT INTO public.colonias VALUES (2261, 18, 'La Magdalena Otzacatipan', '50210');
INSERT INTO public.colonias VALUES (2262, 18, 'Villa Mane', '50210');
INSERT INTO public.colonias VALUES (2263, 18, 'Hacienda del Valle I', '50210');
INSERT INTO public.colonias VALUES (2264, 18, 'Valle de San José', '50210');
INSERT INTO public.colonias VALUES (2265, 18, 'Villas Santín', '50214');
INSERT INTO public.colonias VALUES (2266, 18, 'Balcones Santín', '50214');
INSERT INTO public.colonias VALUES (2267, 18, 'Paseos Santín', '50214');
INSERT INTO public.colonias VALUES (2268, 18, 'San Mateo Otzacatipan', '50220');
INSERT INTO public.colonias VALUES (2269, 18, 'Villa Tulipanes', '50220');
INSERT INTO public.colonias VALUES (2270, 18, 'Villas de San Mateo', '50220');
INSERT INTO public.colonias VALUES (2271, 18, 'De Canaleja', '50220');
INSERT INTO public.colonias VALUES (2272, 18, 'Parque industrial Exportec II', '50223');
INSERT INTO public.colonias VALUES (2273, 18, 'Parque industrial Exportec I', '50223');
INSERT INTO public.colonias VALUES (2274, 18, 'San Miguel Totoltepec', '50225');
INSERT INTO public.colonias VALUES (2275, 18, 'Geovillas Centenario', '50225');
INSERT INTO public.colonias VALUES (2276, 18, 'Nueva San Francisco', '50225');
INSERT INTO public.colonias VALUES (2277, 18, 'Bordo de las Canastas', '50225');
INSERT INTO public.colonias VALUES (2278, 18, 'Francisco I. Madero', '50226');
INSERT INTO public.colonias VALUES (2279, 18, 'San Pedro Totoltepec', '50226');
INSERT INTO public.colonias VALUES (2280, 18, 'Hacienda La Galia', '50226');
INSERT INTO public.colonias VALUES (2282, 18, 'San Antonio Abad', '50226');
INSERT INTO public.colonias VALUES (2283, 18, 'La Alameda', '50226');
INSERT INTO public.colonias VALUES (2284, 18, 'La Floresta', '50227');
INSERT INTO public.colonias VALUES (2285, 18, 'Misiones de Santa Esperanza', '50227');
INSERT INTO public.colonias VALUES (2286, 18, 'Geovillas de San Mateo', '50227');
INSERT INTO public.colonias VALUES (2287, 18, 'Rinconadas del Pilar', '50227');
INSERT INTO public.colonias VALUES (2288, 18, 'Paseos de Toluca', '50227');
INSERT INTO public.colonias VALUES (2289, 18, 'Villas de Santa Mónica', '50227');
INSERT INTO public.colonias VALUES (2290, 18, 'La Perla', '50228');
INSERT INTO public.colonias VALUES (2291, 18, 'Crespa Town', '50228');
INSERT INTO public.colonias VALUES (2292, 18, 'Geovillas de la Independencia', '50228');
INSERT INTO public.colonias VALUES (2293, 18, 'Arboleda IV', '50228');
INSERT INTO public.colonias VALUES (2294, 18, 'Arboleda', '50228');
INSERT INTO public.colonias VALUES (2295, 18, 'Geovillas los Cedros', '50228');
INSERT INTO public.colonias VALUES (2296, 18, 'Las Fuentes', '50228');
INSERT INTO public.colonias VALUES (2297, 18, 'Villa de San Andrés', '50228');
INSERT INTO public.colonias VALUES (2298, 18, 'Los Sabinos', '50228');
INSERT INTO public.colonias VALUES (2299, 18, 'Geovillas de la Independencia II', '50228');
INSERT INTO public.colonias VALUES (2300, 18, 'La Crespa', '50228');
INSERT INTO public.colonias VALUES (2301, 18, 'Arboleda V', '50228');
INSERT INTO public.colonias VALUES (2302, 18, 'Fuentes de la Independencia', '50228');
INSERT INTO public.colonias VALUES (2303, 18, 'Las Fuentes del Ordal', '50228');
INSERT INTO public.colonias VALUES (2304, 18, 'Las Misiones', '50230');
INSERT INTO public.colonias VALUES (2305, 18, 'Villa Toscana', '50230');
INSERT INTO public.colonias VALUES (2306, 18, 'Francisco Villa', '50230');
INSERT INTO public.colonias VALUES (2307, 18, 'San José Guadalupe Otzacatipan', '50230');
INSERT INTO public.colonias VALUES (2308, 18, 'San Nicolás Tolentino', '50230');
INSERT INTO public.colonias VALUES (2309, 18, 'San Blas Totoltepec', '50230');
INSERT INTO public.colonias VALUES (2310, 18, 'San Blas Otzacatipan', '50230');
INSERT INTO public.colonias VALUES (2311, 18, 'Parque industrial Toluca 2000', '50233');
INSERT INTO public.colonias VALUES (2312, 18, 'Parque industrial Vesta', '50233');
INSERT INTO public.colonias VALUES (2313, 18, 'San Francisco Totoltepec', '50235');
INSERT INTO public.colonias VALUES (2314, 18, 'El Cerrillo Vista Hermosa', '50235');
INSERT INTO public.colonias VALUES (2315, 18, 'Guadalupe Totoltepec', '50235');
INSERT INTO public.colonias VALUES (2316, 18, 'San Francisco', '50235');
INSERT INTO public.colonias VALUES (2317, 18, 'La Constitución Totoltepec', '50236');
INSERT INTO public.colonias VALUES (2318, 18, 'Arroyo Vista Hermosa', '50236');
INSERT INTO public.colonias VALUES (2319, 18, 'El Carmen Totoltepec', '50240');
INSERT INTO public.colonias VALUES (2320, 18, 'El Olimpo', '50240');
INSERT INTO public.colonias VALUES (2321, 18, 'Prados de Tollocan', '50240');
INSERT INTO public.colonias VALUES (2322, 18, 'Los Ahuehuetes', '50240');
INSERT INTO public.colonias VALUES (2323, 18, 'Santa María Totoltepec', '50245');
INSERT INTO public.colonias VALUES (2324, 18, 'Villas Santa María (Galaxia)', '50245');
INSERT INTO public.colonias VALUES (2325, 18, 'Jesús García Lovera "El Pilar"', '50245');
INSERT INTO public.colonias VALUES (2326, 18, 'La Arboleda II', '50245');
INSERT INTO public.colonias VALUES (2327, 18, 'Campo Real', '50245');
INSERT INTO public.colonias VALUES (2328, 18, 'Los Héroes I', '50245');
INSERT INTO public.colonias VALUES (2329, 18, 'La Arboleda III', '50245');
INSERT INTO public.colonias VALUES (2330, 18, 'María Bonita', '50245');
INSERT INTO public.colonias VALUES (2331, 18, 'Campo Real I', '50245');
INSERT INTO public.colonias VALUES (2332, 18, 'Campo Real II', '50245');
INSERT INTO public.colonias VALUES (2333, 18, 'Campo Real III', '50245');
INSERT INTO public.colonias VALUES (2334, 18, 'Las Bugambilias', '50245');
INSERT INTO public.colonias VALUES (2335, 18, 'Residencial la Joya', '50245');
INSERT INTO public.colonias VALUES (2336, 18, 'El Coecillo', '50246');
INSERT INTO public.colonias VALUES (2337, 18, 'Los Héroes III', '50246');
INSERT INTO public.colonias VALUES (2338, 18, 'Los Héroes II', '50246');
INSERT INTO public.colonias VALUES (2339, 18, 'Las Palomas', '50250');
INSERT INTO public.colonias VALUES (2340, 18, 'San Felipe Tlalmimilolpan', '50250');
INSERT INTO public.colonias VALUES (2341, 18, 'Santa Juanita', '50250');
INSERT INTO public.colonias VALUES (2342, 18, 'La Curva', '50250');
INSERT INTO public.colonias VALUES (2343, 18, 'La Cañada', '50250');
INSERT INTO public.colonias VALUES (2344, 18, 'Las Margaritas', '50250');
INSERT INTO public.colonias VALUES (2345, 18, 'Rancho de Maya', '50250');
INSERT INTO public.colonias VALUES (2346, 18, 'La Loma Residencial', '50250');
INSERT INTO public.colonias VALUES (2347, 18, 'Jardines de San Pedro', '50253');
INSERT INTO public.colonias VALUES (2348, 18, 'Dos Ríos', '50253');
INSERT INTO public.colonias VALUES (2349, 18, 'Los Álamos', '50253');
INSERT INTO public.colonias VALUES (2350, 18, 'El Calvario', '50253');
INSERT INTO public.colonias VALUES (2351, 18, 'Hacienda Vista Hermosa', '50254');
INSERT INTO public.colonias VALUES (2354, 18, 'Tlala', '50254');
INSERT INTO public.colonias VALUES (2355, 18, 'La Venta', '50254');
INSERT INTO public.colonias VALUES (2356, 18, 'El Mogote', '50254');
INSERT INTO public.colonias VALUES (2357, 18, 'El Frontón', '50254');
INSERT INTO public.colonias VALUES (2358, 18, 'El Mirador', '50254');
INSERT INTO public.colonias VALUES (2359, 18, 'Balcones de San Felipe', '50254');
INSERT INTO public.colonias VALUES (2360, 18, 'El Refugio', '50255');
INSERT INTO public.colonias VALUES (2361, 18, 'Santiago Tlacotepec', '50255');
INSERT INTO public.colonias VALUES (2362, 18, 'San Juan Tilapa Centro', '50255');
INSERT INTO public.colonias VALUES (2363, 18, 'El Durazno', '50255');
INSERT INTO public.colonias VALUES (2364, 18, 'Vista Hermosa', '50255');
INSERT INTO public.colonias VALUES (2365, 18, 'Cristo Rey', '50255');
INSERT INTO public.colonias VALUES (2366, 18, 'Linda Vista', '50255');
INSERT INTO public.colonias VALUES (2367, 18, 'Paraje Tlalmimilolpan', '50255');
INSERT INTO public.colonias VALUES (2369, 18, 'Los Pajaritos', '50255');
INSERT INTO public.colonias VALUES (2370, 18, 'Santiago Tlacotepec Centro', '50255');
INSERT INTO public.colonias VALUES (2372, 18, 'Santa María', '50255');
INSERT INTO public.colonias VALUES (2374, 18, 'Agua Bendita', '50256');
INSERT INTO public.colonias VALUES (2375, 18, 'Las Barranquitas', '50256');
INSERT INTO public.colonias VALUES (2376, 18, 'El Canal', '50256');
INSERT INTO public.colonias VALUES (2380, 18, 'El Cruzado', '50257');
INSERT INTO public.colonias VALUES (2382, 18, 'Tollocan', '50257');
INSERT INTO public.colonias VALUES (2383, 18, 'La Joya de Ignacio Esquivel', '50257');
INSERT INTO public.colonias VALUES (2384, 18, 'Apilulco', '50257');
INSERT INTO public.colonias VALUES (2386, 18, 'Acuxtitla', '50258');
INSERT INTO public.colonias VALUES (2387, 18, 'El Chamizal', '50258');
INSERT INTO public.colonias VALUES (2388, 18, 'El Mostrante', '50258');
INSERT INTO public.colonias VALUES (2389, 18, 'La Cruz', '50258');
INSERT INTO public.colonias VALUES (2390, 18, 'Puxinco', '50258');
INSERT INTO public.colonias VALUES (2391, 18, 'El Rosario', '50258');
INSERT INTO public.colonias VALUES (2393, 18, 'Rancho Buenavista', '50258');
INSERT INTO public.colonias VALUES (2394, 18, 'Paraje el Ocote', '50258');
INSERT INTO public.colonias VALUES (2395, 18, 'Atenea', '50260');
INSERT INTO public.colonias VALUES (2396, 18, 'Miramonte', '50260');
INSERT INTO public.colonias VALUES (2397, 18, 'La Rivera', '50260');
INSERT INTO public.colonias VALUES (2398, 18, 'Victoria Residencial', '50260');
INSERT INTO public.colonias VALUES (2399, 18, 'Paseos del Valle', '50260');
INSERT INTO public.colonias VALUES (2400, 18, 'El Pacífico', '50260');
INSERT INTO public.colonias VALUES (2401, 18, 'Capultitlán Centro', '50260');
INSERT INTO public.colonias VALUES (2402, 18, 'Villas Fontana', '50260');
INSERT INTO public.colonias VALUES (2403, 18, 'Villas Santa Esther', '50260');
INSERT INTO public.colonias VALUES (2404, 18, 'Alejandría', '50260');
INSERT INTO public.colonias VALUES (2405, 18, 'Los Pinos', '50263');
INSERT INTO public.colonias VALUES (2406, 18, 'San Juan Apóstol', '50263');
INSERT INTO public.colonias VALUES (2407, 18, 'De Cristo Rey', '50263');
INSERT INTO public.colonias VALUES (2408, 18, 'De la Cruz', '50263');
INSERT INTO public.colonias VALUES (2409, 18, 'La Virgen de Guadalupe', '50263');
INSERT INTO public.colonias VALUES (2410, 18, 'San Isidro Labrador', '50263');
INSERT INTO public.colonias VALUES (2411, 18, 'Del Espíritu Santo', '50263');
INSERT INTO public.colonias VALUES (2412, 18, 'La Santísima Trinidad', '50263');
INSERT INTO public.colonias VALUES (2413, 18, 'La Soledad', '50264');
INSERT INTO public.colonias VALUES (2414, 18, 'San José', '50264');
INSERT INTO public.colonias VALUES (2415, 18, 'San Felipe de Jesús', '50264');
INSERT INTO public.colonias VALUES (2416, 18, 'San Judas Tadeo', '50264');
INSERT INTO public.colonias VALUES (2417, 18, 'Las Palmas', '50264');
INSERT INTO public.colonias VALUES (2418, 18, 'San Pablo', '50264');
INSERT INTO public.colonias VALUES (2419, 18, 'San Miguel Zacango', '50265');
INSERT INTO public.colonias VALUES (2420, 18, 'Villas Santa Isabel', '50265');
INSERT INTO public.colonias VALUES (2423, 18, 'Sixto Noguez', '50265');
INSERT INTO public.colonias VALUES (2425, 18, 'Cacalomacán Centro', '50265');
INSERT INTO public.colonias VALUES (2426, 18, 'La Palma', '50265');
INSERT INTO public.colonias VALUES (2427, 18, 'La Capilla', '50265');
INSERT INTO public.colonias VALUES (2428, 18, 'Sagrado Corazón de Jesús', '50265');
INSERT INTO public.colonias VALUES (2429, 18, 'Tierra Coloradas', '50265');
INSERT INTO public.colonias VALUES (2430, 18, 'San Pedro', '50265');
INSERT INTO public.colonias VALUES (2431, 18, 'El Chorrito', '50265');
INSERT INTO public.colonias VALUES (2432, 18, 'Del Campo', '50265');
INSERT INTO public.colonias VALUES (2435, 18, 'San Antonio Buenavista', '50266');
INSERT INTO public.colonias VALUES (2436, 18, 'Tecaxic', '50270');
INSERT INTO public.colonias VALUES (2437, 18, 'Tepetongo', '50270');
INSERT INTO public.colonias VALUES (2439, 18, 'Buenavista', '50270');
INSERT INTO public.colonias VALUES (2440, 18, 'Tlalnepantla', '50270');
INSERT INTO public.colonias VALUES (2441, 18, 'El Pedregal', '50270');
INSERT INTO public.colonias VALUES (2442, 18, 'Pueblo Nuevo (Serratón)', '50274');
INSERT INTO public.colonias VALUES (2443, 18, 'San Marcos Yachihuacaltepec', '50280');
INSERT INTO public.colonias VALUES (2444, 18, 'Los Uribe', '50280');
INSERT INTO public.colonias VALUES (2445, 18, 'Santiago Tlaxomulco Centro', '50280');
INSERT INTO public.colonias VALUES (2446, 18, 'Calixtlahuaca', '50280');
INSERT INTO public.colonias VALUES (2447, 18, 'Junta Local de Caminos', '50280');
INSERT INTO public.colonias VALUES (2448, 18, 'El Tepetate', '50280');
INSERT INTO public.colonias VALUES (2450, 18, 'La Peña', '50280');
INSERT INTO public.colonias VALUES (2451, 18, 'El Pozo Blanco', '50283');
INSERT INTO public.colonias VALUES (2452, 18, 'La Pena', '50283');
INSERT INTO public.colonias VALUES (2453, 18, 'Los Cipreses', '50283');
INSERT INTO public.colonias VALUES (2454, 18, 'Los Pocitos', '50284');
INSERT INTO public.colonias VALUES (2456, 18, 'Tenojo', '50284');
INSERT INTO public.colonias VALUES (2458, 18, 'San Martín Toltepec', '50285');
INSERT INTO public.colonias VALUES (2459, 18, 'La Palma Toltepec', '50285');
INSERT INTO public.colonias VALUES (2460, 18, 'Palmillas', '50285');
INSERT INTO public.colonias VALUES (2461, 18, 'Ojo de Agua', '50285');
INSERT INTO public.colonias VALUES (2462, 18, 'Zimbrones', '50285');
INSERT INTO public.colonias VALUES (2463, 18, '2 de Marzo', '50285');
INSERT INTO public.colonias VALUES (2466, 18, 'San Isidro', '50285');
INSERT INTO public.colonias VALUES (2467, 18, 'Paseos San Martín', '50285');
INSERT INTO public.colonias VALUES (2468, 18, 'Almoloya de Juárez', '50285');
INSERT INTO public.colonias VALUES (2469, 18, 'Ejido Santa Cruz Atzcapotzaltongo', '50290');
INSERT INTO public.colonias VALUES (2470, 18, 'La Vega', '50290');
INSERT INTO public.colonias VALUES (2471, 18, 'San Pablo Autopan', '50290');
INSERT INTO public.colonias VALUES (2472, 18, 'Jicaltepec Autopan', '50290');
INSERT INTO public.colonias VALUES (2473, 18, 'Bordo Nuevo', '50290');
INSERT INTO public.colonias VALUES (2474, 18, 'El Cerro del Perico', '50290');
INSERT INTO public.colonias VALUES (2475, 18, 'De Jesús 1da. Sección', '50290');
INSERT INTO public.colonias VALUES (2476, 18, 'De Jesús 2da. Sección', '50290');
INSERT INTO public.colonias VALUES (2477, 18, 'Del Pozo', '50290');
INSERT INTO public.colonias VALUES (2478, 18, 'El Cerrito', '50290');
INSERT INTO public.colonias VALUES (2479, 18, 'Tejocote', '50290');
INSERT INTO public.colonias VALUES (2480, 18, 'Alcaltunco', '50290');
INSERT INTO public.colonias VALUES (2481, 18, 'Tanamato', '50290');
INSERT INTO public.colonias VALUES (2482, 18, 'Chupascliya', '50290');
INSERT INTO public.colonias VALUES (2483, 18, 'Chichipicas', '50290');
INSERT INTO public.colonias VALUES (2484, 18, 'Santa Cruz Atzcapotzaltongo', '50290');
INSERT INTO public.colonias VALUES (2485, 18, 'La Granja', '50290');
INSERT INTO public.colonias VALUES (2486, 18, 'Parque industrial Toluca', '50293');
INSERT INTO public.colonias VALUES (2487, 18, 'De Jesús 3a. Sección', '50294');
INSERT INTO public.colonias VALUES (2488, 18, 'De Santa Cruz', '50294');
INSERT INTO public.colonias VALUES (2489, 18, 'De Pueblo Nuevo', '50294');
INSERT INTO public.colonias VALUES (2490, 18, 'De Santa María', '50294');
INSERT INTO public.colonias VALUES (2491, 18, 'Tlachaloya', '50294');
INSERT INTO public.colonias VALUES (2492, 18, 'Villas los Ángeles', '50294');
INSERT INTO public.colonias VALUES (2493, 18, 'Parque Industrial San Cayetano', '50295');
INSERT INTO public.colonias VALUES (2494, 18, 'San Cayetano Morelos', '50295');
INSERT INTO public.colonias VALUES (2496, 18, 'San Carlos', '50295');
INSERT INTO public.colonias VALUES (2497, 18, 'San Carlos Autopan', '50295');
INSERT INTO public.colonias VALUES (2498, 18, 'San José la Costa', '50295');
INSERT INTO public.colonias VALUES (2499, 18, 'Sebastián Lerdo de Tejada', '50295');
INSERT INTO public.colonias VALUES (2500, 18, 'Tlachaloya 2a Sección Centro', '50295');
INSERT INTO public.colonias VALUES (2501, 18, 'Aviación Autopan', '50295');
INSERT INTO public.colonias VALUES (2502, 18, 'Balbuena', '50295');
INSERT INTO public.colonias VALUES (2503, 18, 'San Diego', '50295');
INSERT INTO public.colonias VALUES (2504, 18, 'Real de San Pablo', '50295');
INSERT INTO public.colonias VALUES (2505, 18, 'Galaxia Toluca', '50295');
INSERT INTO public.colonias VALUES (2506, 18, 'Cerrillo Piedras Blancas', '50295');
INSERT INTO public.colonias VALUES (2507, 18, 'Las Jaras San Nicolás', '50295');
INSERT INTO public.colonias VALUES (2509, 18, 'Julián Escalante', '50295');
INSERT INTO public.colonias VALUES (2510, 18, 'Del Tejocote', '50295');
INSERT INTO public.colonias VALUES (2511, 18, 'San Mateo', '50295');
INSERT INTO public.colonias VALUES (2512, 18, 'San José Buenavista', '50295');
INSERT INTO public.colonias VALUES (2513, 18, 'Xicaltepec', '50295');
INSERT INTO public.colonias VALUES (2514, 19, 'Residencial Paraíso I', '55700');
INSERT INTO public.colonias VALUES (2515, 19, 'Residencial Paraíso II', '55700');
INSERT INTO public.colonias VALUES (2516, 19, 'El Vergel', '55700');
INSERT INTO public.colonias VALUES (2517, 19, 'Residencial Sirapark', '55700');
INSERT INTO public.colonias VALUES (2518, 19, 'Hacienda Cruztitla I', '55700');
INSERT INTO public.colonias VALUES (2519, 19, 'Fuentes de San Francisco', '55700');
INSERT INTO public.colonias VALUES (2520, 19, 'Las Hiedras', '55700');
INSERT INTO public.colonias VALUES (2521, 19, 'San Francisco Coacalco', '55700');
INSERT INTO public.colonias VALUES (2522, 19, 'Zacuautitla', '55700');
INSERT INTO public.colonias VALUES (2523, 19, 'El Laurel (El Gigante)', '55700');
INSERT INTO public.colonias VALUES (2524, 19, 'Conjunto Salamanca', '55700');
INSERT INTO public.colonias VALUES (2525, 19, 'Bonito Coacalco', '55700');
INSERT INTO public.colonias VALUES (2526, 19, 'Residencial Hacienda Capultitla', '55700');
INSERT INTO public.colonias VALUES (2527, 19, 'La Cualac', '55700');
INSERT INTO public.colonias VALUES (2528, 19, 'Residencial Santander', '55700');
INSERT INTO public.colonias VALUES (2529, 19, 'Rincón Colonial Coacalco', '55700');
INSERT INTO public.colonias VALUES (2530, 19, 'Hacienda las Garzas', '55700');
INSERT INTO public.colonias VALUES (2531, 19, 'El Toloache', '55700');
INSERT INTO public.colonias VALUES (2532, 19, 'Privadas Coacalco', '55700');
INSERT INTO public.colonias VALUES (2533, 19, 'Bonito Coacalco I (La Cruz)', '55700');
INSERT INTO public.colonias VALUES (2534, 19, 'Colonial Coacalco', '55700');
INSERT INTO public.colonias VALUES (2535, 19, 'Hacienda Cruztitla II', '55700');
INSERT INTO public.colonias VALUES (2536, 19, 'Parque Taxco Viejo', '55700');
INSERT INTO public.colonias VALUES (2537, 19, 'Residencial Bonito la Loma II', '55700');
INSERT INTO public.colonias VALUES (2538, 19, 'Villa Florencia', '55700');
INSERT INTO public.colonias VALUES (2539, 19, 'Chabacano', '55700');
INSERT INTO public.colonias VALUES (2540, 19, 'Real de Coacalco', '55700');
INSERT INTO public.colonias VALUES (2541, 19, 'República Mexicana', '55705');
INSERT INTO public.colonias VALUES (2542, 19, 'El Obelisco', '55707');
INSERT INTO public.colonias VALUES (2543, 19, 'La Cima', '55707');
INSERT INTO public.colonias VALUES (2544, 19, 'Ejidal Canuto Luna', '55707');
INSERT INTO public.colonias VALUES (2545, 19, 'Calpulli del Valle', '55707');
INSERT INTO public.colonias VALUES (2546, 19, 'Ex-Rancho San Felipe', '55707');
INSERT INTO public.colonias VALUES (2547, 19, 'Lomas San Felipe', '55707');
INSERT INTO public.colonias VALUES (2548, 19, 'Hidalgo', '55708');
INSERT INTO public.colonias VALUES (2549, 19, 'COOR Coacalco', '55709');
INSERT INTO public.colonias VALUES (2550, 19, 'El Gigante', '55709');
INSERT INTO public.colonias VALUES (2551, 19, 'Villas Gigante', '55709');
INSERT INTO public.colonias VALUES (2552, 19, 'Conjunto San Diego', '55709');
INSERT INTO public.colonias VALUES (2553, 19, 'Residencial Las Dalias I,II,III Y IV', '55710');
INSERT INTO public.colonias VALUES (2554, 19, 'Villa de las Flores 1a Sección (Unidad Coacalco)', '55710');
INSERT INTO public.colonias VALUES (2555, 19, 'Villa de las Flores 2a Sección (Unidad Coacalco)', '55710');
INSERT INTO public.colonias VALUES (2556, 19, 'Rancho la Providencia', '55710');
INSERT INTO public.colonias VALUES (2557, 19, 'Arcos las Torres', '55710');
INSERT INTO public.colonias VALUES (2558, 19, 'Las Rosas', '55710');
INSERT INTO public.colonias VALUES (2559, 19, 'Sección Jardín "Las Plazas" (Unidad Coacalco)', '55710');
INSERT INTO public.colonias VALUES (2560, 19, 'San Francisco Coacalco (Sección Hacienda)', '55712');
INSERT INTO public.colonias VALUES (2561, 19, 'Los Héroes Coacalco', '55712');
INSERT INTO public.colonias VALUES (2562, 19, 'Dalias', '55712');
INSERT INTO public.colonias VALUES (2563, 19, 'La Floresta', '55713');
INSERT INTO public.colonias VALUES (2564, 19, 'Rincón de las Fuentes', '55713');
INSERT INTO public.colonias VALUES (2565, 19, 'Rinconada Coacalco', '55713');
INSERT INTO public.colonias VALUES (2566, 19, 'Villa de Reyes', '55713');
INSERT INTO public.colonias VALUES (2567, 19, 'Ampliación Villa de Reyes', '55713');
INSERT INTO public.colonias VALUES (2568, 19, 'Residencial Plaza Coacalco', '55714');
INSERT INTO public.colonias VALUES (2569, 19, 'Rincón Coahuilense', '55714');
INSERT INTO public.colonias VALUES (2570, 19, 'San Lorenzo Tetlixtac', '55714');
INSERT INTO public.colonias VALUES (2571, 19, 'Niños Héroes', '55714');
INSERT INTO public.colonias VALUES (2572, 19, 'Los Almendros', '55714');
INSERT INTO public.colonias VALUES (2573, 19, 'Hacienda San Pablo', '55714');
INSERT INTO public.colonias VALUES (2574, 19, 'Potrero II', '55714');
INSERT INTO public.colonias VALUES (2575, 19, 'Los Olivos', '55714');
INSERT INTO public.colonias VALUES (2576, 19, 'Tetlacolili', '55714');
INSERT INTO public.colonias VALUES (2577, 19, 'Santa María Magdalena Huizachitla', '55715');
INSERT INTO public.colonias VALUES (2578, 19, 'Los Sabinos II', '55715');
INSERT INTO public.colonias VALUES (2579, 19, 'Jardines de San José 1a Secc', '55716');
INSERT INTO public.colonias VALUES (2580, 19, 'Jardines de San José 2a Secc', '55716');
INSERT INTO public.colonias VALUES (2581, 19, 'Sección las Villas (Unidad Coacalco)', '55716');
INSERT INTO public.colonias VALUES (2582, 19, 'Ex-Hacienda San Felipe 1a. Sección', '55717');
INSERT INTO public.colonias VALUES (2583, 19, 'Rancho la Palma 1a Sección', '55717');
INSERT INTO public.colonias VALUES (2584, 19, 'Bosques del Valle 1a Sección', '55717');
INSERT INTO public.colonias VALUES (2585, 19, 'Bosques del Valle 2a Sección', '55717');
INSERT INTO public.colonias VALUES (2586, 19, 'Periodistas Revolucionarios', '55717');
INSERT INTO public.colonias VALUES (2587, 19, 'El Laurel', '55717');
INSERT INTO public.colonias VALUES (2588, 19, 'Los Portales Oriente', '55717');
INSERT INTO public.colonias VALUES (2589, 19, 'Ex-Hacienda San Felipe 2a. Sección', '55717');
INSERT INTO public.colonias VALUES (2590, 19, 'Rancho la Palma 2a Sección', '55717');
INSERT INTO public.colonias VALUES (2591, 19, 'Rancho la Palma 3a Sección', '55717');
INSERT INTO public.colonias VALUES (2592, 19, 'El Chaparral', '55717');
INSERT INTO public.colonias VALUES (2593, 19, 'Ex-Hacienda San Felipe 3a. Sección', '55717');
INSERT INTO public.colonias VALUES (2594, 19, 'Las Bugambilias', '55717');
INSERT INTO public.colonias VALUES (2595, 19, 'Los Portales Poniente', '55717');
INSERT INTO public.colonias VALUES (2596, 19, 'Rancho la Palma 4a. Sección', '55717');
INSERT INTO public.colonias VALUES (2597, 19, 'Parque industrial ZI-1 y ZI-2', '55718');
INSERT INTO public.colonias VALUES (2598, 19, 'Potrero Popular I', '55718');
INSERT INTO public.colonias VALUES (2599, 19, 'Potrero la Laguna 1a Sección', '55718');
INSERT INTO public.colonias VALUES (2600, 19, 'Potrero la Laguna 2a Sección', '55718');
INSERT INTO public.colonias VALUES (2601, 19, 'José María Morelos y Pavón', '55718');
INSERT INTO public.colonias VALUES (2602, 19, 'Santa María II', '55718');
INSERT INTO public.colonias VALUES (2603, 19, 'Las Garzas', '55718');
INSERT INTO public.colonias VALUES (2604, 19, 'Potrero I', '55718');
INSERT INTO public.colonias VALUES (2605, 19, 'Joyas de Coacalco', '55718');
INSERT INTO public.colonias VALUES (2606, 19, 'Los Cedros I y II', '55718');
INSERT INTO public.colonias VALUES (2607, 19, 'La Guadalupana', '55718');
INSERT INTO public.colonias VALUES (2608, 19, 'Privada las Garzas', '55718');
INSERT INTO public.colonias VALUES (2609, 19, 'Santa María III', '55718');
INSERT INTO public.colonias VALUES (2610, 19, 'Potrero Popular II', '55718');
INSERT INTO public.colonias VALUES (2611, 19, 'El Pantano', '55719');
INSERT INTO public.colonias VALUES (2612, 19, 'San Rafael Coacalco', '55719');
INSERT INTO public.colonias VALUES (2613, 19, 'Rinconada San Felipe II', '55719');
INSERT INTO public.colonias VALUES (2614, 19, 'Santa María I', '55719');
INSERT INTO public.colonias VALUES (2615, 19, 'Rinconada San Felipe I', '55719');
INSERT INTO public.colonias VALUES (2616, 19, 'Plaza las Flores', '55719');
INSERT INTO public.colonias VALUES (2617, 19, 'Parque Residencial Coacalco 1a Sección', '55720');
INSERT INTO public.colonias VALUES (2618, 19, 'Parque Residencial Coacalco 2a Sección', '55720');
INSERT INTO public.colonias VALUES (2619, 19, 'Parque Residencial Coacalco 3a Sección', '55720');
INSERT INTO public.colonias VALUES (2620, 19, 'Camino Real El Granero', '55726');
INSERT INTO public.colonias VALUES (2621, 19, 'Villa Florida', '55726');
INSERT INTO public.colonias VALUES (2622, 19, 'Granjas San Cristóbal', '55726');
INSERT INTO public.colonias VALUES (2623, 19, 'Hacienda del Teruel', '55726');
INSERT INTO public.colonias VALUES (2624, 19, 'Star I', '55726');
INSERT INTO public.colonias VALUES (2625, 19, 'Star II', '55726');
INSERT INTO public.colonias VALUES (2626, 19, 'La Vista', '55726');
INSERT INTO public.colonias VALUES (2627, 19, 'Valle Florido', '55726');
INSERT INTO public.colonias VALUES (2628, 19, 'Las Brisas', '55728');
INSERT INTO public.colonias VALUES (2629, 19, 'El Granero', '55728');
INSERT INTO public.colonias VALUES (2630, 19, 'COOR Granjas', '55728');
INSERT INTO public.colonias VALUES (2631, 19, 'El Oasis', '55728');
INSERT INTO public.colonias VALUES (2632, 19, 'Los Sabinos I', '55729');
INSERT INTO public.colonias VALUES (2633, 19, 'SITATYR', '55729');
INSERT INTO public.colonias VALUES (2634, 19, 'Villa las Manzanas', '55730');
INSERT INTO public.colonias VALUES (2635, 19, 'Lomas de Coacalco 1a. Sección', '55736');
INSERT INTO public.colonias VALUES (2636, 19, 'Lomas de Coacalco 2a. Sección (Bosques)', '55736');
INSERT INTO public.colonias VALUES (2637, 19, 'Basurero Municipal (La Aurora)', '55736');
INSERT INTO public.colonias VALUES (2638, 19, 'Jalatlaco', '55737');
INSERT INTO public.colonias VALUES (2639, 19, 'Mediterraneo', '55737');
INSERT INTO public.colonias VALUES (2640, 19, 'Arte y Publicidad Miguel Hidalgo', '55738');
INSERT INTO public.colonias VALUES (2641, 19, 'Loma Bonita', '55738');
INSERT INTO public.colonias VALUES (2642, 19, 'Asociación de Comerciantes de Coacalco', '55738');
INSERT INTO public.colonias VALUES (2643, 19, 'Hacienda Taxco Viejo', '55738');
INSERT INTO public.colonias VALUES (2644, 19, 'El Ranchito (imevis)', '55738');
INSERT INTO public.colonias VALUES (2645, 19, 'Los Acuales', '55739');
INSERT INTO public.colonias VALUES (2646, 20, 'Tlalnepantla Centro', '54000');
INSERT INTO public.colonias VALUES (2647, 20, 'Alta Vista', '54000');
INSERT INTO public.colonias VALUES (2648, 20, 'La Riviera', '54009');
INSERT INTO public.colonias VALUES (2649, 20, 'La Azteca', '54010');
INSERT INTO public.colonias VALUES (2650, 20, 'La Providencia', '54010');
INSERT INTO public.colonias VALUES (2651, 20, 'San Pedro Barrientos', '54010');
INSERT INTO public.colonias VALUES (2652, 20, 'Valle Hermoso', '54010');
INSERT INTO public.colonias VALUES (2653, 20, '21 de Marzo', '54010');
INSERT INTO public.colonias VALUES (2654, 20, 'Barrientos Gustavo Baz', '54010');
INSERT INTO public.colonias VALUES (2655, 20, 'Conjunto Urbano Terraze', '54015');
INSERT INTO public.colonias VALUES (2656, 20, 'Barrientos', '54015');
INSERT INTO public.colonias VALUES (2657, 20, 'José María Velasco', '54016');
INSERT INTO public.colonias VALUES (2658, 20, 'Niños Héroes', '54017');
INSERT INTO public.colonias VALUES (2659, 20, 'Comunidad Betania', '54017');
INSERT INTO public.colonias VALUES (2660, 20, 'Benito Juárez (Tequex.)', '54020');
INSERT INTO public.colonias VALUES (2661, 20, 'El Dorado', '54020');
INSERT INTO public.colonias VALUES (2662, 20, 'La Joya Chica', '54020');
INSERT INTO public.colonias VALUES (2663, 20, 'Lomas Boulevares', '54020');
INSERT INTO public.colonias VALUES (2664, 20, 'Tequexquinahuac Parte Alta', '54020');
INSERT INTO public.colonias VALUES (2665, 20, 'Valle Dorado', '54020');
INSERT INTO public.colonias VALUES (2666, 20, 'Condominio Tequexquináhuac', '54020');
INSERT INTO public.colonias VALUES (2667, 20, 'Tequexquináhuac', '54020');
INSERT INTO public.colonias VALUES (2668, 20, 'El Gran Dorado', '54020');
INSERT INTO public.colonias VALUES (2669, 20, 'Loma Azul', '54021');
INSERT INTO public.colonias VALUES (2670, 20, 'Robles Patera', '54022');
INSERT INTO public.colonias VALUES (2671, 20, 'Lomas de Valle Dorado', '54023');
INSERT INTO public.colonias VALUES (2672, 20, 'Lomas de Atlaco', '54023');
INSERT INTO public.colonias VALUES (2673, 20, 'Los Pirules Ampliación', '54023');
INSERT INTO public.colonias VALUES (2674, 20, 'Lomas Tulpan', '54023');
INSERT INTO public.colonias VALUES (2675, 20, 'Cumbres del Valle', '54025');
INSERT INTO public.colonias VALUES (2676, 20, 'Las Arboledas', '54026');
INSERT INTO public.colonias VALUES (2677, 20, 'Laderas de San Javier', '54028');
INSERT INTO public.colonias VALUES (2678, 20, 'Centro Industrial Tlalnepantla', '54030');
INSERT INTO public.colonias VALUES (2679, 20, 'Tlaxcopan', '54030');
INSERT INTO public.colonias VALUES (2680, 20, 'La Romana', '54030');
INSERT INTO public.colonias VALUES (2681, 20, 'La Nueva Ferrocarrilera', '54030');
INSERT INTO public.colonias VALUES (2682, 20, 'San Nicolás', '54030');
INSERT INTO public.colonias VALUES (2683, 20, 'San Javier', '54030');
INSERT INTO public.colonias VALUES (2684, 20, 'IMSS Tlalnepantla', '54030');
INSERT INTO public.colonias VALUES (2685, 20, 'Jesús García Corona', '54030');
INSERT INTO public.colonias VALUES (2686, 20, 'Ampliación San Javier', '54030');
INSERT INTO public.colonias VALUES (2687, 20, 'San Lorenzo', '54033');
INSERT INTO public.colonias VALUES (2688, 20, 'La Ferrocarrilera El Hoyo', '54033');
INSERT INTO public.colonias VALUES (2689, 20, 'El Triángulo', '54037');
INSERT INTO public.colonias VALUES (2690, 20, 'Rivera del Bosque', '54038');
INSERT INTO public.colonias VALUES (2691, 20, 'Lomas de San Andrés Atenco', '54040');
INSERT INTO public.colonias VALUES (2692, 20, 'Los Pirules', '54040');
INSERT INTO public.colonias VALUES (2693, 20, 'Rincón del Valle', '54040');
INSERT INTO public.colonias VALUES (2694, 20, 'San Andrés Atenco', '54040');
INSERT INTO public.colonias VALUES (2695, 20, 'Valle de los Pinos 1ra. Sección', '54040');
INSERT INTO public.colonias VALUES (2696, 20, 'Valle Verde', '54040');
INSERT INTO public.colonias VALUES (2697, 20, 'Leandro Valle', '54040');
INSERT INTO public.colonias VALUES (2698, 20, 'Lomas de San Andrés Atenco Ampliación', '54040');
INSERT INTO public.colonias VALUES (2699, 20, 'San Andrés Atenco Ampliación', '54040');
INSERT INTO public.colonias VALUES (2700, 20, 'Balcones del Valle', '54049');
INSERT INTO public.colonias VALUES (2701, 20, 'Bosques de México', '54050');
INSERT INTO public.colonias VALUES (2702, 20, 'Ex-Hacienda de Santa Mónica', '54050');
INSERT INTO public.colonias VALUES (2703, 20, 'Jacarandas', '54050');
INSERT INTO public.colonias VALUES (2704, 20, 'Jacarandas Ampliación', '54050');
INSERT INTO public.colonias VALUES (2705, 20, 'Jardines de Santa Mónica', '54050');
INSERT INTO public.colonias VALUES (2706, 20, 'Las Margaritas', '54050');
INSERT INTO public.colonias VALUES (2707, 20, 'Magisterial Vista Bella', '54050');
INSERT INTO public.colonias VALUES (2708, 20, 'Margaritas Ampliación', '54050');
INSERT INTO public.colonias VALUES (2709, 20, 'Bellavista Satélite', '54054');
INSERT INTO public.colonias VALUES (2710, 20, 'Jardines Bellavista', '54054');
INSERT INTO public.colonias VALUES (2711, 20, 'Residencial Privanza', '54054');
INSERT INTO public.colonias VALUES (2712, 20, 'Rincón de Bella Vista', '54054');
INSERT INTO public.colonias VALUES (2713, 20, 'Club de Golf Bellavista', '54054');
INSERT INTO public.colonias VALUES (2714, 20, 'San Lucas Tepetlacalco', '54055');
INSERT INTO public.colonias VALUES (2715, 20, 'San Lucas Tepetlacalco Ampliación', '54055');
INSERT INTO public.colonias VALUES (2716, 20, 'Valle de Santa Mónica', '54057');
INSERT INTO public.colonias VALUES (2717, 20, 'Francisco Villa', '54059');
INSERT INTO public.colonias VALUES (2718, 20, 'Electra', '54060');
INSERT INTO public.colonias VALUES (2719, 20, 'La Loma', '54060');
INSERT INTO public.colonias VALUES (2720, 20, 'Arcos Electra', '54060');
INSERT INTO public.colonias VALUES (2721, 20, 'Miguel Hidalgo', '54060');
INSERT INTO public.colonias VALUES (2723, 20, 'Valle del Paraíso', '54060');
INSERT INTO public.colonias VALUES (2724, 20, 'Viveros del Río', '54060');
INSERT INTO public.colonias VALUES (2725, 20, 'Viveros del Valle', '54060');
INSERT INTO public.colonias VALUES (2726, 20, 'Valle de los Pinos 2da. Sección', '54060');
INSERT INTO public.colonias VALUES (2727, 20, 'Valle Sol', '54060');
INSERT INTO public.colonias VALUES (2728, 20, 'Rinconada del Paraíso', '54063');
INSERT INTO public.colonias VALUES (2729, 20, 'Tlalcalli', '54067');
INSERT INTO public.colonias VALUES (2730, 20, 'Benito Juárez Centro', '54068');
INSERT INTO public.colonias VALUES (2731, 20, 'Las Rosas', '54069');
INSERT INTO public.colonias VALUES (2732, 20, 'Plaza de las Rosas', '54069');
INSERT INTO public.colonias VALUES (2733, 20, 'El Cortijo', '54070');
INSERT INTO public.colonias VALUES (2734, 20, 'San José Puente de Vigas', '54070');
INSERT INTO public.colonias VALUES (2735, 20, 'La Comunidad', '54070');
INSERT INTO public.colonias VALUES (2736, 20, 'Adolfo López Mateos', '54070');
INSERT INTO public.colonias VALUES (2737, 20, 'Rancho San Antonio', '54070');
INSERT INTO public.colonias VALUES (2738, 20, 'Tlalnemex', '54070');
INSERT INTO public.colonias VALUES (2739, 20, 'Los Reyes', '54073');
INSERT INTO public.colonias VALUES (2741, 20, 'Los Reyes Ixtacala 2da. Sección', '54075');
INSERT INTO public.colonias VALUES (2742, 20, 'Los Tejavanes', '54076');
INSERT INTO public.colonias VALUES (2743, 20, 'Bellavista Puente de Vigas', '54080');
INSERT INTO public.colonias VALUES (2744, 20, 'El Mirador', '54080');
INSERT INTO public.colonias VALUES (2745, 20, 'Las Armas', '54080');
INSERT INTO public.colonias VALUES (2746, 20, 'Plazas de la Colina', '54080');
INSERT INTO public.colonias VALUES (2747, 20, 'Residencias del Parque', '54080');
INSERT INTO public.colonias VALUES (2748, 20, 'Vista Hermosa', '54080');
INSERT INTO public.colonias VALUES (2749, 20, 'Ampliación Vista Hermosa', '54080');
INSERT INTO public.colonias VALUES (2750, 20, 'Viveros de La Loma', '54080');
INSERT INTO public.colonias VALUES (2751, 20, 'Xocoyahualco', '54080');
INSERT INTO public.colonias VALUES (2752, 20, 'Condominios Villas Satélite', '54080');
INSERT INTO public.colonias VALUES (2753, 20, 'Conjunto Pintores', '54080');
INSERT INTO public.colonias VALUES (2754, 20, 'Tepetlacalco A. C.', '54080');
INSERT INTO public.colonias VALUES (2755, 20, 'Natura', '54080');
INSERT INTO public.colonias VALUES (2756, 20, 'Real del Ocho', '54080');
INSERT INTO public.colonias VALUES (2757, 20, 'Rosario 1 Sector CROC II', '54090');
INSERT INTO public.colonias VALUES (2758, 20, 'Rosario 1 Sector CROC III-A', '54090');
INSERT INTO public.colonias VALUES (2759, 20, 'Hogares Ferrocarrileros', '54090');
INSERT INTO public.colonias VALUES (2760, 20, 'La Escuela', '54090');
INSERT INTO public.colonias VALUES (2761, 20, 'La Mora', '54090');
INSERT INTO public.colonias VALUES (2762, 20, 'Los Reyes Ixtacala 1ra. Sección', '54090');
INSERT INTO public.colonias VALUES (2763, 20, 'Puente de Vigas', '54090');
INSERT INTO public.colonias VALUES (2764, 20, 'San Jerónimo Tepetlacalco', '54090');
INSERT INTO public.colonias VALUES (2766, 20, 'San Pablo Xalpa', '54090');
INSERT INTO public.colonias VALUES (2767, 20, 'SEDENA', '54090');
INSERT INTO public.colonias VALUES (2768, 20, 'Rosario 1 Sector CROC VII', '54090');
INSERT INTO public.colonias VALUES (2769, 20, 'Rosario 1 Sector II-CA', '54090');
INSERT INTO public.colonias VALUES (2770, 20, 'Rosario 1 Sector II-CB', '54090');
INSERT INTO public.colonias VALUES (2771, 20, 'Rosario 1 Sector II-CD', '54090');
INSERT INTO public.colonias VALUES (2772, 20, 'Rosario 1 Sector III-A', '54090');
INSERT INTO public.colonias VALUES (2773, 20, 'Rosario 1 Sector III-B', '54090');
INSERT INTO public.colonias VALUES (2774, 20, 'Rosario 1 Sector III-C', '54090');
INSERT INTO public.colonias VALUES (2776, 20, 'Los Cedros', '54090');
INSERT INTO public.colonias VALUES (2778, 20, 'Rosario I Sector CROC III B', '54090');
INSERT INTO public.colonias VALUES (2779, 20, 'Rosario II Sector I', '54090');
INSERT INTO public.colonias VALUES (2780, 20, 'Rosario II Sector II', '54090');
INSERT INTO public.colonias VALUES (2781, 20, 'Rosario II Sector III', '54090');
INSERT INTO public.colonias VALUES (2782, 20, 'Rosario 1 Sector CROC V Bugambilias', '54092');
INSERT INTO public.colonias VALUES (2783, 20, 'Rosario Ceylán', '54092');
INSERT INTO public.colonias VALUES (2784, 20, 'Rosario II Gasera', '54093');
INSERT INTO public.colonias VALUES (2785, 20, 'Rosario II Hipódromo Textil', '54094');
INSERT INTO public.colonias VALUES (2786, 20, 'Gustavo Baz Prada Los Reyes Ixtacala', '54098');
INSERT INTO public.colonias VALUES (2787, 20, 'Las Palomas', '54100');
INSERT INTO public.colonias VALUES (2788, 20, 'San Lucas Patoni', '54100');
INSERT INTO public.colonias VALUES (2789, 20, 'Unbidad CROC Solidaridad', '54100');
INSERT INTO public.colonias VALUES (2790, 20, 'La Sideral', '54108');
INSERT INTO public.colonias VALUES (2791, 20, 'Ampliación La Arboleda', '54108');
INSERT INTO public.colonias VALUES (2792, 20, 'La Arboleda', '54109');
INSERT INTO public.colonias VALUES (2793, 20, 'Unidad Barrientos', '54110');
INSERT INTO public.colonias VALUES (2794, 20, 'El Olivo I', '54110');
INSERT INTO public.colonias VALUES (2795, 20, 'Hogar Obrero', '54110');
INSERT INTO public.colonias VALUES (2796, 20, 'Isidro Fabela', '54110');
INSERT INTO public.colonias VALUES (2797, 20, 'La Blanca', '54110');
INSERT INTO public.colonias VALUES (2798, 20, 'Reforma Urbana', '54110');
INSERT INTO public.colonias VALUES (2799, 20, 'Santa María Tlayacampa', '54110');
INSERT INTO public.colonias VALUES (2800, 20, 'Franja Municipal', '54110');
INSERT INTO public.colonias VALUES (2801, 20, 'Nuevo México', '54110');
INSERT INTO public.colonias VALUES (2802, 20, 'Lomas del Calvario', '54110');
INSERT INTO public.colonias VALUES (2803, 20, 'Cooperativa La Romana', '54110');
INSERT INTO public.colonias VALUES (2804, 20, 'Franja Férrea', '54118');
INSERT INTO public.colonias VALUES (2805, 20, 'El Olivo II Parte Alta Carlos Pichardo Cruz', '54119');
INSERT INTO public.colonias VALUES (2806, 20, 'El Olivo II Parte Baja', '54119');
INSERT INTO public.colonias VALUES (2807, 20, 'Gustavo Baz Prada', '54120');
INSERT INTO public.colonias VALUES (2808, 20, 'Gustavo Baz Prada Ampliación', '54120');
INSERT INTO public.colonias VALUES (2809, 20, 'Loma Bonita', '54120');
INSERT INTO public.colonias VALUES (2810, 20, 'Los Parajes', '54120');
INSERT INTO public.colonias VALUES (2811, 20, 'San Rafael', '54120');
INSERT INTO public.colonias VALUES (2812, 20, 'Tlayapa', '54120');
INSERT INTO public.colonias VALUES (2813, 20, 'Rancho San Rafael Amates', '54120');
INSERT INTO public.colonias VALUES (2815, 20, 'La Cañada', '54120');
INSERT INTO public.colonias VALUES (2816, 20, 'Cuauhtémoc', '54124');
INSERT INTO public.colonias VALUES (2817, 20, 'Tabla Honda', '54126');
INSERT INTO public.colonias VALUES (2819, 20, 'Río San Javier', '54126');
INSERT INTO public.colonias VALUES (2820, 20, 'Ferrocarrilera San Rafael', '54127');
INSERT INTO public.colonias VALUES (2821, 20, 'Condominios San Rafael', '54128');
INSERT INTO public.colonias VALUES (2822, 20, 'El Rosal', '54130');
INSERT INTO public.colonias VALUES (2823, 20, 'Ex Ejido de Santa Cecilia', '54130');
INSERT INTO public.colonias VALUES (2824, 20, 'Independencia', '54130');
INSERT INTO public.colonias VALUES (2825, 20, 'Independencia Ampliación', '54130');
INSERT INTO public.colonias VALUES (2826, 20, 'Izcalli del Río', '54130');
INSERT INTO public.colonias VALUES (2827, 20, 'Los Ángeles', '54130');
INSERT INTO public.colonias VALUES (2828, 20, 'Santa Cecilia', '54130');
INSERT INTO public.colonias VALUES (2829, 20, 'Santa Cecilia Acatitlán', '54130');
INSERT INTO public.colonias VALUES (2830, 20, 'Valle de las Pirámides', '54130');
INSERT INTO public.colonias VALUES (2831, 20, 'Jardines de la Cañada', '54130');
INSERT INTO public.colonias VALUES (2832, 20, 'Media Luna', '54130');
INSERT INTO public.colonias VALUES (2833, 20, 'Jardines Santa Cecilia INFONAVIT', '54130');
INSERT INTO public.colonias VALUES (2834, 20, 'Jardines de Santa Cecilia', '54134');
INSERT INTO public.colonias VALUES (2835, 20, 'San Buenaventura', '54135');
INSERT INTO public.colonias VALUES (2837, 20, 'El Puerto', '54140');
INSERT INTO public.colonias VALUES (2838, 20, 'Izcalli Acatitlán', '54140');
INSERT INTO public.colonias VALUES (2839, 20, 'Izcalli Pirámide', '54140');
INSERT INTO public.colonias VALUES (2840, 20, 'Izcalli Pirámide II', '54140');
INSERT INTO public.colonias VALUES (2841, 20, 'La Cantera', '54140');
INSERT INTO public.colonias VALUES (2842, 20, 'Ex-Ejido de San Lucas Patoni', '54140');
INSERT INTO public.colonias VALUES (2843, 20, 'San Miguel Chalma', '54140');
INSERT INTO public.colonias VALUES (2844, 20, 'El Tenayo Centro', '54140');
INSERT INTO public.colonias VALUES (2845, 20, 'El Tenayo Norte', '54140');
INSERT INTO public.colonias VALUES (2846, 20, 'FFCC Cecilia Mora Viuda de Gómez', '54140');
INSERT INTO public.colonias VALUES (2847, 20, 'El Tenayo Sur', '54140');
INSERT INTO public.colonias VALUES (2848, 20, 'Chalma La Unión', '54142');
INSERT INTO public.colonias VALUES (2849, 20, 'Chalma La Barranca', '54143');
INSERT INTO public.colonias VALUES (2851, 20, 'La Cuchilla', '54146');
INSERT INTO public.colonias VALUES (2852, 20, 'El Tenayo', '54147');
INSERT INTO public.colonias VALUES (2853, 20, 'Valle del Tenayo', '54147');
INSERT INTO public.colonias VALUES (2854, 20, 'Hugo Cervantes del Río', '54149');
INSERT INTO public.colonias VALUES (2855, 20, 'Acueducto Tenayuca', '54150');
INSERT INTO public.colonias VALUES (2856, 20, 'Ahuehuetes', '54150');
INSERT INTO public.colonias VALUES (2857, 20, 'Arenal Tenayuca', '54150');
INSERT INTO public.colonias VALUES (2858, 20, 'Loma Escondida', '54150');
INSERT INTO public.colonias VALUES (2859, 20, 'San Bartolo Tenayuca', '54150');
INSERT INTO public.colonias VALUES (2860, 20, 'Valle Ceylán', '54150');
INSERT INTO public.colonias VALUES (2861, 20, 'Ampliación Valle Ceylán', '54150');
INSERT INTO public.colonias VALUES (2862, 20, 'La Purísima', '54152');
INSERT INTO public.colonias VALUES (2863, 20, 'Poder de Dios', '54158');
INSERT INTO public.colonias VALUES (2864, 20, 'Artemisa', '54160');
INSERT INTO public.colonias VALUES (2865, 20, 'La Joya Ixtacala', '54160');
INSERT INTO public.colonias VALUES (2866, 20, 'Miraflores', '54160');
INSERT INTO public.colonias VALUES (2867, 20, 'Nueva Ixtacala', '54160');
INSERT INTO public.colonias VALUES (2868, 20, 'P.I.P.S.A.', '54160');
INSERT INTO public.colonias VALUES (2869, 20, 'Prado Ixtacala', '54160');
INSERT INTO public.colonias VALUES (2870, 20, 'San Antonio Ixtacala', '54160');
INSERT INTO public.colonias VALUES (2871, 20, 'San Felipe Ixtacala', '54160');
INSERT INTO public.colonias VALUES (2872, 20, 'San Juan Ixtacala', '54160');
INSERT INTO public.colonias VALUES (2873, 20, 'El Tejocote', '54160');
INSERT INTO public.colonias VALUES (2874, 20, 'Ceylán Ixtacala', '54162');
INSERT INTO public.colonias VALUES (2875, 20, 'San Juan Ixtacala Ampliación Norte', '54168');
INSERT INTO public.colonias VALUES (2876, 20, 'Parque industrial San Pablo Xalpa', '54170');
INSERT INTO public.colonias VALUES (2877, 20, 'Prado Vallejo', '54170');
INSERT INTO public.colonias VALUES (2878, 20, 'Prensa Nacional', '54170');
INSERT INTO public.colonias VALUES (2879, 20, 'Venustiano Carranza', '54170');
INSERT INTO public.colonias VALUES (2880, 20, 'Bosques de Ceylán', '54170');
INSERT INTO public.colonias VALUES (2881, 20, 'Ex Hacienda de En Medio', '54172');
INSERT INTO public.colonias VALUES (2882, 20, 'Maravillas Ceylán', '54173');
INSERT INTO public.colonias VALUES (2883, 20, 'Lomas de San Juan Ixhuatepec', '54180');
INSERT INTO public.colonias VALUES (2884, 20, 'San José Ixhuatepec', '54180');
INSERT INTO public.colonias VALUES (2885, 20, 'San Juan Ixhuatepec', '54180');
INSERT INTO public.colonias VALUES (2886, 20, 'Atrás del Tequiquil', '54180');
INSERT INTO public.colonias VALUES (2887, 20, 'La Presa', '54187');
INSERT INTO public.colonias VALUES (2888, 20, 'Ecuestre Residencial San José', '54187');
INSERT INTO public.colonias VALUES (2889, 20, 'Magisterial Siglo XXI', '54187');
INSERT INTO public.colonias VALUES (2890, 20, 'Lázaro Cárdenas 1ra. Sección', '54189');
INSERT INTO public.colonias VALUES (2891, 20, 'Lázaro Cárdenas 2da. Sección', '54189');
INSERT INTO public.colonias VALUES (2892, 20, 'Lázaro Cárdenas 3ra. Sección', '54189');
INSERT INTO public.colonias VALUES (2893, 20, 'FFCC Concepción Zepeda Viuda de Gómez Z.', '54190');
INSERT INTO public.colonias VALUES (2894, 20, 'Constitución de 1917', '54190');
INSERT INTO public.colonias VALUES (2895, 20, 'Constituyentes de 1857', '54190');
INSERT INTO public.colonias VALUES (2896, 20, 'División del Norte', '54190');
INSERT INTO public.colonias VALUES (2897, 20, 'Dr. Jorge Jiménez Cantú', '54190');
INSERT INTO public.colonias VALUES (2898, 20, 'La Laguna', '54190');
INSERT INTO public.colonias VALUES (2899, 20, 'Marina Nacional', '54190');
INSERT INTO public.colonias VALUES (2900, 20, 'La Petrolera', '54190');
INSERT INTO public.colonias VALUES (2901, 20, 'Ex-Ejido de Tepeolulco', '54193');
INSERT INTO public.colonias VALUES (2902, 20, 'Santa Virginia', '54195');
INSERT INTO public.colonias VALUES (2903, 20, 'Colinas de San José', '54195');
INSERT INTO public.colonias VALUES (2904, 20, 'Bahía del Copal', '54196');
INSERT INTO public.colonias VALUES (2905, 20, 'Ángeles San José', '54196');
INSERT INTO public.colonias VALUES (2906, 20, 'San Isidro Ixhuatepec', '54197');
INSERT INTO public.colonias VALUES (2907, 20, 'Lomas de Lindavista El Copal', '54198');


--
-- TOC entry 3698 (class 0 OID 40981)
-- Dependencies: 278
-- Data for Name: desparasitaciones; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.desparasitaciones VALUES (3, 9, 'Externa', 'Drontal plus', '2026-01-09', '2026-01-27');


--
-- TOC entry 3676 (class 0 OID 24675)
-- Dependencies: 256
-- Data for Name: tipos_domicilio; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.tipos_domicilio VALUES (1, 'Casa', 'Domicilio particular');
INSERT INTO public.tipos_domicilio VALUES (2, 'Departamento', 'Departamento o apartamento');
INSERT INTO public.tipos_domicilio VALUES (3, 'Trabajo', 'Dirección laboral');
INSERT INTO public.tipos_domicilio VALUES (4, 'Temporal', 'Domicilio temporal / temporalmente hospedado');
INSERT INTO public.tipos_domicilio VALUES (5, 'Otro', 'Otro tipo de domicilio');


--
-- TOC entry 3641 (class 0 OID 24584)
-- Dependencies: 221
-- Data for Name: direcciones_propietarios; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.direcciones_propietarios VALUES (2, 2, 1, 'Manuel Martinez Solorzano', '2', '2', 1151, 1, 1, '1000', '2025-10-13', '2025-10-08', true, 'Esta es Informacion adicional');
INSERT INTO public.direcciones_propietarios VALUES (3, 5, 1, 'Dr. Manuel Martinez Solorzano', '11', '12', 1244, 1, 7, '9260', '2026-01-07', '2026-01-08', true, 'Esta es informacion adicional');


--
-- TOC entry 3674 (class 0 OID 24671)
-- Dependencies: 254
-- Data for Name: tipos_documentos; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.tipos_documentos VALUES (1, 'Fotos de la mascota');
INSERT INTO public.tipos_documentos VALUES (2, 'Certificado de esterilización');
INSERT INTO public.tipos_documentos VALUES (3, 'Certificado de desparatización');
INSERT INTO public.tipos_documentos VALUES (4, 'Cartilla de vacunación');


--
-- TOC entry 3643 (class 0 OID 24592)
-- Dependencies: 223
-- Data for Name: documentos_mascotas; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.documentos_mascotas VALUES (1, 4, 1, 'WhatsApp Image 2025-10-05 at 12.22.13 PM.jpeg', 'uploads\1760325682927-249752473.jpeg', '2025-10-13 03:21:22.932302+00');
INSERT INTO public.documentos_mascotas VALUES (2, 4, 2, 'PrÃ¡ctica 3. RegresiÃ³n Lineal con BGD.pdf', 'uploads\1760325682992-11882067.pdf', '2025-10-13 03:21:22.996015+00');
INSERT INTO public.documentos_mascotas VALUES (3, 4, 3, '2. Aprendizaje AutomÃ¡tico_2025.pdf', 'uploads\1760325683000-714710538.pdf', '2025-10-13 03:21:23.02046+00');
INSERT INTO public.documentos_mascotas VALUES (4, 4, 4, 'Pomerleau  NIPS-1988.pdf', 'uploads\1760325683025-756067330.pdf', '2025-10-13 03:21:23.067905+00');
INSERT INTO public.documentos_mascotas VALUES (12, 9, 4, 'Preguntas Tarea1.pdf', 'uploads\1767839777188-951084511.pdf', '2026-01-08 02:36:17.392551+00');
INSERT INTO public.documentos_mascotas VALUES (13, 13, 2, 'AcuseCita.pdf', 'uploads/1767896963922-585857941.pdf', '2026-01-08 18:29:24.486079+00');


--
-- TOC entry 3645 (class 0 OID 24599)
-- Dependencies: 225
-- Data for Name: enfermedades; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.enfermedades VALUES (28, 'Parvovirosis', 'Enfermedad viral altamente contagiosa que afecta el tracto intestinal', 1);
INSERT INTO public.enfermedades VALUES (29, 'Moquillo', 'Enfermedad viral que afecta sistema respiratorio, digestivo y nervioso', 1);
INSERT INTO public.enfermedades VALUES (30, 'Leptospirosis', 'Enfermedad bacteriana transmitida por contacto con agua contaminada', 1);
INSERT INTO public.enfermedades VALUES (31, 'Rabia', 'Enfermedad viral que afecta el sistema nervioso central', 1);
INSERT INTO public.enfermedades VALUES (32, 'Sarna', 'Infestación por ácaros que provoca picazón intensa y pérdida de pelo', 1);
INSERT INTO public.enfermedades VALUES (33, 'Enfermedad periodontal', 'Problemas dentales por acumulación de placa y sarro', 1);
INSERT INTO public.enfermedades VALUES (34, 'Gastroenteritis', 'Inflamación del estómago y los intestinos que causa vómitos y diarrea', 1);
INSERT INTO public.enfermedades VALUES (35, 'Hepatitis canina', 'Enfermedad viral que afecta el hígado', 1);
INSERT INTO public.enfermedades VALUES (36, 'Tos de las perreras', 'Infección respiratoria altamente contagiosa', 1);
INSERT INTO public.enfermedades VALUES (37, 'Leishmaniosis', 'Enfermedad parasitaria transmitida por mosquitos', 1);
INSERT INTO public.enfermedades VALUES (38, 'Enfermedad de Lyme', 'Enfermedad bacteriana transmitida por garrapatas', 1);
INSERT INTO public.enfermedades VALUES (39, 'Ehrlichiosis', 'Enfermedad bacteriana transmitida por garrapatas', 1);
INSERT INTO public.enfermedades VALUES (40, 'Diabetes', 'Alteración en la regulación de la glucosa en sangre', 1);
INSERT INTO public.enfermedades VALUES (41, 'Obesidad', 'Acumulación excesiva de grasa corporal', 1);
INSERT INTO public.enfermedades VALUES (42, 'Insuficiencia renal', 'Disminución de la función renal', 1);
INSERT INTO public.enfermedades VALUES (43, 'Leucemia felina', 'Enfermedad viral que afecta el sistema inmunológico', 2);
INSERT INTO public.enfermedades VALUES (44, 'Inmunodeficiencia felina', 'Debilita el sistema inmunológico del gato', 2);
INSERT INTO public.enfermedades VALUES (45, 'Panleucopenia felina', 'Enfermedad viral que afecta el sistema digestivo e inmunológico', 2);
INSERT INTO public.enfermedades VALUES (46, 'Rinotraqueítis felina', 'Infección respiratoria viral', 2);
INSERT INTO public.enfermedades VALUES (47, 'Clamidiosis', 'Infección bacteriana que provoca conjuntivitis y problemas respiratorios', 2);
INSERT INTO public.enfermedades VALUES (48, 'Alergias', 'Reacciones alérgicas a alimentos, ácaros del polvo o polen', 2);
INSERT INTO public.enfermedades VALUES (49, 'Conjuntivitis', 'Inflamación de la conjuntiva ocular', 2);
INSERT INTO public.enfermedades VALUES (50, 'Insuficiencia renal crónica', 'Disminución progresiva de la función renal', 2);
INSERT INTO public.enfermedades VALUES (51, 'Cálculos renales', 'Formación de piedras en los riñones', 2);
INSERT INTO public.enfermedades VALUES (52, 'Diabetes felina', 'Alteración en la regulación de la glucosa en sangre', 2);
INSERT INTO public.enfermedades VALUES (53, 'Obesidad felina', 'Acumulación excesiva de grasa corporal', 2);
INSERT INTO public.enfermedades VALUES (54, 'Enfermedad periodontal', 'Problemas dentales por acumulación de placa y sarro', 2);
INSERT INTO public.enfermedades VALUES (55, 'Toxoplasmosis', 'Enfermedad parasitaria causada por Toxoplasma gondii', 2);
INSERT INTO public.enfermedades VALUES (56, 'Rabia', 'Enfermedad viral que afecta el sistema nervioso central', 2);
INSERT INTO public.enfermedades VALUES (57, 'Herpesvirus felino', 'Virus que causa enfermedades respiratorias y oculares', 2);


--
-- TOC entry 3647 (class 0 OID 24605)
-- Dependencies: 227
-- Data for Name: enfermedades_mascotas; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.enfermedades_mascotas VALUES (3, 4, 28, '2024-01-15', 'Mejoría notable después de 3 días de tratamiento. Temperatura normal.', 'Continuar antibiótico 4 días más. Agregar probiótico.');
INSERT INTO public.enfermedades_mascotas VALUES (8, 9, 52, '2026-01-05', 'Esto es un virus muy cabron', 'Palmaditas en la espalda');
INSERT INTO public.enfermedades_mascotas VALUES (12, 13, 52, '2026-01-14', 'Se siente mal', 'Darle bestios');


--
-- TOC entry 3696 (class 0 OID 40967)
-- Dependencies: 276
-- Data for Name: mascotas_alergias; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.mascotas_alergias VALUES (9, 7, 'Moderada');


--
-- TOC entry 3656 (class 0 OID 24630)
-- Dependencies: 236
-- Data for Name: mascotas_colores; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--



--
-- TOC entry 3704 (class 0 OID 41024)
-- Dependencies: 284
-- Data for Name: pagos; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.pagos VALUES (19, 33, 1250.00, 'efectivo', 'completado', '2026-01-08 23:30:30.278241');
INSERT INTO public.pagos VALUES (20, 34, 1650.00, 'efectivo', 'completado', '2026-01-10 21:48:33.550607');


--
-- TOC entry 3693 (class 0 OID 32819)
-- Dependencies: 273
-- Data for Name: reservaciones_servicios; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.reservaciones_servicios VALUES (19, 33, 10, 1, 150.00);
INSERT INTO public.reservaciones_servicios VALUES (20, 33, 5, 1, 250.00);
INSERT INTO public.reservaciones_servicios VALUES (21, 34, 5, 1, 250.00);
INSERT INTO public.reservaciones_servicios VALUES (22, 34, 1, 1, 550.00);


--
-- TOC entry 3678 (class 0 OID 24679)
-- Dependencies: 258
-- Data for Name: tipos_telefono; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.tipos_telefono VALUES (1, 'Celular');
INSERT INTO public.tipos_telefono VALUES (2, 'Teléfono Fijo');
INSERT INTO public.tipos_telefono VALUES (3, 'Trabajo');
INSERT INTO public.tipos_telefono VALUES (4, 'Otro');


--
-- TOC entry 3672 (class 0 OID 24666)
-- Dependencies: 252
-- Data for Name: telefonos_propietarios; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.telefonos_propietarios VALUES (1, 2, '5541466229', 1, 'Aaron Ugalde', 'Propietario', true, 'Amarillo');
INSERT INTO public.telefonos_propietarios VALUES (3, 3, '5516197078', 1, 'Amma', 'MAma', true, 'Soy yo');
INSERT INTO public.telefonos_propietarios VALUES (4, 4, '5516197079', 1, 'nato', 'papa', true, 'Soy yo');
INSERT INTO public.telefonos_propietarios VALUES (5, 5, '5541456229', 1, 'Aarón ', 'Propietario', true, 'Hablarme con cariño');


--
-- TOC entry 3680 (class 0 OID 24683)
-- Dependencies: 260
-- Data for Name: vacunas; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.vacunas VALUES (1, 'Parvovirus', 'Protege contra parvovirosis canina', 1);
INSERT INTO public.vacunas VALUES (2, 'Moquillo', 'Protege contra distemper o moquillo', 1);
INSERT INTO public.vacunas VALUES (3, 'Rabia', 'Protege contra rabia', 1);
INSERT INTO public.vacunas VALUES (4, 'Hepatitis canina', 'Protege contra adenovirus tipo 1', 1);
INSERT INTO public.vacunas VALUES (5, 'Leptospirosis', 'Protege contra la leptospirosis bacteriana', 1);
INSERT INTO public.vacunas VALUES (6, 'Parainfluenza', 'Protege contra virus de parainfluenza canina', 1);
INSERT INTO public.vacunas VALUES (7, 'Bordetella', 'Previene la tos de las perreras', 1);
INSERT INTO public.vacunas VALUES (8, 'Coronavirus canino', 'Protege contra coronavirus intestinal', 1);
INSERT INTO public.vacunas VALUES (9, 'Leishmaniosis', 'Vacuna preventiva contra leishmaniasis', 1);
INSERT INTO public.vacunas VALUES (10, 'Gripe canina', 'Protege contra influenza canina', 1);
INSERT INTO public.vacunas VALUES (11, 'Panleucopenia felina', 'Protege contra parvovirus felino', 2);
INSERT INTO public.vacunas VALUES (12, 'Rinotraqueítis felina', 'Protege contra herpesvirus felino', 2);
INSERT INTO public.vacunas VALUES (13, 'Calicivirus felino', 'Protege contra calicivirus felino', 2);
INSERT INTO public.vacunas VALUES (14, 'Rabia', 'Protege contra rabia', 2);
INSERT INTO public.vacunas VALUES (15, 'Leucemia felina', 'Protege contra virus de leucemia felina', 2);
INSERT INTO public.vacunas VALUES (16, 'Clamidiosis', 'Protege contra infección por Chlamydophila felis', 2);
INSERT INTO public.vacunas VALUES (17, 'Virus de la inmunodeficiencia felina', 'Vacuna experimental contra FIV', 2);
INSERT INTO public.vacunas VALUES (18, 'Gripe felina', 'Protege contra infecciones respiratorias', 2);
INSERT INTO public.vacunas VALUES (19, 'Panleucopenia y rinotraqueítis combinadas', 'Vacuna combinada multivalente', 2);
INSERT INTO public.vacunas VALUES (20, 'Calicivirus y herpesvirus combinados', 'Vacuna combinada multivalente', 2);


--
-- TOC entry 3681 (class 0 OID 24688)
-- Dependencies: 261
-- Data for Name: vacunas_mascotas; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.vacunas_mascotas VALUES (1, 4, 14, NULL, '2025-03-08', '2025-09-17', '123SAD234', 'Revacunación completada completisima');
INSERT INTO public.vacunas_mascotas VALUES (6, 9, 11, 'Panleucopenia felina', '2026-01-15', '2026-02-12', 'Alejandro', 'Observacion');
INSERT INTO public.vacunas_mascotas VALUES (12, 4, 1, NULL, '2025-07-10', '2026-07-10', 'Dra. María Torres', NULL);
INSERT INTO public.vacunas_mascotas VALUES (13, 13, 14, 'Rabia', '2025-12-30', '2026-06-08', 'Alejandro', 'Twink-y es un Twink');
INSERT INTO public.vacunas_mascotas VALUES (14, 13, 14, 'Rabia', '2026-01-23', '2026-01-21', 'pet vet', NULL);


--
-- TOC entry 3710 (class 0 OID 0)
-- Dependencies: 274
-- Name: alergias_alergia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.alergias_alergia_id_seq', 11, true);


--
-- TOC entry 3711 (class 0 OID 0)
-- Dependencies: 281
-- Name: citas_servicios_cita_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.citas_servicios_cita_id_seq', 6, true);


--
-- TOC entry 3712 (class 0 OID 0)
-- Dependencies: 218
-- Name: colonias_colonia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.colonias_colonia_id_seq', 2908, true);


--
-- TOC entry 3713 (class 0 OID 0)
-- Dependencies: 220
-- Name: colores_color_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.colores_color_id_seq', 18, true);


--
-- TOC entry 3714 (class 0 OID 0)
-- Dependencies: 277
-- Name: desparasitaciones_desparasitacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.desparasitaciones_desparasitacion_id_seq', 7, true);


--
-- TOC entry 3715 (class 0 OID 0)
-- Dependencies: 222
-- Name: direcciones_propietarios_direccion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.direcciones_propietarios_direccion_id_seq', 3, true);


--
-- TOC entry 3716 (class 0 OID 0)
-- Dependencies: 224
-- Name: documentos_mascotas_documento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.documentos_mascotas_documento_id_seq', 13, true);


--
-- TOC entry 3717 (class 0 OID 0)
-- Dependencies: 279
-- Name: empleados_empleado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.empleados_empleado_id_seq', 6, true);


--
-- TOC entry 3718 (class 0 OID 0)
-- Dependencies: 226
-- Name: enfermedades_enfermedad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.enfermedades_enfermedad_id_seq', 57, true);


--
-- TOC entry 3719 (class 0 OID 0)
-- Dependencies: 228
-- Name: enfermedades_mascotas_enfermedad_mascota_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.enfermedades_mascotas_enfermedad_mascota_id_seq', 12, true);


--
-- TOC entry 3720 (class 0 OID 0)
-- Dependencies: 230
-- Name: especies_especie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.especies_especie_id_seq', 2, true);


--
-- TOC entry 3721 (class 0 OID 0)
-- Dependencies: 232
-- Name: estados_estado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.estados_estado_id_seq', 5, true);


--
-- TOC entry 3722 (class 0 OID 0)
-- Dependencies: 268
-- Name: estados_reservacion_estado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.estados_reservacion_estado_id_seq', 6, true);


--
-- TOC entry 3723 (class 0 OID 0)
-- Dependencies: 234
-- Name: funcion_mascota_funcion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.funcion_mascota_funcion_id_seq', 4, true);


--
-- TOC entry 3724 (class 0 OID 0)
-- Dependencies: 264
-- Name: habitaciones_habitacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.habitaciones_habitacion_id_seq', 17, true);


--
-- TOC entry 3725 (class 0 OID 0)
-- Dependencies: 237
-- Name: mascotas_mascota_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.mascotas_mascota_id_seq', 14, true);


--
-- TOC entry 3726 (class 0 OID 0)
-- Dependencies: 239
-- Name: municipios_municipio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.municipios_municipio_id_seq', 20, true);


--
-- TOC entry 3727 (class 0 OID 0)
-- Dependencies: 241
-- Name: origen_mascota_origen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.origen_mascota_origen_id_seq', 4, true);


--
-- TOC entry 3728 (class 0 OID 0)
-- Dependencies: 283
-- Name: pagos_pago_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.pagos_pago_id_seq', 20, true);


--
-- TOC entry 3729 (class 0 OID 0)
-- Dependencies: 243
-- Name: patron_pelo_patron_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.patron_pelo_patron_id_seq', 8, true);


--
-- TOC entry 3730 (class 0 OID 0)
-- Dependencies: 245
-- Name: propietarios_propietario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.propietarios_propietario_id_seq', 5, true);


--
-- TOC entry 3731 (class 0 OID 0)
-- Dependencies: 247
-- Name: razas_raza_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.razas_raza_id_seq', 422, true);


--
-- TOC entry 3732 (class 0 OID 0)
-- Dependencies: 270
-- Name: reservaciones_reservacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.reservaciones_reservacion_id_seq', 34, true);


--
-- TOC entry 3733 (class 0 OID 0)
-- Dependencies: 272
-- Name: reservaciones_servicios_reservacion_servicio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.reservaciones_servicios_reservacion_servicio_id_seq', 22, true);


--
-- TOC entry 3734 (class 0 OID 0)
-- Dependencies: 249
-- Name: roles_rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.roles_rol_id_seq', 2, true);


--
-- TOC entry 3735 (class 0 OID 0)
-- Dependencies: 266
-- Name: servicios_servicio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.servicios_servicio_id_seq', 11, true);


--
-- TOC entry 3736 (class 0 OID 0)
-- Dependencies: 251
-- Name: sexos_sexo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.sexos_sexo_id_seq', 3, true);


--
-- TOC entry 3737 (class 0 OID 0)
-- Dependencies: 253
-- Name: telefonos_propietarios_telefono_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.telefonos_propietarios_telefono_id_seq', 5, true);


--
-- TOC entry 3738 (class 0 OID 0)
-- Dependencies: 255
-- Name: tipos_documentos_tipo_documento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.tipos_documentos_tipo_documento_id_seq', 4, true);


--
-- TOC entry 3739 (class 0 OID 0)
-- Dependencies: 257
-- Name: tipos_domicilio_tipo_domicilio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.tipos_domicilio_tipo_domicilio_id_seq', 5, true);


--
-- TOC entry 3740 (class 0 OID 0)
-- Dependencies: 259
-- Name: tipos_telefono_tipo_telefono_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.tipos_telefono_tipo_telefono_id_seq', 4, true);


--
-- TOC entry 3741 (class 0 OID 0)
-- Dependencies: 262
-- Name: vacunas_mascotas_vacuna_mascota_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.vacunas_mascotas_vacuna_mascota_id_seq', 14, true);


--
-- TOC entry 3742 (class 0 OID 0)
-- Dependencies: 263
-- Name: vacunas_vacuna_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.vacunas_vacuna_id_seq', 20, true);


-- Completed on 2026-01-11 13:59:17

--
-- PostgreSQL database dump complete
--


