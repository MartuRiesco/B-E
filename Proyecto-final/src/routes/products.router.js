import {Router} from "express"
import ProductManager from '../classes/productManager.js'


const productManager = new ProductManager('src/products.json');
 let products = await productManager.getProduct();
const router = Router()
 router.get('/', async(req, res) => {
     const { limit } = req.query;
     if (!limit) {
        return res.status(201).send(products)
     } else {
       const numberLimit = parseInt(limit);
   
       if (isNaN(numberLimit) || numberLimit <= 0) {
         return res.status(400).json({ error: 'Limite invalido' });
       }else{
       const limitedProducts = products.slice(0, numberLimit);
       return res.json(limitedProducts);}
   
     }
   });
   router.get('/:productId', async(req, res) => {
    const { productId } = req.params;
    const prod = products.find((product) => product.id === parseInt(productId))
    if(!prod){
      return res.status(400).json({ error: 'No existe un producto con ese id' });
    }else{
    const product = products.find((user) => user.id === parseInt(productId));
    res.json(product);}
  });
   export default  router;
/*  router.get();
 router.post();
 router.put();
 router.delete(); */
