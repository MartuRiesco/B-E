const http = require ('http')

const server =http.createServer((request, response) =>{
 response.end('Hola mundo desde server8080');
})

server.listen(8080, ()=>{
    console.log('');
})