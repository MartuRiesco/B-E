import fs from 'fs'
class ProductManager{
    constructor(path){
       this.path = path;
      
    }
       async getProduct(){
          return  getJSONFromFile(this.path);
       }
      async addProduct(product){ 
        const { title, description, price, thumbnail, code, stock } = product
        if (!title || !description || !price ||!thumbnail || !code || !stock){
            throw new Error('debe completar todos los campos')
        }
        const products = await this.getProduct();
        const productExists= products.find((product)=>product.code === code)
        if(productExists){
          throw new Error( 'Este producto ya fue agregado. ')
        }
        let id = products.length+1
        const newProduct = { id,  title, description, price, thumbnail, code, stock  };
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
              saveJSONToFile = async (path, data) => {
                const content = JSON.stringify(data, null, '\t');
                try {
                  await fs.promises.writeFile(path, content, 'utf-8');
                } catch (error) {
                  throw new Error(`El archivo ${path} no pudo ser escrito.`);
                }
              };   
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