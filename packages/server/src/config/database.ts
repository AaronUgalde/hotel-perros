// src/config/database.ts
import { Pool, PoolClient, QueryResult } from 'pg';
import { env } from './env';

class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: env.DATABASE_URL,
      max: 20, // máximo de conexiones
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Event handlers para debugging
    this.pool.on('connect', () => {
      console.log('📦 Nueva conexión a PostgreSQL');
    });

    this.pool.on('error', (err) => {
      console.error('❌ Error inesperado en PostgreSQL pool:', err);
    });
  }

  /**
   * Ejecutar query simple
   */
  async query(text: string, params?: any[]): Promise<QueryResult> {
    const start = Date.now();
    try {
      const res = await this.pool.query(text, params);
      const duration = Date.now() - start;
      
      if (env.NODE_ENV === 'development') {
        console.log('🔍 Query ejecutada:', { text, duration: `${duration}ms`, rows: res.rowCount });
      }
      
      return res;
    } catch (error) {
      console.error('❌ Error en query:', { text, error });
      throw error;
    }
  }

  /**
   * Obtener cliente para transacciones
   */
  async getClient(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  /**
   * Ejecutar código dentro de una transacción
   */
  async transaction<T>(
    callback: (client: PoolClient) => Promise<T>
  ): Promise<T> {
    const client = await this.getClient();
    
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Cerrar todas las conexiones
   */
  async close(): Promise<void> {
    await this.pool.end();
    console.log('🔒 Pool de conexiones cerrado');
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }
}

// Exportar instancia única (Singleton)
export const db = new Database();