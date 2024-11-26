const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        project_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Projects',
            required: true,
        },
        added_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        added_for: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        },
        time:{
            type: Number,  
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

module.exports = mongoose.model("Tasks", tasksSchema)
