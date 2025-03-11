import { pool } from "../db.js";

export const getColores = async(req,res)=>{
    try {
        const [rows] = await pool.query("select*from colores")
        res.json(rows)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const getColor = async (req,res)=>{
    try {
        const [rows]=await pool.query("select*from colores where cod =?",req.params.id)
        if(rows.affectedRows<=0){return res.status(400).json({message:"no se encontro color"})}
        res.json(rows)         
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const createColores = async(req,res)=>{
    try {
        const {tit,des} = req.body
        const [rows] = await pool.query("call createColor(?,?)",[tit,des])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const updateColor=async (req,res)=>{
    try {
        const {tit,des} = req.body
        const [rows]=await pool.query("call updateColor(?,?,?)",[req.params.id,tit,des])
        if(rows[1].affectedRows===0){return res.status(400).json({message:'color no encontrado'})}
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const deleteColor=async(req,res)=>{
    try {
        const [rows] = await pool.query("delete from colores where cod = ?",req.params.id)
        if(rows.affectedRows===0){return res.status(400).json({message: 'color no encontrado'})}
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json(error)
    }
}