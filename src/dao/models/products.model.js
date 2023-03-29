import mongoose from "mongoose";

const productCollection = 'products'

const productsSchema = mongoose.Schema({
title: {
    type: String,
    required: true
},
description: {
    type: String,
    required: true
},
price: {
    type: Number,
    required: true   
},
status: {
    type: Boolean,
    required: true      
},
thumbnail: {
    type: String,
    required: false      
},
code: {
    type: Number,
    required: true      
},
stock: {
    type: Number,
    required: true      
}
})

const productsModel = mongoose.model(productCollection, productsSchema)

export default productsModel