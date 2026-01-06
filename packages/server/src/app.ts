// src/app.ts
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

// Importar rutas
import authRoutes from './routes/auth.routes';
import ownerRoutes from './routes/owner.routes';
import petRoutes from './routes/pet.routes';
import direccionRoutes from './routes/direccion.routes';
import telefonoRoutes from './routes/telefono.routes';
import documentoRoutes from './routes/documento.routes';
import vaccinationRoutes from './routes/vaccination.routes';
import diseaseRoutes from './routes/disease.routes';
import servicioRoutes from './routes/servicio.routes';
import alergiaRoutes from './routes/alergia.routes';
import desparasitacionRoutes from './routes/desparasitacion.routes';
import habitacionRoutes from './routes/habitacion.routes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandlers();
  }

  private config(): void {
    // CORS
    this.app.use(cors({
      origin: env.FRONTEND_URL,
      credentials: true,
    }));

    // Body parser
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Cookie parser
    this.app.use(cookieParser());

    // Trust proxy (para headers de IP en producción detrás de proxy)
    if (env.NODE_ENV === 'production') {
      this.app.set('trust proxy', 1);
    }
  }

  private routes(): void {
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ 
        ok: true, 
        environment: env.NODE_ENV,
        timestamp: new Date().toISOString()
      });
    });

    // API routes
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/owners', ownerRoutes);
    this.app.use('/api/pets', petRoutes);
    this.app.use('/api/directions', direccionRoutes);
    this.app.use('/api/phones', telefonoRoutes);
    this.app.use('/api/documents', documentoRoutes);
    this.app.use('/api/pet-vaccinations', vaccinationRoutes);
    this.app.use('/api/diseases', diseaseRoutes);
    this.app.use('/api/servicios', servicioRoutes);
    this.app.use('/api/alergias', alergiaRoutes);
    this.app.use('/api/desparasitaciones', desparasitacionRoutes);
    this.app.use('/api/habitaciones', habitacionRoutes);
  }

  private errorHandlers(): void {
    // 404 Not Found
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }
}

export default new App().app;