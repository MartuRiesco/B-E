import fs from 'fs'
import { getNewId } from '../utils/utils.js';
class CartManager{
    constructor(path){
       this.path = path;
    }
    async getCart(){
        return  getJSONFromFile(this.path);
     }
  
     saveJSONToFile = async (path, data) => {
        const content = JSON.stringify(data, null, '\t');
        try {
          await fs.promises.writeFile(path, content, 'utf-8');
        } catch (error) {
          throw new Error(`El archivo ${path} no pudo ser escrito.`);
        }
      }; 
    async addCart(){
        try {
            const cart = await this.getCart()
            console.log('get cart',  cart.lenght);
            let newCart = {
                id: getNewId(),
                products: []
            }
            cart.push(newCart)
            await this.saveJSONToFile(this.path, cart)
            return newCart;
        }catch(error){
            throw new Error(`Error ${error.message}`)
        }
    }
    async  getCartById(id) {
        const cartId = await this.getCart();
          const cart =  cartId.find(( cart) => cart.id === id);
          if (!cart) {
            throw new Error("Producto no encontrado.");
          }
          return cart;
        }
        async addProductToCart(cartId, product){
        let cart = await this.getCart();
        const cartIndex = cart.findIndex((c) => c.id === cartId);
        if( cartIndex && product !== undefined){
            const newProduct = {
                "product": product.id,
                "quantity": 1
            }
        
        const productExists= cart.products.find((p)=>p.id===p.product);
        if(productExists) {
          productExists.quantity++
      } else {
          cart.products.push(newProduct)
      }
      await this.saveJSONToFile(this.path, cart)
  } else {
      throw new Error('no existe un carrito con ese id')
  }}

             }
   
   const existFile = async (path) => {
    try {
      await fs.promises.access(path);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getJSONFromFile = async (path) => {
    if (!await existFile(path)) {
        console.log(path);
      return [];
    }
    let content;

    try {
      content = await fs.promises.readFile(path, 'utf-8');
    } catch (error) {
      throw new Error(`El archivo ${path} no pudo ser leido.`);
    }
  
    try {
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`El archivo ${path} no tiene un formato JSON válido.`);
    };
}
export default  CartManager