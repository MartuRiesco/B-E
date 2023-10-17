import express from "express"
import handlebars from 'express-handlebars';
import path from 'path';
import {Server} from 'socket.io'
import {ProductRouter, products} from "../src/routes/products.router.js"
import CartRouter from "../src/routes/carts.router.js";
import { __dirname } from './utils.js';


 const app= express();
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));
 app.use(express.static(path.join(__dirname, '../public')));
 app.engine('handlebars', handlebars.engine());
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'handlebars');
 app.use('/api', ProductRouter, CartRouter )
 app.use((error, req, res, next) => {
  const message = `😨 Ah ocurrido un error desconocido: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
});
app.get('/', (req,res) => {
  const empty = products.length === 0
  res.render('home', {products, empty})
})
const serverHttp = app.listen(8080, ()=>{
  console.log('servidor escuchando en puerto 8080');
})
  const serverSocket= new Server(serverHttp)
  serverSocket.on('connection', (clienteSocket) => {
    console.log(`Nuevo cliente conectado 🎉 (${clienteSocket.id}).`);
  })
export default app