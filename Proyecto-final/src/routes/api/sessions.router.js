import { Router } from 'express';
import UserModel from '../../models/user.model.js'
import Swal from 'sweetalert2';

const router = Router();

router.post('/sessions/register', async (req, res)=>{
const { body} =req
const newUser = await UserModel.create(body)
console.log('newUser', newUser);
 res.redirect('/login'); 


})
router.post('/sessions/login', async (req, res) => {
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
    const isPassValid = user.password === password;
    if (!isPassValid) {
      return res.status(401).send('Correo o contraseña invalidos 😨.');
    }
    const { first_name, last_name } = user;
    req.session.user = { first_name, last_name, email };
    res.redirect(`/products`);
  });
  router.get('/sessions/logout', (req, res) => {
    req.session.destroy((error) => {
      res.redirect('/');
    });
  });

   
export default router;
