const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    avatar: String,
    email: { type: String, unique: true , required:true},
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
},{versionKey:false})

const UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel

