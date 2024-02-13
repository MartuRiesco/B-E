import { expect } from 'chai';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import 'dotenv/config';
import { getNewId } from '../src/utils.js';

const requester = supertest('http://localhost:8080');

describe('Test del modulo de carts', function () {

    this.timeout(8000);
    let cookie;
    let pid;
    let cid;
    const userMock = {
        first_name: 'Nombre',
        last_name: 'Apellido',
        email: 'na@hotmail.com',
        age: 50,
        password: '1234',
        role: 'premium'
    };
    const productMock = {
        title: faker.commerce.productName(),
        description: `${faker.commerce.productName()} = ${faker.lorem.word(5)}`,
        code: getNewId(),
        price: faker.number.float({ min: 1, max: 1000000, precision: 0.01 }),
        stock: faker.number.int({ min: 0, max: 10000 }),
        category: faker.commerce.department()
    };

    before(async function () {
        await mongoose.connect("mongodb+srv://riescomartina:fTkMkkVNuG9gt4Xv@cluster0.5qlyyfc.mongodb.net/ecommerce-test"
        );
        const {
            statusCode: userStatusCode,
            ok: userOK,
            _body: userBody
        } = await requester.post('/auth/register').send(userMock);


        const {
            headers,

        } = await requester.post('/auth/login').send(userMock);
        const [key, value] = headers['set-cookie'][0].split('=');
        cookie = { key, value };


        const {
            statusCode: statusCodeCurrent,
            ok: okCurrent,
            _body: bodyCurrent
        } = await requester.get('/products')
            .set('Cookie', [`${cookie.key}=${cookie.value}`]);


    console.log("bodyCurrent", bodyCurrent)

        cid = bodyCurrent.userCart;
        pid = bodyCurrent.payload[0]._id
        console.log('cid', cid);
        console.log('pid', pid);

        const {
            statusCode,
            ok,
            _body,
        } = await requester.post('/products').send(productMock)
            .set('Cookie', [`${cookie.key}=${cookie.value}`]);;
        console.log('body b', _body);
        

    })

    after(async function () {
        await mongoose.connection.close();
    })

    it('Obtiene todos los carritos', async function () {
        const {
            statusCode,
            ok,
            _body,
        } = await requester.get('/carts').set('Cookie', [`${cookie.key}=${cookie.value}`]);;;

         console.log("_body", _body)
        expect(statusCode).to.be.equals(200);
        expect(ok).to.be.ok;
        expect(Array.isArray(_body)).to.be.true;

    });

    it('Obtiene un carrito por su id', async function () {
        const {
            statusCode: firstStatusCode,
            ok: firstOK,
            _body: response1,
        } = await requester.get('/products')
            .set('Cookie', [`${cookie.key}=${cookie.value}`]);

            console.log('response1', response1);
        const cid = response1.userCart;
console.log('cartid', cid);
        const {body, statusCode, ok}= await requester.get(`/carts/${cid}`).set('Cookie', [`${cookie.key}=${cookie.value}`]);


        console.log('response2', body);
         expect(statusCode).to.be.equals(200);
        expect(body).to.have.property('cartId');
        expect(Array.isArray(body.payload)).to.be.true

    });

    it('Agrega un producto al carrito', async function () {
        let productAndQuantity = {
            productId: pid,
            quantity: 4
        }
        console.log('pid', pid);
        const {statusCode, body, ok} = await requester.post(`/carts/${cid}/product/${pid}`)
            .set('Cookie', [`${cookie.key}=${cookie.value}`])
            .send(productAndQuantity);

         console.log("_body", body)
        expect(statusCode).to.be.equals(201);
        expect(body).to.have.property('products').to.be.ok;
        expect(Array.isArray(body.products)).to.be.ok
       
    });

    it('Genera una compra', async function () {
        const {
            statusCode,
            ok,
            _body
        } = await requester.post(`/carts/${cid}/purchase`).set('Cookie', [`${cookie.key}=${cookie.value}`])
        console.log('body', _body);
        expect(statusCode).to.be.equals(200);

    });

});