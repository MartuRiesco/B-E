import CartManager from '../dao/CartManager.js';

export default class CartController {
    static async getAllCarts(req, res) {
      try {
        const carts = await CartManager.getAll();
       console.log(`Carritos disponibles ${carts}`);
      } catch (error) {
        console.log(`Carritos no disponibles`);
      }
    }
  
    static async getOrCreateCart(req, res) {
      try {
        const { userId } = req.params;
        const cart = await CartManager.getOrCreateCart(userId);
        console.log(`Carrito creado/autenticado correctamente:  ${cart}`);
      } catch (error) {
        console.log(`Ocurrio un error al traer/crear el carrito deseado`);
      }
    }
  
    static async createCart(req, res) {
      try {
        const { body } = req;
        const cart = await CartManager.create(body);
        console.log(`Carrito creado correctamente: ${cart}`);
      } catch (error) {
        console.log(`No se pudo crear el carrito deseado ${cart}`);
      }
    }
  
    static async getCartById(req, res) {
      const { cid } = req.params;
      try {
        console.log('cid', cid);
        const cart = await CartManager.getById(cid);
        // Asegurarse de que 'cart' esté definido antes de intentar acceder a sus propiedades
        if (!cart) {
          console.log(`Carrito ID no encontrado`);
          return res.status(404).json({ error: 'Carrito no encontrado' });
        }
    
        console.log(`Carrito ID: ${cart}`);
    
        // Verificar si 'cart.products' está definido antes de intentar acceder a él
        if (cart.products) {
          console.log('Productos en el carrito:', cart.products);
        } else {
          console.log('El carrito no tiene productos.');
        }
    
        res.status(200).json(cart);
      } catch (error) {
        console.log(`Error al obtener el carrito por ID: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
      }    }
    static async deleteCartById(req, res) {
        try {
          const { cid } = req.params;
          await CartManager.deleteById(cid);
          console.log(`Carrito borrado por id correctamente`);
        } catch (error) {
          console.log(`No se pudo borrar el carrito`);
        }
      }
    
      static async addProductToCart(req, res) {
        try {
          const { cid, pid } = req.params;
          await CartManager.addProductToCart(cid, pid);
          console.log('Producto agregado correctamente');
        } catch (error) {
          console.log(`No se pudo agregar el producto al carrito`);
        }
      }
    
      static async deleteProductFromCart(req, res) {
        try {
          const { cid, pid } = req.params;
          await CartManager.deleteProductFromCart(cid, pid);
          console.log('Producto eliminado correctamente');
        } catch (error) {
          console.log('El producto no se pudo eliminar');
        }
      }
    
      static async updateCartById(req, res) {
        try {
          const { cid } = req.params;
          const { body } = req;
          await CartManager.updateById(cid, body);
          console.log('Carrito actualizado correctamente');
        } catch (error) {
          console.log('Carrito  no actualizado ');
        }
      }
    
      static async updateProductInCartById(req, res) {
        try {
          const { cid, pid } = req.params;
          const { body } = req;
          await CartManager.updateProductById(cid, pid, body);
          console.log('Producto actualizado correctamente');
        } catch (error) {
          console.log('Producto  no actualizado');
        }
      }
    }
  