import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import http from 'http'
import { fileURLToPath } from 'url';
import express from "express"
import { Server } from "socket.io";
export const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

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