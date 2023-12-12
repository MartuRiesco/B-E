import CartModel from '../models/cart.model.js';

export default class CartDAO {
  static async getAll() {
    return CartModel.find({});
  }
  static async getOrCreateCart(userId) {
    const existingCart = await CartModel.findOne({ user: userId });
    if (existingCart) {
      return existingCart;
    } else {
      const newCart = await CartModel.create({ user: userId, products: [] });
      return newCart;
    }}
    static async getById(cartId) {
      try {
        const cart = await CartModel.findById(cartId).populate('products.product');
        if (!cart) {
          throw new Error(`Carrito con ID ${cartId} no encontrado`);
        }
        return cart;
      } catch (error) {
        console.error(error.message);
        throw error;
      }}

  static async create(data) {
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
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      throw new Exception('No existe ese Carrito', 404);
    }

    const index = cart.products.findIndex((product) => String(product.product) === productId);
    if (index === -1) {
      cart.products.push({ product: productId, quantity: 1 });
    } else {
      cart.products[index].quantity++;
    }

    await cart.save();
  }

  static async deleteProductFromCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      throw new Exception('No existe ese Carrito', 404);
    }

    const index = cart.products.findIndex((product) => String(product._id) === productId);
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