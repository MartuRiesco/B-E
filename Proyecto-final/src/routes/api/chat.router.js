import { Router } from "express";
import MessageManager from "../../dao/MessageManager.js";

const router = Router()

router.get('/chat', async(req, res)=>{
    const {query={}}= req
    const message = await MessageManager.get(query)
    res.status(200).json(message)
    })
export default router