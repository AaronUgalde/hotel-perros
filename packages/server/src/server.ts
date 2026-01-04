// src/server.ts
import app from './app';
import { env } from './config/env';
import { db } from './config/database';

class Server {
  private port: number;

  constructor() {
    this.port = env.PORT;
  }

  async start(): Promise<void> {
    try {
      // Verificar conexión a base de datos
      const dbHealthy = await db.healthCheck();
      if (!dbHealthy) {
        throw new Error('No se pudo conectar a la base de datos');
      }
      console.log('✅ Conexión a PostgreSQL establecida');

      // Iniciar servidor
      app.listen(this.port, () => {
        console.log(`🚀 Servidor corriendo en puerto ${this.port}`);
        console.log(`📦 Entorno: ${env.NODE_ENV}`);
        console.log(`🌐 Frontend URL: ${env.FRONTEND_URL}`);
      });
    } catch (error) {
      console.error('❌ Error al iniciar servidor:', error);
      process.exit(1);
    }
  }

  async shutdown(): Promise<void> {
    console.log('🛑 Cerrando servidor...');
    await db.close();
    process.exit(0);
  }
}

const server = new Server();

// Graceful shutdown
process.on('SIGTERM', () => server.shutdown());
process.on('SIGINT', () => server.shutdown());

// Iniciar servidor
server.start();