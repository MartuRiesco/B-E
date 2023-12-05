import {Server} from 'socket.io'
import MessageManager from './dao/MessageManager.js';
import ProductManager from './dao/ProductManager.js';
import CartManager from './dao/CartManager.js';

let io;
let messages= []

export const inits = (httpServer) => {
    io = new Server(httpServer)
    io.on('connection', async (socketClient)=>{
        console.log(`Se ha conectado un nuevo cliente 🎉 (${socketClient.id})`);
       /*  const cart = await CartManager.create();
        socketClient.cartId = cart._id; */
        socketClient.emit('notification', { messages, /* cartId: cart._id */ });
        socketClient.on ('addProductToCart', async (pid)=>{
            const cid = socketClient.cartId;
            await CartManager.addProductToCart(cid, pid);
            socketClient.emit('addProductToCart');

            console.log('Se añadió al carrito el producto', pid);
        })

        socketClient.on("addProduct", async (product) => {
            const {title, description, price,code, category } = product
            await ProductManager.create({title, description, price,code, category });
          
           })
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