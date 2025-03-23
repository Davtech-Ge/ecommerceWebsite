const express = require('express')

const router = express.Router();

const userSignUpController = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogoutController = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const UploadProductController = require('../controller/product/uploadProducts');
const getProductController = require('../controller/product/getProducts');
const updateProductController = require('../controller/product/updateProducts');
const getCategoryproduct = require('../controller/product/getCategoryProduct');

router.post('/signup', userSignUpController)
router.post("/login", userSignInController)
router.get('/user-details',authToken, userDetailsController)
router.get('/userLogout', userLogoutController)

//Admin panel
router.get('/all-user', authToken,allUsers)
router.post('/update-user',authToken, updateUser)

// products
router.post('/upload-products', authToken, UploadProductController)
router.get('/get-products', getProductController)
router.post('/update-products',authToken, updateProductController)

//product category
router.get("/get-ProductCategory", getCategoryproduct)

module.exports = router