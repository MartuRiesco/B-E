import fs from 'fs'
import { getNewId } from '../utils/utils.js';
class ProductManager{
    constructor(path){
       this.path = path;
      
    }
       async getProduct(){
          return  getJSONFromFile(this.path);
       }
      async addProduct(product){ 
        const { title, description, price, thumbnails, code, category,status } = product
        if (!title || !description || !price ||!thumbnails || !code || !category || !status){
            throw new Error('debe completar todos los campos')
        }
        const products = await this.getProduct();
        const productExists= products.find((product)=>product.code === code)
        if(productExists){
          throw new Error( 'Este producto ya fue agregado. ')
        }
        let id = getNewId()
        const newProduct = { id,  title, description, price, thumbnails, code, status };
        products.push(newProduct);
       
        await this.saveJSONToFile(this.path, products);
         }         
          async  getProductById(id) {
              const productId = await this.getProduct();
                const product =  productId.find((product) => product.id === id);
                if (!product) {
                  throw new Error("Producto no encontrado.");
                }
                return product;
              }
              
         async deleteProduct(id) {
          const products = await this.getProduct();
          const productIndex = products.findIndex((product) => product.id === id);
          if (productIndex !== -1) {
            products.splice(productIndex, 1);
            await this.saveJSONToFile(this.path, products);
            console.log('se ha borrado correctamente');
          } else {
            throw new Error('Producto no encontrado');
          }
        }
              saveJSONToFile = async (path, data) => {
                const content = JSON.stringify(data, null, '\t');
                try {
                  await fs.promises.writeFile(path, content, 'utf-8');
                } catch (error) {
                  throw new Error(`El archivo ${path} no pudo ser escrito.`);
                }
              };  
              async updateProduct(id, productUpdate) {
                const products = await getJSONFromFile(this.path);
                const index = products.findIndex(product => product.id === id);
                if (index !== -1) {
                  const updatedProduct = {
                    ...products[index],
                    ...productUpdate,
                  };
              
                  products[index] = updatedProduct;
                  await this.saveJSONToFile(this.path, products);
                  console.log('Producto Actualizado:', updatedProduct);
                  return updatedProduct;
                } else {
                  console.log('No se ha podido actualizar el producto. El ID proporcionado no existe.');
                  return null;
                }
          
   }}
   
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
export default ProductManager
 /*  async function test() {
    const productManager = new ProductManager('./products.json');
     await productManager.addProduct({
        title: 'Hal',
        description: 'descripcion',
        price: 123,
        thumbnail: 'imagen',
        code: '10',
        stock: 24
    });
 let products = await productManager.getProduct();
    console.log('😎 Acá los productos:', products);
      }
      
      test(); */