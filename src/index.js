import express, { request, response } from 'express'

import categoriasRoutes from './routes/categorias.routes.js'
import marcasRoutes from './routes/marcas.route.js'
import coloresRoutes from './routes/colores.routes.js'
import prendasRoutes from './routes/prendas.routes.js'

import './config.js'

const app = express();

app.use(express.json());
app.use(categoriasRoutes);
app.use(marcasRoutes);
app.use(coloresRoutes);
app.use(prendasRoutes);

app.use((req,res,next)=>{
    res.status(404).json({message:"endopoint not found"})
});

app.listen(8000,()=>{
    console.log("iniciando en puerto 8000")
})