import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
title:{type: String, required:true},
description:{type: String, required:true},
price:{type: Number, required:true},
thumbnails:{type: Array},
code:{type: String, required:true},
status:{type: Boolean, required:true, default:true},
}, {timestamps:true})
export default mongoose.model('Product', productSchema)