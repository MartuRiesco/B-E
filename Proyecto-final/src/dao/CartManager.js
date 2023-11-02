import cartModel from '../models/cart.model.js'
import { Exception } from "../utils.js";
export default class CartManager{
    static  get(query={}){
        const criteria={}
        return cartModel.find(criteria)
        }
        static  async create( data){
    const cart = await cartModel.create(data);
    console.log('Carrito creado con exito');
    return cart
        }
        static async getById(cid){
    const cart = await cartModel.findById(cid)
    console.log('cart,',cart);
    if (!cart){
        throw new Exception('No existe ese Carrito', 404)
    }
    return cart
        }
        static async deleteById(cid){
            const cart = await cartModel.findById(cid)
            if (!cart){
                throw new Exception('No existe ese Carrito', 404)
            }
            const criteria ={_id: cid}
            await cartModel.deleteOne(criteria)
            console.log('Carrito eliminado correctamente');
    
        }
        static async addProductToCart(cid, pid){
            const cart = await cartModel.findById(cid)
            console.log('cart,',cart);
            if (!cart){
                throw new Exception('No existe ese Carrito', 404)
            }
            const index = cart.products.findIndex((product)=> String(product._id)===pid)
            if(index===-1){
                cart.products.push({product:pid, quantity:1})
            }else{
                cart.products[index].quantity++;
            }
            await cartModel.updateOne({_id:cid}, cart)
        }
}