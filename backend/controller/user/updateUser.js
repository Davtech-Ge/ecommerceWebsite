const userModel = require("../../models/User")

const updateUser = async (req, res) => {
    try {
        const sessionUser = req.userId

       const { userId, name, email, role } = req.body
       
       const payload = {
        ...( email && { email : email}),
        ...( name && { name : name}),
        ...( role && { role : role})
       }

       const user = await userModel.findById(sessionUser)
       
       console.log("user-role", user.role)

       const updateUser =  await userModel.findByIdAndUpdate(userId, payload);

       res.json({
        data: updateUser,
        message: 'user Updated successfully',
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

module.exports = updateUser