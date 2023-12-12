import mongoose from "mongoose";
import config from "../config.js";
      
      export  const URI = config.mongodbUri;
export const init = async () => {
    try {
      await mongoose.connect(URI);
      console.log('Database conected 🚀');
    } catch (error) {
      console.log('Ah ocurrido un error al intentar conectarnos a la DB', error.message);
    }
  }