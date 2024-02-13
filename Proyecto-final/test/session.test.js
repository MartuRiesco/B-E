import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';

const requester = supertest('http://localhost:8080');

describe('Test del modulo sessions', function () {
    this.timeout(8000)

    let cookie;
    const userMock = {
        first_name: 'Nombre',
        last_name: 'Apellido',
        email: 'sasasrwse@hotmail.com',
        age: 50,
        password: '1234',
        role:'admin'
 };
    before(async function () {
       
        await mongoose.connect("mongodb+srv://riescomartina:fTkMkkVNuG9gt4Xv@cluster0.5qlyyfc.mongodb.net/ecommerce-test");
        console.log('Conectado a la db correctamente');  
    });

    after(async function () {
        await mongoose.connection.close();
    });

    it('Debe crear un usuario correctamente', async function () {
        
        const {
            statusCode,
            ok,
            _body,
        } = await requester.post('/auth/register').send(userMock)
     //   console.log('ok',ok);
      //  console.log('stats', statusCode);
      //  console.log('body', _body)
        // console.log("statusCode", statusCode)
        // console.log("ok", ok)
        expect(statusCode).to.be.equals(201);
        expect(ok).to.be.ok;
     
    });

    it('Loguea un usuario en forma exitosa y redirecciona a /products', async function () {
        const {
            headers,
            statusCode,
            ok,
            _body
        } = await requester.post('/auth/login').send(userMock);

        expect(statusCode).to.be.equals(302);
        expect(headers).to.have.property('location', '/products');
        const [key, value] = headers['set-cookie'][0].split('=');
        cookie = { key, value };
       // console.log('cookie', cookie);
    });

    it('Obtiene el usuario actual con un token válido', async function () {
        const {
            statusCode,
            ok,
            _body
        } = await requester.get('/products')
        
            .set('Cookie', [`${cookie.key}=${cookie.value}`]);
            //console.log('bodyes', _body);
            //console.log('stATUS', statusCode);
            //console.log(ok,'ok');
        // console.log("response", response)
        expect(statusCode).to.be.equals(200);
        expect(ok).to.be.ok;
        expect(_body).to.have.property('userName', userMock.first_name);
        // Agrega más aserciones según lo que esperas en la respuesta del usuario actual
    });
    it('Obtiene un listado de los usuarios', async function () {
    const {
        statusCode,
        ok,
        _body
    } = await requester.get('/users')
        .set('Cookie', [`${cookie.key}=${cookie.value}`]);
     console.log("body", _body)
     console.log('ok', ok);
    expect(statusCode).to.be.equals(200);
    expect(ok).to.be.ok;
    expect(Array.isArray(_body)).to.be.ok
})})