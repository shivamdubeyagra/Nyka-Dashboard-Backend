const express = require("express");
const ProductModel = require("../models/productModel.js");
const { authenticator } = require("../middlewares/authMiddleware.js");
const productRouter = express.Router();

productRouter.post('/products',authenticator,async(req,res)=>{
    try{
        const newProduct = new ProductModel(req.body);
        await newProduct.save();
        res.status(200).send({"msg":"A new product has been added"});
    }catch(error){
        res.status(400).send({"msg":"getting error in new product creation"})
    }
});
productRouter.get("/products",authenticator,async(req,res)=>{
    try{
        const getProducts = await ProductModel.find();
        res.status(200).send(getProducts)
    }catch(error){
        res.status(400).send({"msg":"getting error in  getproduct "})
    }
});
productRouter.get("/products/:id",authenticator,async(req,res)=>{
    const {id} = req.params;
    try{
        const getProduct = await ProductModel.find({_id:id});
        res.status(200).send(getProduct)
    }catch(error){
        res.status(400).send({"msg":"getting error in  getproduct "})
    }
});
productRouter.patch("/products/:id",authenticator,async(req,res)=>{
    const {id} = req.params;
    try{
         await ProductModel.findByIdAndUpdate({_id:id},req.body);
         res.status(200).send({"msg":`Note with with ID:${id} has been updated`})
    }catch(error){
        res.status(400).send({"msg":"getting error in  updateProduct "})
    }
});
productRouter.delete("/products/:id",authenticator,async(req,res)=>{
    const {id} = req.params;
    try{
         await ProductModel.findByIdAndDelete({_id:id});
         res.status(200).send({"msg":`Note with with ID:${id} has been deleted`})
    }catch(error){
        res.status(400).send({"msg":"getting error in  deleteProduct "})
    }
});
module.exports = productRouter