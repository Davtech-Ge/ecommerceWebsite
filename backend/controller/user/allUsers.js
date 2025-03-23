const userModel = require("../../models/User")

const allUsers = async (req, res) => {
    try {
       console.log('userId allusers', req.userId) 

        const allUsers = await userModel.find();

       res.json({
        message : "all user details",
        data : allUsers,
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

module.exports  = allUsers