import nodemailer from 'nodemailer';
import config from '../config.js'

export default class EmailService {
  static #instance = null;

    constructor() {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
          user: config.userEmail,
          pass: config.userPass,
        },
      })
    }
  
    sendEmail(to, subject, html, attachments = []) {
      return this.transporter.sendMail({
        from: config.userEmail,
        to,
        subject,
        html,
        attachments,
      });
    }
    sendRecoveryPasswordEmail(user) {
      return this.sendEmail(
        user.email,
        `Recuperación de contraseña`,
        `<h1>Hola! ingresa a este <a href='/recovery-password'>link</a> para recuperar tu contraseña</h1>`
      );
    }
    sendDeleteEmail (user){
      return this.sendEmail(
        user.email, 
        `Eliminacion de la cuenta`,
        `<h1>Hola! Se ha eliminado tu cuenta por inactividad. Para volver a crear una cuenta ingresa a <a href='/register'>este link</a>`

      )
    }
    sendDeleteProduct (user){
      return this.sendEmail(
        user, 
        `Eliminacion del producto`,
        `<h1>Hola! Se ha eliminado tu producto. Para volver a crear uno  ingresa a <a href='/login'>este link </a>y anda a la seccion de creacion de productos`

      )
    }

    static getInstance() {
      if (!EmailService.#instance) {
        EmailService.#instance = new EmailService();
      }
      return EmailService.#instance;
    }
  }
  