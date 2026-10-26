const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            required: true,
            enum: ["admin", "super_admin"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("AdminUser", adminUserSchema);