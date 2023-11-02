import {Server} from 'socket.io'

let io;
let messages= []
export const inits = (httpServer) => {
    io = new Server(httpServer)
    io.on('connection', (socketClient)=>{
        console.log(`Se ha conectado un nuevo cliente 🎉 (${socketClient.id})`);

        socketClient.emit('notification', { messages });

        socketClient.broadcast.emit('new-client');
        socketClient.on('new-message',(data)=>{
            const {userName, text} =data
            messages.push({userName, text})
            io.emit('notification', {messages})
        })
    })
    console.log('ServerSocket funciona');
}
export const emitFromApi = (event, data) => io.emit(event, data);