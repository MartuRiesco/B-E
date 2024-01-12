import CartManager from "../dao/CartManager.js";
import UserService from "../services/user.service.js";
import { createHash, tokenGenerator, isPasswordValid } from "../utils.js";
import config from '../config.js'
import { CustomError } from "../utils/CustomError.js";
import EnumsError from "../utils/enumError.js";
import { generatorUserError, validatorUserError } from "../utils/CauseMessageError.js";

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
            CustomError.createError({
              name: 'Error creando el usuario',
              cause: generatorUserError({
                first_name,
                last_name,
                email,
                age,
                password,
              }),
              message: 'Ocurrio un error mientras intentamos crear un usuario.',
              code: EnumsError.BAD_REQUEST_ERROR,
            });
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
          CustomError.createError({
            name: 'Error accediendo al usuario ',
            cause: validatorUserError({
              email,
              password,
            }),
            message: 'Contraseña o email invalidos😨.',
            code: EnumsError.INVALID_PARAMS_ERROR,
          })
        }console.log('user id', user.id);
        const cart = await CartManager.getOrCreateCart(user.id);
        const isValidPassword = isPasswordValid(password, user);
        if (!isValidPassword) {
          CustomError.createError({
            name: 'Error accediendo al usuario ',
            cause: validatorUserError({
              email,
              password,
            }),
            message: 'Contraseña o email invalidos😨.',
            code: EnumsError.INVALID_PARAMS_ERROR,
          })
        }
        const token = tokenGenerator(user, cart._id);
      
        return token
    }

    static async recovery(data){
        const { email, newPassword } = data;
        const user = await UserService.get({ email });
        if (!user) {
          CustomError.createError({
            name: 'Error accediendo al usuario ',
            cause: validatorUserError({
              email,
              password,
            }),
            message: 'Contraseña o email invalidos😨.',
            code: EnumsError.INVALID_PARAMS_ERROR,
          })
        };
      const  userId = user.id 
      await UserService.updateById(userId, { password: createHash(newPassword) });
return user
    }
}