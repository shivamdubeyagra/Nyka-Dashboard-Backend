const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    picture: { type: String, required: true },
    description: { type: String, required: true },
    gender: { type: String, required:true, enum: ['male', 'female'] },
    category: { type: String,required:true,enum: ['makeup', 'skincare', 'haircare'] },
    price: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
},{versionKey:false})

const ProductModel = mongoose.model('product',productSchema);

module.exports = ProductModel

