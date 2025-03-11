import { pool } from "../db.js";
import { json } from "express";
export const getPrendas = async(req,res)=>{
    try {
        const [rows] = await pool.query("select*from prendas")
        res.json(rows)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getPrenda = async (req,res)=>{
    try {
        const [rows]=await pool.query("select*from prendas where cod =?",req.params.id)
       if(rows.length===0){return res.status(400).json({message:"no se encontro prenda"})}
        res.json(rows)         
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const createPrenda = async(req,res)=>{
    try {
        const {mar,tit,des,talla,cat,col} = req.body
        const [rows] = await pool.query("call createPrendas(?,?,?,?,?,?)",[mar,tit,des,talla,cat,col])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updatePrenda=async (req,res)=>{
    try {
        const {mar,tit,des,talla,cat,col} = req.body
        const [rows]=await pool.query("call updatePrenda(?,?,?,?,?,?,?)",[req.params.id,mar,tit,des,talla,cat,col])
        if(rows[1].affectedRows===0){return res.status(400).json({message:'prenda no encontrado'})}
        res.json(rows)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deletePrenda=async(req,res)=>{
    try {
        const [rows] = await pool.query("delete from prendas where cod = ?",req.params.id)
        if(rows.affectedRows===0){return res.status(400).json({message: 'prenda no encontrado'})}
        res.sendStatus(204)

    } catch (error) {
        return res.status(500).json(error)
    }
}
//prendas_v
export const getPrendas_vs = async(req,res)=>{
    try {
        const [rows] = await pool.query("select*from prendas_v")
        res.json(rows)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getPrendas_v = async (req,res)=>{
    try {
        const [rows]=await pool.query("select*from prendas_v where cod =?",req.params.id)
       if(rows.length===0){return res.status(400).json({message:"no se encontro prenda"})}
        res.json(rows)         
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const createPrendas_v = async(req,res)=>{
    try {
        const {pre,cant,prec_men,prec_may} = req.body
        const [rows] = await pool.query("call createPrenda_v(?,?,?,?)",[pre,cant,prec_men,prec_may])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updatePrendas_v=async (req,res)=>{
    try {
        const {pre,cant,prec_men,prec_may} = req.body
        const [rows]=await pool.query("call updatePrendas_v(?,?,?,?,?)",[req.params.id,pre,cant,prec_men,prec_may])
        if(rows[1].affectedRows===0){return res.status(400).json({message:'prenda no encontrado'})}
        res.json(rows)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deletePrendas_v=async(req,res)=>{
    try {
        const [rows] = await pool.query("delete from prendas_v where cod = ?",req.params.id)
        if(rows.affectedRows===0){return res.status(400).json({message: 'prenda no encontrado'})}
        res.sendStatus(204)

    } catch (error) {
        return res.status(500).json(error)
    }
}