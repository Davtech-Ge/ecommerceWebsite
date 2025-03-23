const userModel = require("../../models/User")

async function userDetailsController (req, res){
    try {
        const user = await userModel.findById(req.userId)

        res.status(200).json({
            data : user,
            success: true,
            error: false,
            message : "User Details"
        })

        console.log("user", user)

    } catch (err) {
        res.status(400).json({
            mesage: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userDetailsController;