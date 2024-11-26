const mongoose = require("mongoose");

const userTokenSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    },
    token: {
        type: String,
    },
})

module.exports = mongoose.model("UserToken", userTokenSchema)