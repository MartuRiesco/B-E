import { Router } from "express";
import CartManager from "../../dao/CartManager.js";
const router = Router()

router.get('/carts', async(req, res)=>{
    const {query={}}= req
    const carts = await CartManager.get(query)
    res.status(200).json(carts)
    })
    
    router.get('/carts/:cid', async(req, res)=>{
        try {
            const {params:{cid}}= req
        const cart = await CartManager.getById(cid)
        console.log('cart', cart);
        res.status(201).json(cart)
       /*  res.render('cart', { cart }); */
        } catch (error) {
            res.status(error.statusCode|| 500).json({message: error.message})
        } 
        })
    
    router.post('/carts', async(req, res)=>{
            const {body}= req
            const cart = await CartManager.create(body)
            res.status(201).send('carrito agregado correctamente')
            })
    router.post('/carts/:cid/product/:pid', async(req, res)=>{
        const {params:{pid,cid}}= req
     /*    const { quantity}= req.body */
           
            const cart = await CartManager.addProductToCart(cid, pid)
            res.status(201).send('producto agregado correctamente')
            })
    router.delete('/carts/:cid/product/:pid', async (req, res) => {
                try {
                    const {params:{pid,cid}}= req
                    const cart = await CartManager.deleteProductFromCart(cid, pid)
                    res.status(201).send('producto borrado correctamente')
                } catch (error) {
                  res.status(error.statusCode || 500).json({ message: error.message });
                }
              });

              router.put('/carts/:cid', async (req, res) => {
                try {
                  const { params: { cid }, body } = req;
                  await CartManager.updateById(cid, body);
                  res.status(204).end();
                } catch (error) {
                  res.status(error.statusCode || 500).json({ message: error.message });
                }
              });

              router.put('/carts/:cid/product/:pid', async (req, res) => {
                try {
                    const {params:{pid,cid}, body}= req
                    const cart = await CartManager.updateProductById(cid, pid, body)
                    res.status(201).send('producto actualizado correctamente')
                } catch (error) {
                  res.status(error.statusCode || 500).json({ message: error.message });
                }
              });

              router.delete('/carts/:cid', async (req, res) => {
                try {
                    const {params:{cid}}= req
                    const cart = await CartManager.deleteById(cid)
                    res.status(201).send('carrito borrado correctamente')
                } catch (error) {
                  res.status(error.statusCode || 500).json({ message: error.message });
                }
              });
            
            export default router