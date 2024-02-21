import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import passport from 'passport';
import express from "express"
import { Server } from "socket.io";
import multer from 'multer';
import config from './config.js';
export const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));
export const createHash = (password) => {
  console.log('Password in createHash:', password);
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
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
    if (!payload) {
      return res.status(401).json({ message: info.message ? info.message : info.toString() });
    }
    req.user = payload;
    next();
  })(req, res, next);
};
export const authorizationMiddleware = (requiredRoles) => (req, res, next) => {
  req.logger.info('user rol', req.user);
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const userRole = req.user.role
  const userEmail = req.user.email
  const owner= req.user.owner
  if (!requiredRoles.includes(userRole)) {
    return res.status(403).json({ message: 'No permissions' });
  }
  
  next();
};
  const getNewId = () => uuidv4();

  export class Exception extends Error{
    constructor(message, status){
      super(message);
      this.statusCode =status
    }
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let folderPath = null;
     const {body:{documentType}} = req
      console.log('file.fieldname',file);
  
      switch (documentType) {
        case 'profileImg':
          folderPath = path.join(__dirname, './imgs/profiles');
          break;
        case 'productsImg':
          folderPath = path.join(__dirname, './imgs/products');
          break;
        case 'images':
          folderPath = path.join(__dirname, '../public/images');
          break;
        default:
          folderPath = path.join(__dirname, '../imgs/documents');
          
      }
      fs.mkdirSync(folderPath, { recursive: true });
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      console.log('filename', file);
      const { user: { id } } = req;
      cb(null, `${id}-${file.originalname}`);
    },
  });
  export const uploader = multer({storage});
export {getNewId, /* socketServer, */ app}