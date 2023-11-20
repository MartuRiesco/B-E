import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import GithubStrategy from 'passport-github2'
import { createHash, isPasswordValid } from "../utils.js";
import UserModel from "../models/user.model.js";


const opts ={
    usernameField : 'email',
    passReqToCallback: true,
}
const githubOpts ={ 
  clientID:  'Iv1.a164544df8fe1231',
  clientSecret: 'c8ab7905640f32e0093b9fb65245e5be0daa157f',
  callbackURL: "http://localhost:8080/api/sessions/github/callback"}

 export const init = () =>{
    passport.use('register', new LocalStrategy (opts,  async (req, email, password, done)=>{
       try{ const user = await UserModel.findOne({email})
        if (user) {
            return done(new Error('User already register 😨'));
          }
          const newUser = await UserModel.create({
            ...req.body,
            password: createHash(password),
          });
          done(null, newUser);
        } catch (error) {
          done(new Error(`Ocurrio un error durante la autenticacion ${error.message} 😨.`));
        }

    }))

    passport.use('login', new LocalStrategy(opts, async (req, email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
          if (!user) {
            return done(new Error('Correo o contraseña invalidos 😨'));
          }
          const isPassValid = isPasswordValid(password, user);
          if (!isPassValid) {
            return done(new Error('Correo o contraseña invalidos 😨'));
          }
          console.log('Here');
          done(null, user);
        } catch (error) {
          done(new Error(`Ocurrio un error durante la autenticacion ${error.message} 😨.`));
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
}