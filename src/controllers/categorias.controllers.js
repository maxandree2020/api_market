import {pool} from '../db.js'

export const getCategoria = async(req,res)=> {
    try{
        const sql =  "select*from cat_productos where cod=?"
        const [rows] = await pool.query(sql,req.params.id)
        if(rows.length<=0){return res.status(400).json({message: "catengoria not found"})}
        res.json(rows)
    }catch(error){
        return res.status(500).json(error)
    }
}
export const getCategorias = async(req,res)=> {
    try{
        const sql =  "select*from cat_productos"
        const [rows] = await pool.query(sql)
        res.json(rows)
    }catch(error){
        return res.status(500).json(error)
    }
}
export const createCategorias = async (req,res)=> {
    try {
        const sql = "insert into cat_productos()values(?,?,?)"
        const {cod,tit,des} = req.body
        const [rows] = await pool.query(sql,[cod,tit,des])
        res.status(201).json({cod,tit,des})
    } catch (error) {
       return res.status(500).json(error)
    }
}
export const updateCategorias = async (req,res)=>{
    try {
        const sql = "update cat_productos set tit= ifnull(?,tit),des=ifnull(?,des) where cod=? "
        const {tit,des} = req.body
        const [result] = await pool.query(sql,[tit,des,req.params.id]) 
        if(result.affectedRows===0){
            return res.status(400).json({message:'categoria no encontrada'})
        }
        const [rows] = await pool.query("select*from cat_productos where cod=?",req.params.id)
        res.json(rows)
        
    } catch (error) {
        return res.status(500).json(error)
    }
} 
export const deleteCategorias = async (req,res)=>{ 
    try {
        const sql= "delete from cat_productos where cod=?"
        const [rows] = await pool.query(sql,req.params.id)
        
        if(rows.affectedRows <= 0){
            return res.status(404).json({message:"ategoria not found"})
        }
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json(error)        
    }
}