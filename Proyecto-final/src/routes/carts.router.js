import {Router} from "express"
import CartManager from "../classes/cartManager.js";
import products from "./products.router.js";
/* import ProductManager from "../classes/productManager"; */

const cartManager = new CartManager('src/cart.json');
const router =Router()

router.post('/cart', async (req, res)=>{
    const newCart = await cartManager.addCart();
    try {
        return res.status(201).json({data: newCart, message: `New Cart with id ${newCart.id} added to database`})

    }catch(error){
        return res.status(500).json({error: error.message})
    }
})

router.get('/cart/:cartId', async (req, res)=>{
 try{  const {cartId } = req.params;
    const cartFound = await cartManager.getCartById(Number(cartId));
    if(cartFound){
        res.status(201).send(cartFound)
    }else{
        throw new Error('no existe un carrito con el id');
   }} catch(error){
    res.status(400).json({ error: 'No existe un producto con ese id' })
   }
})
router.post('/cart/:cartId/product/:productId', async (req,res)=>{
    try{
        const {cartId}= req.params
        const {productId}= req.params;
        const productFound = products.find((p)=>p.id === Number(productId));
        if(productFound){
            await cartManager.addProductToCart(Number(cartId),productoEncontrado)
            res.status(201).send(productoEncontrado)
        }else{
            throw new Error ('no existe un producto con ese id')
        }

    }
    catch(error){
        return res.status(400).send({error: error.message})
    }
})
export default router

/* router.get();
router.post();
router.get(); */