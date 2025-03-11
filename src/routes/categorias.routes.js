import { Router } from "express";
import { getCategoria,getCategorias,createCategorias,updateCategorias,deleteCategorias }
 from "../controllers/categorias.controllers.js";

const router = Router()

router.get("/categorias",getCategorias)
router.get("/categoria/:id",getCategoria)
router.post("/categoria",createCategorias)
router.patch("/categoria/:id",updateCategorias)
router.delete("/categoria/:id",deleteCategorias)

export default router;