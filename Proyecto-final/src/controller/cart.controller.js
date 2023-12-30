import CartManager from '../dao/CartManager.js';
import TicketModel from '../models/ticket.model.js';
import ProductManager from '../dao/ProductManager.js'
import TicketController from './ticket.controller.js';
import CartsService from '../services/cart.service.js';
import { getNewId } from '../utils.js';

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
  
    static async getCartById(pid) {
      const cart = await CartsService.findById(pid);
    if (!cart) {
      throw new Error(`Id del carrito no fue encontrado ${pid} 😨`);
    }
    return cart;
  }
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
   

      static async purchaseCart(req, res) {
        try {
          const { cid } = req.params;
          const cart = await CartController.getCartById(cid, true);
    
          const failedProductIds = [];
          const purchasedProducts = [];
          let totalAmount = 0;
    
          for (const cartProduct of cart.products) {
            const product = await ProductManager.getById(cartProduct.product);
    
            if (product.stock >= cartProduct.quantity) {
              // Suficiente stock, procesar la compra
              product.stock -= cartProduct.quantity;
              await product.save();
    
              purchasedProducts.push({
                product: cartProduct.product,
                quantity: cartProduct.quantity,
              });
    
              totalAmount += product.price * cartProduct.quantity;
            } else {
              // No hay suficiente stock, agregar a la lista de productos fallidos
              failedProductIds.push(cartProduct.product);
            }
          }
    
          // Actualizar el carrito con productos no comprados
          const remainingProducts = cart.products.filter(
            (cartProduct) => !failedProductIds.includes(cartProduct.product.toString())
          );
    
          cart.products = remainingProducts;
          await cart.save();
    
          // Generar el ticket
          const ticket = await TicketController.createTicket({
            code: getNewId(),
            amount: totalAmount,
            purchaser: req.user.email,
          });
    
          res.status(200).json({ ticket, failedProductIds });
        } catch (error) {
          console.error('Error al procesar la compra:', error.message);
          res.status(500).json({ error: 'Error interno del servidor' });
        }
      }
    }