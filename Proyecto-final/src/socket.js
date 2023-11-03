import {Server} from 'socket.io'
import MessageManager from './dao/MessageManager.js';
import ProductManager from './dao/MessageManager.js';

let io;
let messages= []
export const inits = (httpServer) => {
    io = new Server(httpServer)
    io.on('connection', async (socketClient)=>{
        let productsBefore = await ProductManager.get();

        let messagesBefore = await MessageManager.get();
        console.log(`Se ha conectado un nuevo cliente 🎉 (${socketClient.id})`);

        socketClient.emit('notification', { messages });
        socketClient.on("addProduct", async (product) => {
            await ProductManager.create(product);
            let productsAfter = await ProductManager.get();
            io.sockets.emit("listProducts", productsAfter);})

        socketClient.broadcast.emit('new-client');
        socketClient.on('new-message',async (data)=>{
            const {userName, message} = data
            messages.push({userName, message})
            await MessageManager.create(data)
            io.emit('notification', {messages})
        })
       /*  socketClient.on("user-message", async (data) => {
           
            let mess = await MessageManager.get();
            console.log('mensajito',mess);

            io.sockets.emit("user-message", messages);}) */

    })
    console.log('ServerSocket funciona');
}
export const emitFromApi = (event, data) => io.emit(event, data);