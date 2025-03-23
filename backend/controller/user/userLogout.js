const userLogoutController = async (req, res) => {
    try {
       res.clearCookie('token')

       res.json({
        message: 'logged out succesfully',
        success: true,
        error: false,
        data: []
       })
    } catch (err) {
        res.json({
            messsage: err.messsage || err,
            error: true,
            successs : false
        })
    }
}

module.exports = userLogoutController