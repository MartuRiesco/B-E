import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import http from 'http'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import passport from 'passport';
import express from "express"
import { Server } from "socket.io";
import { log } from 'console';
import config from './config.js';
export const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
/* export const isPasswordValid = (password, user) => bcrypt.compare(password, user.password) */
export const isPasswordValid =  (password, user) => {
  try {
    console.log('Input Password:', password);
    console.log('Stored Password:', user.password);
    return  bcrypt.compareSync(password, user.password);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};
export const JWT_SECRET =  config.jwtSecret/* 'qBvPkU2X;J1,51Z!~2p[JW.DT|g:4l@' */;

export const tokenGenerator = (user, cartId) => {
  const {
    _id: id,
    first_name,
    last_name,
    email,
    role,
  } = user;
  const payload = {
    id,
    first_name,
    last_name,
    email,
    role: user.role,
    cartId
  };
  const token = JWT.sign(payload, JWT_SECRET, { expiresIn: '30m' });
/*   console.log('token', token); */
 return token
 } 


export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, JWT_SECRET, (error, payload) => {
      if (error) { 
        return reject(error)
      }
      resolve(payload);
    });
  });
}
export const authenticationMiddleware = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, function(error, payload, info) {
    if (error) {
      return next(error);
    }
    /* console.log('payload', payload); */
    if (!payload) {
      return res.status(401).json({ message: info.message ? info.message : info.toString() });
    }
    req.user = payload;
    next();
  })(req, res, next);
};
export const authorizationMiddleware = (requiredRole) => (req, res, next) => {
  console.log('user rol', req.user);
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { role: userRole } = req.user;
  if (userRole !== requiredRole) {
    return res.status(403).json({ message: 'No permissions' });
  }

  next();
};
/* export const authorizationMiddleware = (requiredRole) => (req, res, next) => {
  console.log('user rol', req.user);
  if (!req.user) {
    console.log('No hay usuario autenticado');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { role: userRole } = req.user;
  console.log('Rol del usuario:', userRole);
  console.log('Rol requerido:', requiredRole);

  if (userRole.toLowerCase() !== requiredRole.toLowerCase()) {
    console.log('No tiene permisos');
    return res.status(403).json({ message: 'No permissions' });
  }

  next();
}; */


/* const server = http.createServer(app);
  const socketServer = new Server(server) */ 
  const getNewId = () => uuidv4();

  export class Exception extends Error{
    constructor(message, status){
      super(message);
      this.statusCode =status
    }
  }
export {getNewId, /* socketServer, */ app}