import mongoose from 'mongoose';
import { getNewId } from '../utils.js';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        default: getNewId(),
      },
      purchase_datetime: {
        type: Date,
        required: true,
        default:Date.now()
      },
      amount: {
        type: Number,
        required: true,
      },
      purchaser: {
        type: String,
        required: true,
      },
    }, {timestamps:true});
  
  export default new mongoose.model('Ticket', ticketSchema)