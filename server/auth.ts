import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import crypto from 'node:crypto';

const JWT_SECRET = process.env.JWT_SECRET || (() => {
  console.warn("JWT_SECRET not set, using generated secret (not recommended for production)");
  return crypto.randomBytes(64).toString('hex');
})();

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export function generateJWT(user: { id: string; email: string; name: string }): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJWT(token: string): { id: string; email: string; name: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string; name: string };
  } catch {
    return null;
  }
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : req.cookies?.auth_token;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const user = verifyJWT(token);
  if (!user) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  req.user = user;
  next();
}

export function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : req.cookies?.auth_token;

  if (token) {
    const user = verifyJWT(token);
    if (user) {
      req.user = user;
    }
  }

  next();
}