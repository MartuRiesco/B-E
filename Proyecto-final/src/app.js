import handlebars from 'express-handlebars';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import {ProductRouter, products} from "../src/routes/products.router.js"
import { __dirname, /* socketServer, */ app } from './utils.js';
import productApiRouter from './routes/api/product.router.js'
import productViewsRouter from './routes/views/products.router.js'
import cartApiRouter from './routes/api/cart.router.js'
import cartViewsRouter from './routes/views/carts.router.js'
import MessageViewsRouter from './routes/views/chats.router.js'
import chatRouter from './routes/api/chat.router.js'
import indexRouter from './routes/api/index.router.js'
/* import sessionRouter from './routes/api/sessions.router.js' */
import authRouter from './routes/api/auth.router.js';
import{ init as initPassportConfig }from './config/passport.config.js'
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import { URI } from './db/mongodb.js';
import config from './config.js';

const SESSION_SECRET =  config.sessionSecret/* 'qBvPkU2X;J1,51Z!~2p[JW.DT|g:4l@' */;

 app.engine('handlebars', handlebars.engine());
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'handlebars');
 app.use((error, req, res, next) => {
  const message = `😨 Ah ocurrido un error desconocido: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
});
const COOKIE_SECRET = config.cookeSecret /* 'qBvPkU2X;J1,51Z!~2p[JW.DT|g:4l@' */;

app.use(cookieParser(COOKIE_SECRET));
/* app.use(expressSession({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: URI,
    mongoOptions: {},
    ttl: 60,
  })
})) */
initPassportConfig()
app.use(passport.initialize());
/* app.use(passport.session()); */

app.use('/', indexRouter );
/* app.use('/api', sessionRouter); */
app.use('/', authRouter)
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