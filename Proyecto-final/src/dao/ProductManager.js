import productModel from "../models/product.model.js";
import { Exception } from "../utils.js";
export default class ProductManager{
    static  get(query={}){
    const criteria={}
    return productModel.find(criteria)
    }
    static  async create( data){
const product = await productModel.create(data);
console.log('Producto creado con exito');
return product
    }
    static async getById(pid){
const product = await productModel.findById(pid)
if (!product){
    throw new Exception('No existe ese producto', 404)
}
return product
    }
    static async deleteById(pid){
        const product = await productModel.findById(pid)
        if (!product){
            throw new Exception('No existe ese producto', 404)
        }
        const criteria ={_id: pid}
        await productModel.deleteOne(criteria)
        console.log('producto eliminado correctamente');

    }
    static async updateById(pid, data) {
        const product = await productModel.findById(pid);
        if (!product) {
          throw new Exception('No existe el producto 😨', 404);
        }
        const criteria = { _id: pid };
        const operation = { $set: data };
        await productModel.updateOne(criteria, operation);
        console.log('Producto actualizado correctamente 😁');
      }}