import {expect }from "chai";
import supertest from "supertest";
import productModel from "../src/models/product.model.js";
import app from "../src/app.js";
import config from "../src/config.js";
import mongoose from "mongoose";
const requester =supertest(app)

describe("Testing de ecommerce", ()=>{
    const user = {
        "email": "admin@gmail.com",
        "password": "1234"
    };
    
    let cookie = {};

    before(async () => {
        const URL = config.mongodbUri;
        await mongoose.connect(URL);
        console.log('Conectado a la db correctamente');
        await requester.post('/auth/login').send(user)
        .then((result) => {
            const cookieResult = result.header["set-cookie"][0];
            cookie = cookieResult;
        });
    });

    describe("Test del modulo products", ()=>{
    let productId;
    it.only("Traer todos los productos existentes", async () =>{ 
    const result = await requester.get("/products").set('Cookie', cookie)
    expect(result.statusCode). to.be. equal(200)
    console.log('resultado:',result);
    expect(Array.isArray(result.body.productos)).to.deep.equal(true);

    const product = await productModel. create({
    title: "Producto de prueba",
    description: "Descripción de prueba",
    code: "12345",
    price: 100,
    status: "true",
    stock: 10,
    category: "Categoría de prueba",
    owner: "premium",
    thumbnail: "imagen. jpg",
    });
    
    productId = product._id;
    const getProductResponse = await requester.get(`/product/${productId}}`).set('Cookie', cookie)
    expect(getProductResponse.statusCode).to.be.equal(200);
    expect(getProductResponse.body._id).to.be.equal(productId.tostring());
})
/* describe('Test de integracion - Products', () => {
    const user = {
        "email": "admin@gmail.com",
        "password": "1234"
        }
    let cookie = {}

    before(async () => {
        const URL = config.mongodbUri;
        await mongoose.connect(URL);
        console.log('Conectado a la db correctamente');
        await request.post('/auth/login').send(user)
        .then((result) => {
            const cookieResult= result.header["set-cookie"][0]
            cookie = cookieResult
        })
    })

    it.only('El metodo GET de la ruta "/products" debe retornar la lista de todos los productos', async () => {
        const { statusCode, payload } = await request.get('/products').set('Cookie', cookie)
console.log('mensJe',statusCode);
        expect(statusCode).to.equal(200)
        expect(_body.docs).to.be.an('array')
        expect(_body.totalDocs).to.be.an('number')
    })

    it('El metodo POST en la ruta "/api/products" debe crear un producto satisfactoriamente', async() => {
        const newProduct = {
            title: 'test',
            description: 'description test',
            price: 20000,
            category: 'test',
            stock: 10,
            thumbnail: ['img1']
        }
        const { statusCode, body } = await request.post('/api/products').set('Cookie', cookie).send(newProduct)

        expect(body).to.have.property('code')
        expect(statusCode).to.equal(200)
    })
    
    it('El metodo DELETE en la ruta "/api/products/:pid" debe borrar un producto segun su ID', async() => {
        const { _body } = await request.get('/api/products').set('Cookie', cookie).query({ 'limit': '100' })
        const pid = (_body.docs[_body.docs.length - 1])._id

        const { statusCode } = await request.delete(`/api/products/${pid}`).set('Cookie', cookie)

        expect(statusCode).to.equal(200)
    })
})})}) */})})