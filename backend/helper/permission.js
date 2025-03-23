const userModel = require("../models/User")

const uploadProductPermission = async (userId) => {
    const user = await userModel.findOne({ userId })

    if (user?.role !== 'ADMIN'){
        return false
    }
    return true
}

module.exports = uploadProductPermission