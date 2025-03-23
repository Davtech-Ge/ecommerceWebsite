const bcrypt = require('bcrypt');
const userModel = require('../../models/User');


const userSignUpController = async (req, res) => {
    try {
        const { email, name, password } = req.body

        const user = await userModel.findOne({ email });

        if(user) {
            throw new Error("User already exist");
            
        }

        if (!email) {
            throw new Error("please provide email");
        }
        if (!password ) {
            throw new Error("please provide password");
        }
        if (!name) {
            throw new Error("please provide name");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword =  await bcrypt.hashSync(password, salt);
         
        if(!hashPassword) {
            throw new error("something went wrong");
        }


        const payload = {
            ...req.body,
            role: 'GENERAL',
            password: hashPassword
        }

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data : saveUser,
            success: true,
            error : false,
            message : "user created successfully"
        });
        
    } catch (err) {
       res.json({
        message : err.message,
        error: true,
        success: false
       }) 
    }
}

module.exports = userSignUpController;