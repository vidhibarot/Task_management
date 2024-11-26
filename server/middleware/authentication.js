var jwt = require('jsonwebtoken');
// const userController = new (require('../controllers/users'))();
const UserToken = require("../model/usertokens")
class Authentication {


    async userAuth(req, res, next) {

        let authToken = req.headers.authorization;
        if (!authToken) {
           return res.status(400).send({message:'Validation error !',})
            
        }

        const userToken = await UserToken.aggregate(
            [{
                $match: { token: authToken },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "users"

                }
            }
            ]
        );

        if (!userToken) {
            res.status(400).send({ message: "You are not authorized to access.'" })
            return;
        }

        req.userInfo = userToken ? userToken[0]?.users ? userToken[0]?.users : null : null;
        next();
    }
}
module.exports = Authentication;