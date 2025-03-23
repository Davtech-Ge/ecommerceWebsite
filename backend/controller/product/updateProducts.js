const uploadProductPermission = require("../../helper/permission");
const productModel = require("../../models/ProductModel")

const updateProductController = async (req, res) => {
    try {
        if (!uploadProductPermission(req.userId)){
            throw new Error("Permission Denied"); 
        }
         const { _id, ...resBody} = req.body

       const updateProducts = await productModel.findByIdAndUpdate(_id, resBody)

       res.status(200).json({
        message : "updated successfully",
        data : updateProducts,
        error: false,
        success : true
       })
    } catch (err) {
        res.status(400).json({
            mesage: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateProductController