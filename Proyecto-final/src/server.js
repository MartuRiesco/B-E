import http from 'http';
import app from './app.js'
import {init} from './db/mongodb.js'
import { inits } from './socket.js';
import config from './config.js';

await init()
const server = http.createServer(app);
const PORT = config.port;

 const httpServer= server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`);
});
inits(httpServer)
