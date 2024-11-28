const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'Please add a email.'],
        },
        password: {
            type: String,
            required: [true, 'Please add a password.'],
        },
    },
    {
        timestamps: true,
    }
)

userSchema.pre('save', async function (next) {

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


userSchema.methods.generateAndSaveToken = async function () {
    const token = jwt.sign({ id: this._id }, "projectmanagement");
    return token;
};

module.exports = mongoose.model("Users", userSchema)
