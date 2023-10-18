import handlebars from 'express-handlebars';
import path from 'path';
import {ProductRouter, products} from "../src/routes/products.router.js"
import CartRouter from "../src/routes/carts.router.js";
import { __dirname, socketServer, app } from './utils.js';



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
app.get('/realtimeproducts', (req,res) => {
  const empty = products.length === 0
  res.render('realtimeproducts', {empty})
})
socketServer.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado 🎉 (${socket.id}).`);
    socket.emit('products', products);
    socket.on('products', (products) => {
      socketServer.emit('products', products);
    });
  })
export default app