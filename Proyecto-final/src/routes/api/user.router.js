import { Router } from 'express';
import passport from 'passport';
import UserModel from '../../models/user.model.js'
import {  authenticationMiddleware, authorizationMiddleware, createHash } from '../../utils.js';
import AuthController from '../../controller/auth.controller.js';

const router = Router();

router.get('/users',
  passport.authenticate('jwt', { session: false }),
  
  async (req, res) => {
    const users = await UserModel.find({});
    res.status(200).json(users);
  });
  router.put('/users/premium/:uid', authenticationMiddleware('jwt'), authorizationMiddleware(['premium', 'user']), async (req, res)=>{
    try{
      const { params: { uid } } = req;
    const userToUpdate = await AuthController.changeUserRole(uid)
  res.status(200).json({ message: `Rol de usuario actualizado con éxito, user: ${userToUpdate} `});
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Error al actualizar el rol del usuario' });
}
  
  })
  




router.post('/users',
  passport.authenticate('jwt', { session: false }),
  /* authPolicies(['admin']), */
  async (req, res) => {
    const {
      first_name,
      last_name,
      dni,
      email,
      password,
    } = req.body;
    if (
      !first_name ||
      !last_name ||
      !dni ||
      !email ||
      !password
    ) {
      return res.status(400).json({ message: 'Todos los campos son requeridos 😨' });
    }
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Correo ya registrado 😨. Intenta recuperar tu contraseña 😁.' });
    }
    user = await UserModel.create({
      first_name,
      last_name,
      dni,
      email,
      password: createHash(password),
    });
  
    res.status(201).json({ message: 'Usuario creado correctamente 👽' });
  });

router.get('/users/:uid',
  passport.authenticate('jwt', { session: false }),
  /* authPolicies(['admin']), */
  async (req, res) => {
    const { uid } = req.params;
    const user = await UserModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: `No se encontró el usuario ${uid} 👽` });
    }
    res.status(200).json(user);
  });

router.put('/users/:uid',
  passport.authenticate('jwt', { session: false }),
/*   authPolicies(['admin']), */
  async (req, res) => {
    const { params: { uid }, body } = req;
    const { first_name, last_name, dni, email } = body;
    const data = { first_name, last_name, dni, email };
    const user = await UserModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: `No se encontró el usuario ${uid} 👽` });
    }
    await UserModel.updateOne({ _id: uid }, { $set: data });
    res.status(200).json({ message: 'Usuario actualizado con éxito 👽' });
  });

router.delete('/users/:uid',
  passport.authenticate('jwt', { session: false }),
 /*  authPolicies(['admin']), */
  async (req, res) => {
    const { uid } = req.params;
    const user = await UserModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: `No se encontró el usuario ${uid} 👽` });
    }
    await UserModel.deleteOne({ _id: uid });
    res.status(200).json({ message: 'Usuario eliminado con éxito 👽' });
  });

export default router;