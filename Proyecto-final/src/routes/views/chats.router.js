import { Router } from "express";
import MessageManager from "../../dao/MessageManager.js";

const router = Router()

router.get('/chat', async (req, res)=>{
    
    res.render('chat')
})
export default router