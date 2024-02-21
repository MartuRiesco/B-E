import { Router } from "express";
import productModel from "../../models/product.model.js";
import userModel from "../../models/user.model.js";
import passport from 'passport';
import { authenticationMiddleware, authorizationMiddleware  } from "../../utils.js";
import ProductsController from "../../controller/product.controller.js";
import { uploader } from "../../utils.js";

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
  req.logger.info('rol', role);
  req.logger.info('cart id req user', cartId);
  res.status(200).render('products',buildResponse({ ...result, group, sort, first_name, last_name, role, cartId} ))
  /* res.render('products', buildResponse({ ...result, group, sort, first_name, last_name, role, cartId})); */
} catch (error) {
  req.logger.error('Ah ocurrido un error durante la busqueda de productos 😨');
  next(error);
}
}); 
const buildResponse = (data) => {
  return {
    status: 'success',
    payload: data.docs.map(product => (typeof product.toJSON === 'function' ? product.toJSON() : product)),
    totalPages: data.totalPages,
    prevPage: data.prevPage,
    nextPage: data.nextPage,
    page: data.page,
    userName: data.first_name,
    userLastName: data.last_name,
    userRol: data.role,
    userCart: data.cartId,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
    chatLink: `http://localhost:8080/chat`,
    prevLink: data.hasPrevPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.prevPage}${data.group ? `&group=${data.group}` : ''}${data.sort ? `&sort=${data.sort}` : ''}` : '',
    nextLink: data.hasNextPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.nextPage}${data.group ? `&group=${data.group}` : ''}${data.sort ? `&sort=${data.sort}` : ''}` : '',
  };
};
router.get('/products/:pid',authenticationMiddleware('jwt'),  async(req, res)=>{
    try {
        const {params:{pid}}= req
    const product = await ProductsController.getById(pid)
    res.status(200).json(product)
    } catch (error) {
        res.status(error.statusCode|| 500).json({message: error.message})
    } 
    })
    router.get('/mockingproducts', authenticationMiddleware('jwt'), async (req, res, next) => {
      try { const { page = 1, limit = 5, group, sort } = req.query;
      const opts = { page, limit, sort: { price: sort || 'asc' } };
      const criteria = {};
        if (group) {
        criteria.category = group;
      }
        const { first_name, last_name, role, cartId } = req.user;
        const data = await ProductsController.createFakeProducts();
        res.status(200).json({ message: 'Productos creados' })
        // res.render('products', buildResponse({ ...data, group, sort, first_name, last_name, role, cartId}));
      } catch (error) {
        req.logger.error("Error: ", error.message);
        next(error);
      }
    });
router.post('/products', authenticationMiddleware('jwt'), authorizationMiddleware(['admin','premium']), async (req, res, next) => {
  try {
    const { body, user } = req;
    console.log('role del user', req.user);
    req.logger.info('req.user.role', req.user.role);
    if (req.user.role !== 'admin' && req.user.role !== 'premium') {
      return res.status(403).json({ message: 'No tienes permisos para crear productos' });
    }
        await ProductsController.create(body, user);
    res.status(201).json({ message: 'Producto creado con éxito' });
  } catch (error) {
    req.logger.fatal('Ha ocurrido un error durante la creación del producto 😨', error);
    next(error);
  }
    });
        router.put('/products/:pid', authenticationMiddleware('jwt'),authorizationMiddleware('admin'), async (req, res) => {
            try {
              const { params: { pid }, body } = req;
              await ProductsController.updateById(pid, body);
              res.status(204).end();
            } catch (error) {
              res.status(error.statusCode || 500).json({ message: error.message });
            }
          });

            router.delete('/products/:pid', authenticationMiddleware('jwt'), authorizationMiddleware(['admin','premium']), async (req, res) => {
                try {
                  const { params: { pid } } = req;
                  if (req.user.role !== 'admin' && req.user.role !== 'premium') {
                    return res.status(403).json({ message: 'No tiene permisos para eliminar productos' });
                  } 
                 const productToDelete= await ProductsController.getById(pid)
                  if (req.user.role === 'premium' && productToDelete.owner !== req.user.email) {
                      return res.status(403).json({ message: 'No tienes permisos para borrar productos que no hayas creado.' });
                       } 
                  await ProductsController.deleteById(pid);
                  res.status(204).end();
                } catch (error) {
                  res.status(error.statusCode || 500).json({ message: error.message });
                }
              });
             
              export default router











