const express = require("express")
const router = express.Router()
const userController = new (require('../controllers/users'))();


router.route("/register").post(userController.userRegister);

router.route("/userlogin").post(userController.userLogin);

router.route("/getAllUser").post(userController.getAlluser);


module.exports = router

