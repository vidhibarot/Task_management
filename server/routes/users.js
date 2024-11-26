const express = require("express")
const router = express.Router()
// import ProductController from "../controllers/products";
const userController = new (require('../controllers/users'))();
// const Authentication = new (require("../middleware/authentication"));
// const userAuth = Authentication.userAuth;
// import { getAllproducts ,getAllproductsTesting} from "../controllers/products"
// const FileUpload = require("../utils/filemanager")();

router.route("/register").post(userController.userRegister);
// // for pass multiple feild image we use this method and 

// //router.route("/add").post(FileUpload.single("profileImage"),userController.addUser);

// // we use above route for pass single feild image data 

router.route("/userlogin").post(userController.userLogin);

// router.route("/userlogout").get(userAuth, userController.userLogout)

// router.route("/update").put(FileUpload.fields([{
//     name: 'profileImage', maxCount: 1
// }, {
//     name: 'avatarImage', maxCount: 1
// }]), userAuth, userController.updateUser);

// router.route("/getuserprofile").get(userAuth, userController.getUserProfile);

// router.route("/delete").delete(userAuth, userController.deleteUser);

// router.route("/forgotpassword").post(userAuth, userController.userForgotPassword);

// router.route("/resetpassword").post(userController.userResetPassword);

module.exports = router

