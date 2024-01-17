import { stringify } from 'uuid';
import cartModel from '../models/cart.model.js'
import { Exception } from "../utils.js";

import CartDAO from '../dao/Cart.dao.js';

export default class CartManager {
  static async getAll() {
    return CartDAO.getAll();
  }
  static async getOrCreateCart(uid) {
    return CartDAO.getOrCreateCart(uid);
  }
  static async getById(cartId) {
    return CartDAO.getById(cartId);
  }    
  static async create(data) {
   return CartDAO.create(data);
  }
    
  static async deleteById(cid) {
    return CartDAO.deleteById(cid);
  }

  static async addProductToCart(cid, pid) {
    return CartDAO.addProductToCart(cid, pid);
  }

  static async deleteProductFromCart(cid, pid) {
    return CartDAO.deleteProductFromCart(cid, pid);
  }

  static async updateById(cid, data) {
    return CartDAO.updateById(cid, data);
  }

  static async updateProductById(cid, pid, data) {
    return CartDAO.updateProductById(cid, pid, data);
  }
}