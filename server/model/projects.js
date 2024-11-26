const mongoose = require("mongoose");

const projectsSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        added_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        status: {
            type: Number,
            enum: [1, 0], // Allow only 1 (pending) and 0 (completed)
            default: 1,   // Default is 1 (pending)
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Projects", projectsSchema)
