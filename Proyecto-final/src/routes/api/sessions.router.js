import { Router } from 'express';
import UserModel from '../../models/user.model.js'
import { createHash, isPasswordValid } from '../../utils.js';
import passport from 'passport';


const router = Router();

/* router.post('/sessions/register', async (req, res)=>{
const { body} =req
const newUser = await UserModel.create({...body, password: createHash(body.password)})
console.log('newUser', newUser);
 res.redirect('/'); 
}) */

/* router.post('/sessions/register',passport.authenticate('register', {failureRedirect: '/register'}), (req, res)=>{
  res.redirect('/'); 
}) */

/* router.post('/sessions/login', async (req, res) => {
    const { body: { email, password } } = req;
    const userAdmin = {
        username: 'adminCoder@coder.com',
        password: 'adminCod3r123',
        rol: "admin"
    };
        if (email === userAdmin.username && password === userAdmin.password) {
            req.session.user = { first_name: "Admin", last_name: "Coderhouse", email: userAdmin.username, rol: userAdmin.rol };
            return res.redirect('/products');
        }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send('Correo o contraseña invalidos 😨.');
    }
    const isPassValid = isPasswordValid(password, user)
    if (!isPassValid) {
      return res.status(401).send('Correo o contraseña invalidos 😨.');
    }
    const { first_name, last_name } = user;
    req.session.user = { first_name, last_name, email };
    res.redirect(`/products`);
  }); */
/*   router.post('/sessions/login', passport.authenticate('login', { failureRedirect: '/' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
  });
  router.get('/sessions/github', passport.authenticate('github',  { scope: ['user:email'] }))
  router.get('/sessions/github/callback', passport.authenticate('github',{ failureRedirect: '/' }), (req, res )=>{
    req.session.user = req.user;
    res.redirect('/products');
  })

  router.post('/sessions/recovery-password', async (req, res) => {
    const { email, newPassword } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send('Correo o contraseña invalidos 😨.');
    }
    await UserModel.updateOne({ email }, { $set: { password: createHash(newPassword) } });
    res.redirect('/');
  });

  router.get('/sessions/logout', (req, res) => {
    req.session.destroy((error) => {
      res.redirect('/');
    });
  }); */

   
export default router;
