import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import GithubStrategy from 'passport-github2'
import { createHash, isPasswordValid } from "../utils.js";
import UserModel from "../models/user.model.js";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
  import { JWT_SECRET } from '../utils.js';
  
  const githubOpts ={ 
    clientID:  'Iv1.a164544df8fe1231',
    clientSecret: 'c8ab7905640f32e0093b9fb65245e5be0daa157f',
    callbackURL: "http://localhost:8080/api/sessions/github/callback"}
    
    const opts = {
      jwtFromRequest: ExtractJwt.fromExtractors([coookieExtractor]),
    secretOrKey: JWT_SECRET,
  };
  function coookieExtractor(req) {
    let token = null;
    /* let cartId = null; */
    if (req && req.signedCookies) {
      token = req.signedCookies['access_token'];
      /* cartId = req.signedCookies['cart_id']; */
    }
    return token ;
  }
  export const init = () => {
    passport.use('jwt', new JwtStrategy(opts, (payload, done) => {
      return done(null, payload);
    }));
  };
  
  /* const opts ={
      usernameField : 'email',
      passReqToCallback: true,
  } */
 /* export const init = () =>{
    passport.use('register', new LocalStrategy (opts,  async (req, email, password, done)=>{
       try{ const user = await UserModel.findOne({email})
        if (user) {
            return done(new Error('User already register 😨'));
          }
          const hashedPassword = createHash(password);
          const newUser = await UserModel.create({
            ...req.body,
            password: hashedPassword,
          });
          done(null, newUser);
        } catch (error) {
          done(new Error(`Ocurrio un error durante la autenticacion ${error.message} 😨.`));
        }

    }))

    passport.use('login', new LocalStrategy(opts, async (req, email, password, done) => {
   try {
    const user = await UserModel.findOne({ email });
    console.log('user', user);

    if (!user) {
      return done(new Error('Correo o contraseña inválidos 😨'));
    }

    const isPassValid = await isPasswordValid(password, user);
    console.log("isPassValid", isPassValid);

    if (!isPassValid) {
      return done(new Error('Correo o contraseña inválidos 😨'));
    }

    console.log('Here');
    done(null, user);
  } catch (error) {
    done(new Error(`Ocurrió un error durante la autenticación ${error.message} 😨.`));
  }
      }));
      passport.use('github', new GithubStrategy(githubOpts, async (accessToken, refreshToken, profile, done) =>{
        console.log('profile', profile);
        const email = profile._json.email;
        let user = await UserModel.findOne({ email });
        if (user) {
          return done(null, user);
        }
        user = {
          first_name: profile._json.name,
          last_name: '',
          email,
          age: 18,
          password: '',
          provider: 'Github',
        };
        const newUser = await UserModel.create(user);
        done(null, newUser);
      }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
      });
    
      passport.deserializeUser(async (uid, done) => {
        const user = await UserModel.findById(uid);
        done(null, user);
      });
} */