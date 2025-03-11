import { json } from 'express'
import {pool} from '../db.js'

export const getMarcas = async (req,res)=>{
    try{
        const [rows] = await pool.query("select*from marcas")
        res.json(rows)
    }catch(error){
        return res.status(500).json(error)
    }
}
export const getMarca = async (req,res)=>{
    try {
        const [rows] = await pool.query("select*from marcas where cod=?",req.params.id);
        if(rows.length<=0){return res.status(400).json({message: "catengoria not found"})}
        res.json(rows)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const createMarca = async (req,res) =>{
    try { 
        const {cod,tit,des} = req.body
        const [rows] = await pool.query("insert into marcas(cod,tit,des) values(?,?,?)",[cod,tit,des])
        if(rows.affectedRows)res.status(201).json({cod,tit,des})
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const updateMarca = async (req,res) =>{
    try {
        const {tit,des} = req.body
        const [rows]= await pool.query("update marcas set tit=ifnull(?,tit),des=ifnull(?,des) where cod=?",
            [tit,des,req.params.id]);
        if(rows.affectedRows===0){return res.status(400).json({message:"marca no encontrada"})}
        const [result] = await pool.query('select*from marcas where cod = ?',req.params.id)
        res.json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const deleteMarca = async(req,res)=>{
    try {
        const [rows]= await pool.query("delete from marcas where cod =?",req.params.id)
        if(rows.affectedRows<=0){return res.status(404).json({message:"marca no encontrada"})}
        res.sendStatus(204)
    } catch (error) {

        return res.status(500).json(error)
    }
}

