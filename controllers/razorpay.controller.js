const RazorpayService = require("../services/razorpay.services");
const Data_ = require("../models/data");



exports.create = async (req, res) => {

    try {

        const {
            data
        } = req.body

        console.log("data", data);
        await Data_({ data: req.body })
        const result = await RazorpayService.createService(
            data
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


exports.list = async (req, res) => {

    try {


        const result = await RazorpayService.listService();

        return res.status(200).json(
            {
                success: true,
                message: "list successful",

            }
        );

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



exports.delete = async (req, res) => {

    try {

        const { _id } = req.body;
        const result = await RazorpayService.deleteService(_id);
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

exports.fetch = async (req, res) => {

    try {
        const { _id } = req.body;
        const result = await RazorpayService.fetchService(_id);
        return res.status(200).json(result);

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


exports.generatePaymentLink = async (req, res) => {


    try {

        const result = await RazorpayService.generatePaymentLinkService(req);
        return res.status(200).json(result);

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

}