const uploadProductPermission = require("../../helper/permission")
const ProductModel = require("../../models/ProductModel")

const UploadProductController = async (req, res) => {
    try {

        const sessionUserId = req.userId

        if (!uploadProductPermission(sessionUserId)){
            throw new Error("Permission Denied"); 
        }

        const uploadProducts = new ProductModel(req.body) 
        const saveProducts = uploadProducts.save()

        res.status(201).json({
            message : "Uploaded successfully",
            error : false,
            success : true,
            data : saveProducts
        })
    } catch (err) {
        res.status(400).json({
            mesage: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = UploadProductController