import { ownerRepository } from '../repositories/owner.repository';
import { telefonoRepository } from '../repositories/telefono.repository';
import { direccionRepository } from '../repositories/direccion.repository';
import { hashPassword } from '../utils/hash.util';
import { db } from '../config/database';

export class OwnerService {
  async getMe(propietarioId: number) {
    const owner = await ownerRepository.findById(propietarioId);
    if (!owner) throw new Error('Propietario no encontrado');
    return owner;
  }

  async updateMe(propietarioId: number, data: any) {
    return await ownerRepository.update(propietarioId, data);
  }

  async registerComplete(data: any) {
    return await db.transaction(async (client) => {
      // Hash del password
      const hash_password = await hashPassword(data.propietario.password);
      
      // Crear propietario
      const propietarioId = await ownerRepository.registerComplete(client, {
        ...data.propietario,
        hash_password
      });

      // Insertar teléfonos usando el repositorio
      for (const tel of data.telefonos) {
        // Normalizar datos del teléfono
        const telefonoData = {
          propietario_id: propietarioId,
          numero: tel.numero,
          tipo_telefono_id: tel.tipo_telefono_id,
          nombre_contacto: tel.nombre_contacto,
          relacion_contacto: tel.relacion_contacto,
          es_principal: tel.es_principal,
          notas: tel.notas || null,
        };

        // Insertar usando query directo dentro de la transacción
        await client.query(
          `INSERT INTO telefonos_propietarios 
           (propietario_id, numero, tipo_telefono_id, nombre_contacto, 
            relacion_contacto, es_principal, notas)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            telefonoData.propietario_id,
            telefonoData.numero,
            telefonoData.tipo_telefono_id,
            telefonoData.nombre_contacto,
            telefonoData.relacion_contacto,
            telefonoData.es_principal,
            telefonoData.notas,
          ]
        );
      }

      // Insertar direcciones si existen
      if (data.direcciones?.length > 0) {
        for (const dir of data.direcciones) {
          // Normalizar código postal (remover leading zeros)
          const codigoPostal = dir.codigo_postal 
            ? parseInt(dir.codigo_postal, 10).toString() 
            : null;

          // Normalizar datos de la dirección
          const direccionData = {
            propietario_id: propietarioId,
            tipo_domicilio_id: dir.tipo_domicilio_id,
            calle: dir.calle,
            num_exterior: dir.num_exterior,
            num_interior: dir.num_interior || null,
            codigo_postal: codigoPostal,
            colonia_id: dir.colonia_id,
            estado_id: dir.estado_id,
            municipio_id: dir.municipio_id,
            fecha_inicio: dir.fecha_inicio,
            fecha_fin: dir.fecha_fin || null,
            es_predeterminada: dir.es_predeterminada,
            notas: dir.notas || null,
          };

          // Insertar usando query directo dentro de la transacción
          await client.query(
            `INSERT INTO direcciones_propietarios 
             (propietario_id, tipo_domicilio_id, calle, num_exterior, num_interior,
              codigo_postal, colonia_id, estado_id, municipio_id, fecha_inicio,
              fecha_fin, es_predeterminada, notas)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
            [
              direccionData.propietario_id,
              direccionData.tipo_domicilio_id,
              direccionData.calle,
              direccionData.num_exterior,
              direccionData.num_interior,
              direccionData.codigo_postal,
              direccionData.colonia_id,
              direccionData.estado_id,
              direccionData.municipio_id,
              direccionData.fecha_inicio,
              direccionData.fecha_fin,
              direccionData.es_predeterminada,
              direccionData.notas,
            ]
          );
        }
      }

      return { propietario_id: propietarioId };
    });
  }
}

export const ownerService = new OwnerService();
