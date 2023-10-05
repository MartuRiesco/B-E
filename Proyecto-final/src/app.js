import express from "express"
import ProductRouter from "../src/routes/products.router.js"



 const app= express();
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));
app.use('/api', ProductRouter )
  app.listen(8080, ()=>{
    console.log('servidor escuchando en puerto 8080');
  })