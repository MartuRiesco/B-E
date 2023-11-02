import { Router } from "express";
import CartManager from "../../dao/ProductManager.js";

const router = Router()

router.get('/carts', async (req, res)=>{
    const carts = await CartManager.get()
    res.render('home', { carts: carts.map(c=> c.toJSON()) } )
})

export default router