
const mongoose = require("mongoose");

const addToCartSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
        },

        product_id: {
            type: String,

        },

        quantity: {
            type: Number,
        },

        status: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
);



module.exports = mongoose.model("addToCart", addToCartSchema);