const productModel = require('../../models/ProductModel')

const getProductController = async (req, res) => {
    try {
       const allProducts =  await productModel.find().sort({ createdAt : -1 })

       res.status(200).json({
            message : 'allproducts ',
            success : true,
            error : false,
            data : allProducts
       })
    } catch (err) {
        res.status(400).json({
            mesage: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getProductController