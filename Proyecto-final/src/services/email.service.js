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
        `<h1>Hola! ingresa a este <a href='http://localhost:8080/recovery-password'>link</a> para recuperar tu contraseña</h1>`
      );
    }
  
    static getInstance() {
      if (!EmailService.#instance) {
        EmailService.#instance = new EmailService();
      }
      return EmailService.#instance;
    }
  }
  