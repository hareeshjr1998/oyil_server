
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,

        },

        email: {
            type: String,

        },

        phone_number: {
            type: String,

        },

        alternate_phone_number: {
            type: String,
            trim: true,
            default: null
        },

        password: {
            type: String,

        },

        address: {
            address: {
                type: String,
                //required: true,
                trim: true
            },

            landmark: {
                type: String,
                //required: true,
                trim: true
            },

            state: {
                type: String,
                //required: true,
                trim: true
            },

            district: {
                type: String,
                //required: true,
                trim: true
            },

            city: {
                type: String,
                //required: true,
                trim: true
            },

            town: {
                type: String,
                //required: true,
                trim: true
            },

            street: {
                type: String,
                //required: true,
                trim: true
            },

            permanent_address: {
                type: String,
                trim: true,
                default: null
            },

            pin_code: {
                type: String,
                //required: true,
                trim: true
            },

            country: {
                type: String,
                //required: true,
                trim: true
            }
        },

        profile_image: {
            type: String,
            default: null
        },

        role: {
            type: String,
            default: "user"
        },

        is_verified: {
            type: Boolean,
            default: false
        },

        proofs: {
            driving_licence_image: {
                type: String,
                default: null
            },

            driving_licence_number: {
                type: String,
                trim: true,
                default: null
            },

            pan_image: {
                type: String,
                default: null
            },

            pan_number: {
                type: String,
                trim: true,
                uppercase: true,
                default: null
            },

            aadhar_card_image: {
                type: String,
                default: null
            },

            aadhar_card_number: {
                type: String,
                trim: true,
                default: null
            }
        },

        wishlist: [
            {
                product_id: {
                    type: String
                },

                status: {
                    type: Boolean,
                    default: true
                }
            }
        ],


    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
