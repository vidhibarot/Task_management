const Users = require("../model/users");
const UserToken = require("../model/usertokens")
const bcrypt = require('bcrypt');

class UserController {


    async userRegister(req, res) {
        try {

            const findEmail = await Users.find({ 'email': req.body.email })

            if (findEmail.length > 0) {
                return res.status(400).send({ message: "User email is alredy there" });
            }

            const result = await Users.create(req.body);

            res.status(200).send({
                message: "User has been added successfully",
                data: result
            });

        } catch (error) {
            console.log(error);
            res.status(400).send({ message: "Internal server Error pls check" });

        }
    }

    async userLogin(req, res) {

        try {
            const userData = await Users.findOne({ "email": req?.body?.email })

            if (!userData) {
                return res.status(400).send({ message: "Your Email Address is not available in our sysytem" })
            }
            const isMatch = await bcrypt.compare(req?.body?.password, userData.password);

            if (!isMatch) {
                return res.status(400).send({ message: "You password is not matched" })
            }

            const token = await userData.generateAndSaveToken();

            const findToken = await UserToken.findOne({ user_id: userData?.id })

            if (findToken) {
                await UserToken.deleteOne({ user_id: userData?.id })
            }

            await UserToken.create({ user_id: userData._id, token });
            const data = {
                "usertoken": token,
                userData
            }
            res.status(200).send({
                message: "User has been login successfully",
                data
            });

        } catch (error) {
            console.log(error);
            res.status(400).send({ message: "Internal server Error pls check" });
        }
    }

    async getAlluser(req, res) {
        try {
            const userData = await Users.find()

            res.status(200).send({
                message: "request has been completed suceesfully",
                data:userData
            });

        } catch (error) {
            console.log(error);
            res.status(400).send({ message: "Internal server Error pls check" });
        }
    }

}

module.exports = UserController;


