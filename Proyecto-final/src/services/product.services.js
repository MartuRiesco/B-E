import {ProductDao} from '../dao/factory.js';

export default class ProductsService {

  static findAll(filter = {}) {
    return ProductDao.get(filter);
  }

  static async create(payload) {
    console.log('Creando un nuevo producto 👽');
    const product = await ProductDao.create(payload);
    console.log(`producto creado correctamente (${product._id}) 👽`);
    return product;
  }

  static findById(pid) {
    return ProductDao.getById(pid);
  }

  static updateById(pid, payload) {
    return ProductDao.updateById(pid, payload);
  }

  static deleteById(pid) {
    return ProductDao.deleteById(pid);
  }
}