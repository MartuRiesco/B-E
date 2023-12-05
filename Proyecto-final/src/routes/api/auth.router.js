import { Router } from 'express';
import UserModel from '../../models/user.model.js';
import { createHash, isPasswordValid, tokenGenerator } from "../../utils.js";


const router = Router();

router.post('/auth/register', async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    age,
  } = req.body;
  if (
    !first_name ||
    !last_name ||
    !email ||
    !age||
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
    email,
    age,
    password: createHash(password),
  });

  res.status(201).json({ message: 'Usuario creado correctamente 👽' })
  .redirect('/login')
});

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Correo o contraseña invaldos 😨' });
  }
  const isValidPassword = isPasswordValid(password, user);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Correo o contraseña invaldos 😨' });
  }
  const token = tokenGenerator(user);
  res
    .cookie('access_token', token, { maxAge: 1000*60*30, httpOnly: true, signed: true })
    .status(200)
    .json({ message: 'Inicio de sessión exitoso 👽'  });
});

export default router;