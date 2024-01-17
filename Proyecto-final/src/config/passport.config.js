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
