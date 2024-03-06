import { Router } from 'express';
import UserModel from '../../models/user.model.js';
import { createHash, isPasswordValid, tokenGenerator } from "../../utils.js";
import CartManager from '../../dao/CartManager.js'
import mongoose from 'mongoose';
import cartModel from '../../models/cart.model.js';
import CartController from '../../controller/cart.controller.js';
import AuthController from '../../controller/auth.controller.js';
import UserService from '../../services/user.service.js';
import CartDAO from '../../dao/Cart.dao.js';

const router = Router();

router.post('/auth/register', async (req, res) => {

  const {
    body: { first_name, last_name, email, password, role },
  } = req;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  let user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'Already registered user' });
  }
  user = await UserModel.create({
    first_name,
    last_name,
    email,
    password: createHash(password),
    role
  });
  const cartDao = new CartDAO();
  await cartDao.createCart({ user: user._id });
  res.status(201).json({ message: 'Usuario creado con éxito' });
   /*  try {
    req.logger.info('req.body:', req.body);
   const token =  await AuthController.register(req.body)
   req.looger.info('token auth', token);
    res.cookie('access_token', token, { httpOnly: true, signed: true });
    res.status(201)
    .redirect('/')
  } catch (error) {
    res.status(400).json({message: error.message})
  }
  */
});

router.post('/auth/login', async (req, res) => {
try {
 const token = await AuthController.login(req.body)
  res
  .cookie('access_token', token, { maxAge: 1000*60*30, httpOnly: true, signed: true })
  .status(200)
  .redirect('/products')
} catch (error) {
  res.status(400).json({message: error.message})
  
}})

 
router.post('/recovery-password', async (req, res) => {
try {
  console.log('user', req.body);
  const user = await AuthController.recovery(req.body)
  console.log('userUP', user);
  res
  .status(200)
  .redirect('/');
} catch (error) {
  res.status(400).json({message: error.message})
  
}
});
router.post('/auth/restore-password', async (req, res) => {
  try {
    const user = await AuthController.restorePassword(req.body)
    res
    .status(200)
    .redirect('/');
  } catch (error) {
    res.status(400).json({message: error.message})
    
  }
  
})


export default router;