import { Router } from "express";
import { getColores,
        getColor,
        createColores,
        updateColor,
        deleteColor
 } from "../controllers/colores.controllers.js";
const router = Router();

router.get("/colores",getColores)
router.get("/color/:id",getColor)
router.post("/color",createColores)
router.patch("/color/:id",updateColor)
router.delete("/color/:id",deleteColor)
export default router; 