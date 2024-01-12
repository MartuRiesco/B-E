import ProductsService from '../services/product.services.js';
import  {faker} from '@faker-js/faker';

export default class ProductsController {
  static async create(data) {
    console.log('Creando el nuevo producto 👽');
    const newProduct = await ProductsService.create(data);
    console.log('Producto creado corretamente 👽');
    return newProduct;
  }

  static async createFakeProducts(){
    const mockProducts = [];
    for (let i = 1; i <= 100; i++) {
      mockProducts.push({
        id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    code: faker.string.alphanumeric({ length: 10 }),
    price: faker.commerce.price(),
    category:faker.commerce.department(),
    stock: faker.number.int({ min: 10000, max: 99999 }),
    thumbnails: faker.image.url(),
      });
    }
    return { docs: mockProducts };
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