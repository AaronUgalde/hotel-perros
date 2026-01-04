import express from 'express';
import db from '../db';
import { requireAuth } from '../middlewares/auth.middleware';
import { body, param, validationResult } from 'express-validator';
import { Request, Response } from 'express';

interface AuthRequest extends Request {
  user?: { propietario_id: number; rol_id: number };
}

const router = express.Router();