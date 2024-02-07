import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import config from "../src/config.js";
import app from "../src/app.js"; // Importa tu aplicación Express

const request = supertest(app); 
describe('Test de integracion - Products', () => {
    const user = {
        "email": "admin@gmail.com",
        "password": "1234"
    };
    
    let cookie = {};

    before(async () => {
        const URL = config.mongodbUri;
        await mongoose.connect(URL);
        console.log('Conectado a la db correctamente');
        await request.post('/auth/login').send(user)
        .then((result) => {
            const cookieResult = result.header["set-cookie"][0];
            cookie = cookieResult;
        });
    });

    describe("Test del router de productos", () => {
        let productId; // Para almacenar el ID del producto creado para su posterior eliminación

        it.only("El método GET de la ruta '/products' debe retornar la lista de todos los productos", async () => {
            try {
                const response = await request.get("/products").set('Cookie', cookie); 
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an("array");
            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
                // Puedes agregar más detalles al mensaje de error si lo deseas
                throw new Error("La solicitud de obtener productos ha excedido el tiempo de espera.");
            }
        });
    

  it("El método POST en la ruta '/products' debe crear un producto satisfactoriamente", async () => {
    const newProduct = {
      title: "Producto de pruebass",
      description: "Descripción del producto de prueba",
      price: 100,
      code:111,
      category: "Prueba",
      stock: 10,
      thumbnail: "imagen.png"
    };

    const response = await request.post("/products").set('Cookie', cookie).send(newProduct);
    expect(response.status).to.equal(201);
    console.log(response.payload, 'id');
    expect(response._body).to.be.an("array");
    expect(response._data).to.have.property("_id");
    productId = response.body._id;
    console.log(productId); // Almacena el ID del producto creado para eliminarlo más tarde
  });

  it("El método DELETE en la ruta '/products/:pid' debe borrar un producto según su ID", async () => {
    if (!productId) {
      throw new Error("No se pudo obtener el ID del producto creado anteriormente");
    }

    const response = await request.delete(`/products/${productId}`);
    expect(response.status).to.equal(204);
  });
});})