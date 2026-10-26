const AddtoCartService = require("../services/addtocart.services");
const AddtoCart_ = require("../models/addTocart");


exports.addToCart = async (req, res) => {

    try {

        const {
            product_id, quantity
        } = req.body;
        const user_id = req.user_id
        const result = await AddtoCartService.addToCartService(
            product_id, user_id,
            quantity

        );

        return res.status(201).json({
            success: true,
            message: "added successful",

        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


exports.Update = async (req, res) => {

    try {
        //const id = req.clientId;
        const {
            _id,
            product_id,
            quantity,
            status,
        } = req.body;
        const user_id = req.user_id;

        console.log("req", req.body)
        const result = await AddtoCartService.update(
            _id,
            user_id,
            product_id,
            quantity,
            status,

        );

        return res.status(200).json(
            {
                success: true,
                message: "updated successful",

            }
        );

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



exports.Delete = async (req, res) => {

    try {

        const { _id } = req.body;
        const result = await AddtoCartService.delete(_id);
        return res.status(200).json({
            success: true,
            message: "deleted successful",

        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



exports.List = async (req, res) => {
    try {
        const user_id = req.user_id;
        const result = await AddtoCartService.list(user_id);

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            ...result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.Fetch = async (req, res) => {

    try {

        const {
            _id,
            product_id
        } = req.body;
        const user_id = req.user_id;
        const result = await AddtoCartService.fetch(
            _id,
            product_id,
            user_id,
        );
        return res.status(200).json(result);

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
