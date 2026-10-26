
const mongoose = require("mongoose");

const productBookingSchema = new mongoose.Schema(
    {


        user_id: {
            type: String,

        },

        product_id: {
            type: String,

        },

        rental_start_date: {
            type: Date,
            required: true,
        },

        rental_end_date: {
            type: Date,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },


        security_deposit: {
            type: Number,
            default: 0,
            min: 0,
        },
        remaining_amount: {
            type: Number,
            default: 0,
            min: 0,
        },
        total_amount: {
            type: Number,
            required: true,
            min: 0,
        },

        booking_status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "active",
                "returned",
                "cancelled",
                "rejected",
            ],
            default: "pending",
            index: true,
        },

        payment_status: {
            type: String,
            enum: [
                "pending",
                "paid",
                "failed",
                "refunded",
                "partially_refunded",
            ],
            default: "pending",
        },

    },
    { timestamps: true }
);



module.exports = mongoose.model(
    "ProductBooking",
    productBookingSchema
);
