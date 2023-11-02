import { Router } from "express";
import ProductManager from "../../dao/ProductManager.js";

const router = Router()
 
router.get('/products', async(req, res)=>{
const {query={}}= req
const products = await ProductManager.get(query)
res.status(200).json(products)
})

router.get('/products/:pid', async(req, res)=>{
    try {
        const {params:{pid}}= req
    const product = await ProductManager.getById(pid)
    res.status(200).json(product)
    } catch (error) {
        res.status(error.statusCode|| 500).json({message: error.message})
    } 
    })

router.post('/products', async(req, res)=>{
        const {body}= req
        const product = await ProductManager.create(body)
        res.status(201).json(product)
        })

        router.put('/products/:pid', async (req, res) => {
            try {
              const { params: { pid }, body } = req;
              await ProductManager.updateById(pid, body);
              res.status(204).end();
            } catch (error) {
              res.status(error.statusCode || 500).json({ message: error.message });
            }
          });

            router.delete('/products/:pid', async (req, res) => {
                try {
                  const { params: { pid } } = req;
                  await ProductManager.deleteById(pid);
                  res.status(204).end();
                } catch (error) {
                  res.status(error.statusCode || 500).json({ message: error.message });
                }
              });

export default router