import handlebars from 'express-handlebars';
import path from 'path';
import {ProductRouter, products} from "../src/routes/products.router.js"
import CartRouter from "../src/routes/carts.router.js";
import { __dirname, /* socketServer, */ app } from './utils.js';
import productApiRouter from './routes/api/product.router.js'
import productViewsRouter from './routes/views/products.router.js'
import cartApiRouter from './routes/api/cart.router.js'
import cartViewsRouter from './routes/views/carts.router.js'
import MessageViewsRouter from './routes/views/chats.router.js'
import chatRouter from './routes/api/chat.router.js'


 app.engine('handlebars', handlebars.engine());
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'handlebars');
 /* app.use('/api',  CartRouter ) */
 app.use((error, req, res, next) => {
  const message = `😨 Ah ocurrido un error desconocido: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
});
app.use('/api', productApiRouter, cartApiRouter)
app.use('/', productViewsRouter, cartViewsRouter, MessageViewsRouter)
app.use('/', chatRouter)
app.get('/realtimeproducts', (req,res) => {
  const empty = products.length === 0
  res.render('realtimeproducts', {empty})
})
/* socketServer.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado 🎉 (${socket.id}).`);
    socket.emit('products', products);
    socket.on('products', (products) => {
      socketServer.emit('products', products);
    });
  }) */
export default app