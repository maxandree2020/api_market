import { Router } from "express";
import {getPrendas,getPrenda,createPrenda,updatePrenda,deletePrenda,
        getPrendas_vs,getPrendas_v,createPrendas_v,updatePrendas_v,deletePrendas_v
}from "../controllers/prendas.controllers.js"

const router = Router();

router.get("/prendas",getPrendas)
router.get("/prenda/:id",getPrenda)
router.post("/prenda",createPrenda)
router.patch("/prenda/:id",updatePrenda)
router.delete("/prenda/:id",deletePrenda)
//prendas_v
router.get("/prendas_vs",getPrendas_vs)
router.get("/prendas_v/:id",getPrendas_v)
router.post("/prendas_v",createPrendas_v)
router.patch("/prendas_v/:id",updatePrendas_v)
router.delete("/prendas_v/:id",deletePrendas_v)


export default router; 