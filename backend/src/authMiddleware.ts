// src/authMiddleware.ts

import { expressjwt, GetVerificationKey } from "express-jwt";
import jwksRsa from "jwks-rsa";
import type { Request } from "express";
import dotenv from "dotenv";

dotenv.config();

const tenantId = process.env.TENANT!;
const clientIdBackend = process.env.OAUTHCLIENT!;

// Función para extraer el token de Authorization header
function getTokenFromHeader(req: Request): string | undefined {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return undefined;
  return auth.split(" ")[1];
}

export const jwtCheck = expressjwt({
  // 1. Usar JWKS para obtener la clave de firma
  secret: jwksRsa.expressJwtSecret({
        cache: true, // cachea las llaves para mejorar rendimiento
        rateLimit: true, // limita llamadas al endpoint JWKS
        jwksRequestsPerMinute: 5,
        jwksUri: `https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`
    }) as unknown as GetVerificationKey,

  // 2. Audience: el identificador único de tu API
  audience: `api://${clientIdBackend}`,

  // 3. Issuer: debe coincidir con tu tenant
  issuer: `https://login.microsoftonline.com/${tenantId}/v2.0`,

  // 4. Algoritmos permitidos
  algorithms: ["RS256"],

  // 5. Cómo extraer el token
  getToken: getTokenFromHeader
});
