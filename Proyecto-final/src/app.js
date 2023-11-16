import handlebars from 'express-handlebars';
import path from 'path';
import {ProductRouter, products} from "../src/routes/products.router.js"
import { __dirname, /* socketServer, */ app } from './utils.js';
import productApiRouter from './routes/api/product.router.js'
import productViewsRouter from './routes/views/products.router.js'
import cartApiRouter from './routes/api/cart.router.js'
import cartViewsRouter from './routes/views/carts.router.js'
import MessageViewsRouter from './routes/views/chats.router.js'
import chatRouter from './routes/api/chat.router.js'
import indexRouter from './routes/api/index.router.js'
import sessionRouter from './routes/api/sessions.router.js'

import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import { URI } from './db/mongodb.js';

const SESSION_SECRET = 'qBvPkU2X;J1,51Z!~2p[JW.DT|g:4l@';

 app.engine('handlebars', handlebars.engine());
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'handlebars');
 /* app.use('/api',  CartRouter ) */
 app.use((error, req, res, next) => {
  const message = `😨 Ah ocurrido un error desconocido: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
});
app.use(expressSession({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: URI,
    mongoOptions: {},
    ttl: 60,
  })
}))
app.use('/', indexRouter);
app.use('/api', sessionRouter);

app.use('/', cartApiRouter)
app.use('/',  productApiRouter,)
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