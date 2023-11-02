import mongoose from "mongoose";

export const init = async () => {
    try {
      const URI = 'mongodb+srv://riescomartina:fTkMkkVNuG9gt4Xv@cluster0.5qlyyfc.mongodb.net/ecommerce';
      await mongoose.connect(URI);
      console.log('Database conected 🚀');
    } catch (error) {
      console.log('Ah ocurrido un error al intentar conectarnos a la DB', error.message);
    }
  }