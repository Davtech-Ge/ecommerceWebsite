const userModel = require("../../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSignInController = async (req, res) => {
    try {
        const { email, password } = req.body;
     if (!email){
        throw new Error("please enter your email");
     }
     if ( !password ){
        throw new Error("please enter your password");
     }
     const user =  await userModel.findOne({email});

     if (!user) {
        throw new error (" invalid Email not found ");
     }

     const checkPassword =  bcrypt.compareSync(password, user.password);
     console.log("checkpassword", checkPassword);

     if (checkPassword){

        const tokenData = {
            _id: user.id,
            email: user.email,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: 60 * 60 * 8 });

        const tokenOptions = {
            httpOnly : true,
            secure: true
        }
        res.cookie("token", token, tokenOptions).status(200).json({
            message: "Login Successful",
            data: token,
            success: true,
            error: false
        })
     } else {
        throw new Error("Invalid email or password")
     }

    } catch (err) {
        res.json({ 
            message: err.message || err,
            error : true,
            success: false
        })
    }
}

module.exports = userSignInController;