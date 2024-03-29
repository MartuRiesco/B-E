import {Router} from "express"
import CartManager from "../classes/cartManager.js";
import ProductManager from "../classes/productManager.js";
/* import ProductManager from "../classes/productManager"; */
const cartManager = new CartManager('src/cart.json');
const productManager = new ProductManager('src/products.json');
 let products = await productManager.getProduct();
const CartRouter =Router()

CartRouter .post('/cart', async (req, res)=>{
    const newCart = await cartManager.addCart();
    try {
        return res.status(201).json({data: newCart, message: `New Cart with id ${newCart.id} added to database`})

    }catch(error){
        return res.status(500).json({error: error.message})
    }
})

CartRouter .get('/cart/:cartId', async (req, res)=>{
 try{  const {cartId } = req.params;
    const cartFound = await cartManager.getCartById(cartId);
    if(cartFound){
        res.status(201).send(cartFound)
    }else{
        throw new Error('no existe un carrito con el id');
   }} catch(error){
    res.status(400).json({ error: 'No existe un producto con ese id' })
   }
})
CartRouter .post('/cart/:cartId/product/:productId', async (req,res)=>{
    try{
        const {cartId}= req.params
        const {productId}= req.params;
       
        const productFound = await products.find(p => productId === p.id)
        req.logger.info('product found', productFound);
        if(productFound){
            await cartManager.addProductToCart(cartId,productFound)
            res.status(201).send(productFound)
        }else{
            throw new Error ('no existe un producto con ese id :/')
        }

    }
    catch(error){
        return res.status(400).send({error: error.message})
    }
})
export default CartRouter 

/* router.get();
router.post();
router.get(); */