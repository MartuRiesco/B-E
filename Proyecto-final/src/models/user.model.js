import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  provider: String,
  role: { type: String, default: 'user',  enum: ['user', 'premium', 'admin']  },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  jwtToken: String,
}, { timestamps: true });
userSchema.pre('find', function() {
  this.populate('cart');
});
userSchema.post('save', async function (doc) {
  if (!doc.cart) {
    const Cart = mongoose.model('Cart');
    const cart = await Cart.create({ user: doc._id, products: [] });
    doc.cart = cart._id;
    await doc.save();
  }
});

export default mongoose.model('User', userSchema);