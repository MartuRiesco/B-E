import { Router } from "express";
import { authenticationMiddleware, authorizationMiddleware } from "../../utils.js";
import CartModel from "../../models/cart.model.js";
import CartController from "../../controller/cart.controller.js";
import ProductsController from "../../controller/product.controller.js";

const router = Router()
router.post('/carts/:cid/purchase', authenticationMiddleware('jwt'), CartController.purchaseCart);

router.get('/carts',authenticationMiddleware('jwt'), authorizationMiddleware(['premium', 'admin']), async(req, res)=>{
  try {
    const carts = await CartController.getAllCarts({})
    res.status(200).json(carts)
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  } 
    })
    router.get('/carts/:cid', authenticationMiddleware('jwt'), async (req, res) => {
      try {
        console.log('req', req.user.cartId);
        const user = req.user;
        const cartId =user.cartId
        console.log(cartId);
        const result = await CartController.getCartById(cartId);
        res.status(200).json(buildResponse(cartId, result))
       /*  res.render('cart', buildResponse(cartId, result)); */
      } catch (error) {
        req.logger.error(error.message)
      }
        
      
    });
         
        const buildResponse = (cid, data) => {
          const payload = data.products.map(product => product.toJSON())
            return {
                cartId: cid,
                payload
        }
        };
    
    router.post('/carts', async(req, res)=>{
            const {body}= req
            const cart = await CartController.getOrCreateCart(body)
            res.status(201).send('carrito agregado correctamente').json({cart})
            })
    router.post('/carts/:cid/product/:pid', authenticationMiddleware('jwt'), authorizationMiddleware(['admin', 'premium']), async(req, res)=>{
        const {params:{pid,cid}}= req  
        console.log('user ', req.user); 
        const productToAdd= await ProductsController.getById(pid)
        console.log('ptd', productToAdd.owner);
        if (req.user.role === 'premium' && productToAdd.owner === req.user.email) { 
          return res.status(403).json({ message: 'No podes agregar productos que  hayas creado.' });
      } else{
        console.log(cid);
            const cart = await CartController.addProductToCart(cid, pid)
            console.log('cart, rot', cart);
            res.status(201).json(cart)}
            })
    router.delete('/carts/:cid/product/:pid', authenticationMiddleware('jwt'), async (req, res) => {
                try {
                    const {params:{pid,cid}}= req
                    const cart = await CartController.deleteProductFromCart(cid, pid)
                    res.status(201).send('producto borrado correctamente')
                } catch (error) {
                  res.status(error.statusCode || 500).json({ message: error.message });
                }
              });

              router.put('/carts/:cid', async (req, res) => {
                try {
                  const { params: { cid }, body } = req;
                  await CartController.updateCartById(cid, body);
                  res.status(204).end();
                } catch (error) {
                  res.status(error.statusCode || 500).json({ message: error.message });
                }
              });

              router.put('/carts/:cid/product/:pid', async (req, res) => {
                try {
                    const {params:{pid,cid}, body}= req
                    const cart = await CartController.updateProductInCartById(cid, pid, body)
                    res.status(201).send('producto actualizado correctamente')
                } catch (error) {
                  res.status(error.statusCode || 500).json({ message: error.message });
                }
              });

              router.delete('/carts/:cid', async (req, res) => {
                try {
                    const {params:{cid}}= req
                    const cart = await CartController.deleteCartById(cid)
                    res.status(201).send('carrito borrado correctamente')
                } catch (error) {
                  res.status(error.statusCode || 500).json({ message: error.message });
                }
              });
            
            export default router