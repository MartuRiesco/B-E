import { Router } from "express";
import MessageManager from "../../dao/MessageManager.js";

const router = Router()

/* router.get('/chat', async (req, res)=>{
    const message = await MessageManager.get()
    res.render('chat', { message: message.map(m=> m.toJSON()) } )
}) */
export default router