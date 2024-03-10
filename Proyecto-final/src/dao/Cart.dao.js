import CartModel from '../models/cart.model.js';
import { Exception } from '../utils.js';

export default class CartDAO {
  static async getAll() {
    return CartModel.find({});
  }
  static async getOrCreateCart(userId) {
    console.log('UserId:', userId);
    const existingCart = await CartModel.findOne({ user: userId });
    if (existingCart) {
      return existingCart;
    } else {
      const newCart = await CartModel.create({ user: userId, products: [] });
      return newCart;
    }}
    static async getById(cid, populate = false) {
      try {
        const cart = await CartModel.findOne({ _id: cid });
        if (populate) {
          return await cart.populate("products.product");
        }
        return cart;
      } catch (error) {
        throw new Exception(`Cart with id "${cid}" not found`, 404);
      }
    }
  

  createCart(data) {
    return CartModel.create(data);
  }

  static async deleteById(cartId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      throw new Exception('No existe ese Carrito', 404);
    }

    cart.products = [];
    await cart.save();
  }

  static async addProductToCart(cartId, productId) {
    try {
      console.log('cartId y product ID', cartId, productId);
      const cart = await CartModel.findById(cartId);
    console.log('cart dao', cart);
    if (!cart) {
      throw new Exception('No existe ese Carrito', 404);
    }

    const index = cart.products.findIndex((product) => String(product.product) === productId);
    if (index === -1) {
      cart.products.push({ product: productId, quantity: 1 });
    } else {
      cart.products[index].quantity++;
    }

    const cartProd = await cart.save();
    return cartProd
    } catch (error) {
      console.log(error.message);
    }
    
  }

  static async deleteProductFromCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      throw new Exception('No existe ese Carrito', 404);
    }
console.log('product', productId);
    const index = cart.products.findIndex((product) =>{  console.log('pr',product);
      return  product.product.equals(productId)
    });
    console.log('index', index);
    if (index === -1) {
      throw new Exception('No existe ese producto dentro del carrito');
    }

    cart.products.splice(index, 1);
    await cart.save();
  }

  static async updateById(cartId, data) {
    const criteria = { _id: cartId };
    const operation = { $set: data };
    return CartModel.updateOne(criteria, operation);
  }

  static async updateProductById(cartId, productId, data) {
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      throw new Exception('No existe ese Carrito', 404);
    }

    const index = cart.products.findIndex((product) => String(product.product) === productId);
    if (index === -1 || !data.quantity) {
      throw new Exception('Solo se puede modificar la cantidad de productos');
    }

    cart.products[index].quantity = data.quantity;
    await cart.save();
  }
}