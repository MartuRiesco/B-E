 import dotenv from 'dotenv'

 dotenv.config();


 export default {
    port: process.env.PORT,
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    cookeSecret: process.env.COOKE_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    userEmail: process.env.GMAIL_USER,
    userPass: process.env.GMAIL_PASS,
    adminName:process.env.ADMIN_NAME,
    adminLastname: process.env.ADMIN_LASTNAME,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    adminRole: process.env.ADMIN_ROLE,
    ENV: process.env.NODE_ENV || 'dev',
    persistance: process.env.PERSISTANCE || 'mongo',
    
  }