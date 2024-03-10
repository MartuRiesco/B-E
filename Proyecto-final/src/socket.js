import {Server} from 'socket.io'
import MessageManager from './dao/MessageManager.js';
import ProductManager from './dao/ProductManager.js';
import CartManager from './dao/CartManager.js';
import CartController from './controller/cart.controller.js';
import UserDao from './dao/User.dao.js';
import userModel from './models/user.model.js';
import ProductsController from './controller/product.controller.js';

let io;
let messages= []

export const inits = (httpServer) => {
    io = new Server(httpServer)
    io.on('connection', async (socketClient)=>{
        console.log(`Se ha conectado un nuevo cliente 🎉 (${socketClient.id})`);
       /*  const userId = socketClient.handshake.query.userId;
        const cart = await CartManager.getOrCreateCart(userId);
 

  socketClient.cartId = cart._id; */

  /* socketClient.emit('notification', { messages, cartId: cart._id }); */

       /* const cart = await CartManager.getOrCreateCart(); 
       
        socketClient.cartId = cart._id;
        socketClient.emit('notification', { messages, cartId: cart._id }); */
        socketClient.on ('addProductToCart', async ( cartId, pid)=>{
            const cid = cartId;
            await CartManager.addProductToCart(cid, pid);
            socketClient.emit('addProductToCart');

           
        })

        socketClient.on("addProduct", async (data) => {
            try {
              // Obtener los datos del producto y del usuario del objeto recibido
              const { product, user } = data;
              await ProductsController.create(product, user);
          
            } catch (error) {
              console.error('Error al agregar el producto:', error);
              // Manejar el error según sea necesario
            }
          });
           let products = await ProductManager.get()
           socketClient.emit('products', products);
           socketClient.on('products', (products) => {
            io.emit('products', products);
           });
        socketClient.broadcast.emit('new-client');
        socketClient.on('new-message',async (data)=>{
            const {userName, message} = data
            messages.push({userName, message})
            await MessageManager.create(data)
            io.emit('notification', {messages})
        })
      

    })
    console.log('ServerSocket funciona');
}
export const emitFromApi = (event, data) => io.emit(event, data);