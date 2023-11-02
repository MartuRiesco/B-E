import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
products:{type:[], required:true}
}, {timestamps:true})
export default mongoose.model('Cart', cartSchema)