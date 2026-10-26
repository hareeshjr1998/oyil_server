
const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },

        otp_code: {
            type: String,
            required: true
        },

        purpose: {
            type: String,
            enum: ["REGISTRATION", "FORGOT_PASSWORD"],
            required: true
        },

        status: {
            type: String,
            enum: ["HOLD", "VERIFIED", "EXPIRED"],
            default: "HOLD"
        },

        expires_at: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Otp", otpSchema);
