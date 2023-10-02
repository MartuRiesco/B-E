const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
const products = require ('./products.json')
app.get('/products', (req, res) => {
   /*  res.json(products); */
    const { limit } = req.query;
  
    if (!limit) {
      return res.json(products);
    } else {
      const numberLimit = parseInt(limit);
  
      if (isNaN(numberLimit) || numberLimit <= 0) {
        return res.status(400).json({ error: 'Invalid limit value' });
      }else{
      const limitedProducts = products.slice(0, numberLimit);
      return res.json(limitedProducts);}
  
    }
  });
  app.get('/products/:productId', (req, res) => {
    const { productId } = req.params;
    const prod = products.find((product) => product.id === parseInt(productId))
    if(!prod){
      return res.status(400).json({ error: 'No existe un producto con ese id' });
    }else{
    const product = products.find((user) => user.id === parseInt(productId));
    res.json(product);}
  });
  app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080.');
  });