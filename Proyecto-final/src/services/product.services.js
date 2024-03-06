import {ProductDao} from '../dao/factory.js';

export default class ProductsService {

  static findAll(filter = {}) {
    return ProductDao.get(filter);
  }

  static async create(payload, user) {
    console.log('Creando un nuevo producto 👽');
    const isPremiumUser = user.role  === 'premium';
    console.log('e,m',user.email);
    console.log('is', isPremiumUser);
    const owner = isPremiumUser ? user.email : 'admin';
    const productData = { ...payload, owner };
    const product = await ProductDao.create(productData);
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