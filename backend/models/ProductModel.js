const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    brandName : String,
    category : String,
    description : String,    
    price : Number,
    productImage : [],
    productName : String,
    sellingPrice : Number
}, {
    timestamps : true,
})

const productModel = mongoose.model("products", productSchema)

module.exports = productModel