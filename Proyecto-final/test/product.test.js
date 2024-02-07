import { expect } from "chai";
import config from "../src/config.js";
import supertest from "supertest";
import mongoose from "mongoose";
const request = supertest("http://localhost:8080")


describe('Test de integracion - Products', () => {
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
        const { statusCode, body } = await request.get('/products').set('Cookie', cookie)
console.log('mensJe',body);
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
})