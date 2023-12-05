import mongoose from 'mongoose'
import paginator from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
}, { _id: false });

const cartSchema = new mongoose.Schema({
  user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: { type: [productSchema], required: true }
}, { timestamps: true });

cartSchema.plugin(paginator)
/* cartSchema.pre('find', function() {
    this.populate('products.product');
  }); */
export default mongoose.model('Cart', cartSchema)