import handlebars from 'express-handlebars';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { products} from "../src/routes/products.router.js"
import { __dirname, app } from './utils.js';
import productApiRouter from './routes/api/product.router.js'
import productViewsRouter from './routes/views/products.router.js'
import cartApiRouter from './routes/api/cart.router.js'
import cartViewsRouter from './routes/views/carts.router.js'
import MessageViewsRouter from './routes/views/chats.router.js'
import chatRouter from './routes/api/chat.router.js'
import indexRouter from './routes/api/index.router.js'
import indexrut from './routes/views/index.js'
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRouter from './routes/api/auth.router.js';
import userRouter from './routes/api/user.router.js'
import{ init as initPassportConfig }from './config/passport.config.js'
import MongoStore from 'connect-mongo';
import { URI } from './db/mongodb.js';
import config from './config.js';
import expressCompression from 'express-compression'
import { addLogger } from './config/logger.js';

const SESSION_SECRET =  config.sessionSecret;


app.use(addLogger)
 app.engine('handlebars', handlebars.engine());
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'handlebars');
 app.use(expressCompression())
 app.use((error, req, res, next) => {
  const message = `😨 Ah ocurrido un error desconocido: ${error.message}`;
  res.status(500).json({ status: 'error', message });
});
const COOKIE_SECRET = config.cookeSecret;

app.use(cookieParser(COOKIE_SECRET));
initPassportConfig()
app.use(passport.initialize());

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Tienda DEPMAR API',
      description: 'Esta es la documentación de la API de DEPMAR. Una aplicación para adquirir ropa deportiva 😍.',
    },
  },
  apis: [path.join(__dirname, '..', 'src\\', 'docs', '**', '*.yaml')],
};

const specs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use('/', indexRouter, indexrut );
app.use('/', authRouter)
app.use('/', cartApiRouter)
app.use('/',  productApiRouter,)
app.use('/', productViewsRouter, cartViewsRouter, MessageViewsRouter, userRouter)
app.use('/', chatRouter)
app.get('/realtimeproducts', (req,res) => {
  const empty = products.length === 0
  res.render('realtimeproducts', {empty})
})
export default app