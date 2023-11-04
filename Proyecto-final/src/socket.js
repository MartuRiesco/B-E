import {Server} from 'socket.io'
import MessageManager from './dao/MessageManager.js';
import ProductManager from './dao/ProductManager.js';

let io;
let messages= []

export const inits = (httpServer) => {
    io = new Server(httpServer)
    io.on('connection', async (socketClient)=>{
        console.log(`Se ha conectado un nuevo cliente 🎉 (${socketClient.id})`);

        socketClient.emit('notification', { messages });

        socketClient.on("addProduct", async (product) => {
            const {title, description, price,code } = product
            await ProductManager.create({title, description, price,code });
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