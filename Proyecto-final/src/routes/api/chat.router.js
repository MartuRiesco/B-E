import { Router } from "express";
import MessageManager from "../../dao/MessageManager.js";
import {authorizationMiddleware, authenticationMiddleware} from '../../utils.js'

const router = Router()

router.get('/chat',authenticationMiddleware('jwt'), async (req, res) => {
    const { query = {} } = req;
    req.logger.info('req.user:', req.user);
    const { first_name, last_name, role } = req.user;
    const message = await MessageManager.get(query);
    res.render('chat', buildResponse({ first_name, last_name, role, message: message.map(m=> m.toJSON()) }));
  });
  
  router.post('/chat', authorizationMiddleware('user'), async (req, res) => {
    const { body } = req;
    const message = await MessageManager.create(body);
    res.status(201).json(message);
  });
  
    const buildResponse = (data) => {
        return {
          status: 'success',
          userName: data.first_name,
          userLastName: data.last_name,
          userRol:data.role,
          prevLink: `http://localhost:8080/products`
        }}
   /*  router.post('/chat', authorizationMiddleware('user'), async(req, res)=>{
        const {body}= req
        const message = await MessageManager.create(body)
        res.status(201).json(message)
        }) */
export default router