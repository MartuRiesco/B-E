import CartManager from "../dao/CartManager.js";
import UserService from "../services/user.service.js";
import { createHash, tokenGenerator, isPasswordValid } from "../utils.js";
export default class AuthController{
    static  async register  (data){
        const {
            first_name,
            last_name,
            email,
            password,
            age,
          } = data;
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
          user = await UserService.create({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          });
          const cart = await CartManager.getOrCreateCart(user._id);
         user.cart = cart._id;
          await user.save();
          const token = tokenGenerator(user, user.cart);
          return token

    }

    static async login(data){
        const { email, password } = data;
        console.log(email, 'email');
        const user = await UserService.get( {email} );
        console.log('user ss', user);
        if (!user) {
            throw new Error('Correo o contraseña invalidos 😨')
        }
        const cart = await CartManager.getOrCreateCart(user._id);
        console.log(cart, 'cart');
        const isValidPassword = isPasswordValid(password, user);
        if (!isValidPassword) {
            throw new Error('Correo o contraseña invalidossss 😨')
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