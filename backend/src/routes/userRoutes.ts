import { Router } from "express";
import { getUser } from "../controllers/userController";
import { jwtCheck } from "../authMiddleware";

const router = Router();

// Ruta protegida: GET /user
router.get("/user", jwtCheck, getUser);

export default router;
