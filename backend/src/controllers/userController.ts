import { Request, Response } from "express";

export function getUser(req: Request, res: Response) {
  const claims = (req as any).auth; 
  res.json({
    message: "Datos protegidos desde API",
    user: {
      displayName: claims?.name,
      email: claims?.preferred_username
    }
  });
}
