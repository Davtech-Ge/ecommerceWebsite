const productModel = require("../../models/ProductModel")

const getCategoryproduct = async (req, res) => {
        try {
           const productCategory = await productModel.distinct("category")
           
           console.log("category", productCategory)

           //array to store one product from each category
           const productBycategory = []

           for(const category of productCategory){
            const product = await productModel.findOne({category })

            if(product){
                productBycategory.push(product)
            }
           }

           res.json({
            message : 'product category',
            data : productBycategory,
            success : true,
            error : false
           })
        } catch (err) {
            res.status(400).json({
                mesage: err.message || err,
                error: true,
                success: false
            })
        }
}

module.exports = getCategoryproduct