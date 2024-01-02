import CartManager from "../dao/CartManager.js";
import UserService from "../services/user.service.js";
import { createHash, tokenGenerator, isPasswordValid } from "../utils.js";
import config from '../config.js'

const Admin = {first_name: config.adminName,
  last_name: config.adminLastname,
  email: config.adminEmail,
  password:config.adminPassword,
  role: config.adminRole

}

export default class AuthController{
    static  async register(data){
        const {
            first_name,
            last_name,
            email,
            password,
            age,
          } = data;
          console.log('data :', data);
          if (
            !first_name ||
            !last_name ||
            !email ||
            !age||
            !password
          ) {
            throw new Error('Todos los campos son requeridos 😨')
          }
          let user = await UserService.get({ email });
          if (user) {
            throw new Error('Correo ya registrado 😨. Intenta recuperar tu contraseña 😁.' );
          }
            let registeredUser = await UserService.create({
              first_name,
              last_name,
              email,
              age,
              password: createHash(password),
            });
            
            const cart = await CartManager.getOrCreateCart(registeredUser._id);
            console.log('cart:', cart);
            registeredUser.cart = cart._id;
            await registeredUser.save();
            const token = tokenGenerator(registeredUser, registeredUser.cart);
            return token;
         

    }

    static async login(data){
        const { email, password } = data;
        console.log(email, 'email');
        if (email === Admin.email && password === Admin.password) {
         
          const token = tokenGenerator({
              first_name: Admin.first_name,
              last_name: Admin.last_name,
              email: Admin.email,
              role: Admin.role
          });
  
          return token;}
      let user = await UserService.get( {email});
        console.log('user ss', user);
        if (!user) {
            throw new Error('Correo o contraseña invalidos 😨')
        }console.log('user id', user.id);
        const cart = await CartManager.getOrCreateCart(user.id);
        const isValidPassword = isPasswordValid(password, user);
        if (!isValidPassword) {
            throw new Error('Correo o contraseña invalidos ss😨')
        }
        const token = tokenGenerator(user, cart._id);
      
        return token
    }

    static async recovery(data){
        const { email, newPassword } = data;
        const user = await UserService.get({ email });
        if (!user) {
            throw new Error('Correo o contraseña invalidos 😨')
        };
      const  userId = user._id 
      await UserService.updateById(userId, { password: createHash(newPassword) });
return user
    }
}