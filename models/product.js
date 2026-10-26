const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {

        product_type: {
            type: String,
            required: true,
            trim: true
        },

        product_id: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        sizes: {
            type: [String],
            required: true,
            default: []
        },

        description: {
            type: String,
            default: "",
            trim: true
        },

        color_theme: {
            type: [String],
            required: true,
            default: []
        },

        occasion: {
            type: [String],
            required: true,
            default: []
        },

        set_included: {
            type: [String],

        },
        fabric: {
            type: String,
            trim: true
        },

        views: {
            type: Number,
            default: 0,
        },



        // =====================================================
        // MEDIA
        // =====================================================

        images: {
            type: [String],
            required: true,

        },

        video_url: [{
            type: String,
            default: ""
        }],




        purchase_price: {
            type: Number,
            default: 0,
            min: 0
        },

        actual_mrp: {
            type: Number,
            default: 0,
            min: 0
        },

        // =====================================================
        // STOCK
        // =====================================================

        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 1
        },

        status: {
            type: String,
            enum: [
                "available",
                "rented",
                "inactive"
            ],
            default: "available"
        },
        design_by: {
            type: String
        },

        product_status: {
            type: Boolean,
            default: false
        },

        created_at: {
            type: Date
        },


    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Product",
    productSchema
);