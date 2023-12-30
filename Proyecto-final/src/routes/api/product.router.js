import { Router } from "express";
import ProductManager from "../../dao/ProductManager.js";
import productModel from "../../models/product.model.js";
import userModel from "../../models/user.model.js";
import passport from 'passport';
import { authenticationMiddleware, authorizationMiddleware  } from "../../utils.js";
import ProductsController from "../../controller/product.controller.js";

const router = Router()
router.get('/products', authenticationMiddleware('jwt'), async (req, res, next) => {
  try {
  const { page = 1, limit = 5, group, sort } = req.query;
  const opts = { page, limit, sort: { price: sort || 'asc' } };
  const criteria = {};
  const { first_name, last_name, role, cartId } = req.user;
  if (group) {
    criteria.category = group;
  }
  const result = await productModel.paginate(criteria, opts);
  console.log('rol', req.user);
  console.log('cart id req user', cartId);
  res.render('products', buildResponse({ ...result, group, sort, first_name, last_name, role, cartId}));
} catch (error) {
  console.log('Ah ocurrido un error durante la busqueda de productos 😨');
  next(error);
}
}); 
const buildResponse = (data) => {
  return {
    status: 'success',
    payload: data.docs.map(product => product.toJSON()),
    totalPages: data.totalPages,
    prevPage: data.prevPage,
    nextPage: data.nextPage,
    page: data.page,
    userName: data.first_name,
    userLastName: data.last_name,
    userRol:data.role,
    userCart:data.cartId,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
    chatLink:`http://localhost:8080/chat`,
    prevLink: data.hasPrevPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.prevPage}${data.group ? `&group=${data.group}` : ''}${data.sort ? `&sort=${data.sort}` : ''}` : '',
    nextLink: data.hasNextPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.nextPage}${data.group ? `&group=${data.group}` : ''}${data.sort ? `&sort=${data.sort}` : ''}` : '',
  };
};
/* router.get('/products', authenticationMiddleware('jwt'),
async (req, res) => {
const { page = 1, limit = 5, group, sort } = req.query;
const opts = { page, limit, sort: { price: sort || 'asc' } };
const criteria = {};
const { first_name, last_name, rol } = req.user;
/* if (!user) {
  return res.status(401).send('Usuario no autenticado 😨.');
} 
let userData
if (user.email === 'adminCoder@coder.com') {
  userData = {
    first_name: 'Admin',
    last_name: 'Coderhouse',
    rol: 'admin',
  };console.log('userdata', userData);
}
  
else{  userData = await userModel.findOne({ email: user.email });

if (!userData) {
  return res.status(404).send('Usuario no encontrado 😨.');
}} */

/* if (group) {
  criteria.category = group;
}
const result = await productModel.paginate(criteria, opts);
res.render('products', buildResponse({ ...result, group, sort, first_name, last_name, rol}));
}); */ 

router.get('/products/:pid',authenticationMiddleware('jwt'),  async(req, res)=>{
    try {
        const {params:{pid}}= req
    const product = await ProductsController.getById(pid)
    res.status(200).json(product)
    } catch (error) {
        res.status(error.statusCode|| 500).json({message: error.message})
    } 
    })
    router.post('/products', authorizationMiddleware('admin'), async (req, res, next) => {
      try {
        const { body } = req;
        console.log('req.user.role', req.user.role);
        if (req.user.role !== 'admin') {
          return res.status(403).json({ message: 'No tiene permisos para crear productos' });
        }
            await ProductsController.create(body);
        res.status(201).json({ message: 'Producto creado con éxito' });
      } catch (error) {
        console.log('Ha ocurrido un error durante la creación del producto 😨', error);
        next(error);
      }
    });
        router.put('/products/:pid',authorizationMiddleware('admin'), async (req, res) => {
            try {
              const { params: { pid }, body } = req;
              await ProductsController.updateById(pid, body);
              res.status(204).end();
            } catch (error) {
              res.status(error.statusCode || 500).json({ message: error.message });
            }
          });

            router.delete('/products/:pid', authorizationMiddleware('admin'), async (req, res) => {
                try {
                  const { params: { pid } } = req;
                  await ProductsController.deleteById(pid);
                  res.status(204).end();
                } catch (error) {
                  res.status(error.statusCode || 500).json({ message: error.message });
                }
              });
             
              export default router











