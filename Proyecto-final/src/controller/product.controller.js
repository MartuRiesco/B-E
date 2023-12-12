import ProductsService from '../services/product.services.js';

export default class ProductsController {
  static async create(data) {
    console.log('Creando el nuevo producto 👽');
    const newProduct = await ProductsService.create(data);
    console.log('Producto creado corretamente 👽');
    return newProduct;
  }

  static async get(query = {}) {
    const products = await ProductsService.findAll(query); 
    return products;
  }

  static async getById(pid) {
    const product = await ProductsService.findById(pid);
    if (!product) {
      throw new Error(`Id de producto no fue encontrado ${pid} 😨`);
    }
    return product;
  }

  static async updateById(pid, data) {
    await ProductsController.getById(pid);
    console.log('Actualizando el producto 👽');
    await ProductsService.updateById(pid, data);
    console.log('Actualizado el producto corretamente 👽');
  }

  static async deleteById(pid) {
    await ProductsController.getById(pid);
    console.log('Elimiando el producto 👽');
    await ProductsService.deleteById(pid);
    console.log('Elimiado el producto corretamente 👽');
  }
}