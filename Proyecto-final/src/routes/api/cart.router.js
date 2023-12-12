import { Router } from "express";
import { authenticationMiddleware, authorizationMiddleware } from "../../utils.js";
import CartModel from "../../models/cart.model.js";
import CartController from "../../controller/cart.controller.js";

const router = Router()

router.get('/carts',authenticationMiddleware('jwt'), authorizationMiddleware('user'), async(req, res)=>{
  try {
    const carts = await CartController.getAllCarts({}).populate('user').populate('products.product');
    res.status(200).json(carts)
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  } 
    })
router.get('/carts/:cid', async (req, res) => {
  /* const { params: { cid } } = req; */
   try {
    const cid = req.params.cid; 
     const result = await CartController.getCartById(cid)
     console.log('result', result);
     res.render('cart', buildResponse(cid, result))
   } catch (error) {
     console.log('Error', error.message);
   }
        })
        const buildResponse = (cid, data) => {
          const payload = data.products.map(product => product.toJSON())
            console.log('payload', payload)
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
    router.post('/carts/:cid/product/:pid', async(req, res)=>{
        const {params:{pid,cid}}= req
     /*    const { quantity}= req.body */
           
            const cart = await CartController.addProductToCart(cid, pid)
            res.status(201).send('producto agregado correctamente')
            })
    router.delete('/carts/:cid/product/:pid', async (req, res) => {
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