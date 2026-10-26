const ProductService = require("../services/product.services");
const Product_ = require("../models/product");


exports.addProduct = async (req, res) => {

    try {

        const {
            product_type,
            product_id,
            name,
            category,
            sizes,
            description,
            color_theme,
            occasion,
            set_included,
            purchase_price,
            actual_mrp,
            stock,
            status,
            design_by,
        } = req.body;

        const result = await ProductService.addProductService(
            product_type,
            product_id,
            name,
            category,
            sizes,
            description,
            color_theme,
            occasion,
            set_included,
            purchase_price,
            actual_mrp,
            stock,
            status,
            design_by,

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


exports.updateProduct = async (req, res) => {

    try {
        //const id = req.clientId;
        const {
            _id,
            product_type,
            product_id,
            name,
            category,
            sizes,
            description,
            color_theme,
            occasion,
            set_included,
            purchase_price,
            actual_mrp,
            stock,
            status,
            design_by,
        } = req.body;
        console.log("token", id);

        console.log("req", req.body)
        const result = await ProductService.updateProductService(
            _id,

            product_type,
            product_id,
            name,
            category,
            sizes,
            description,
            color_theme,
            occasion,
            set_included,
            purchase_price,
            actual_mrp,
            stock,
            status,
            design_by,

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



exports.deleteProduct = async (req, res) => {

    try {

        const { _id } = req.body;
        const result = await ProductService.deleteProductService(_id);
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

exports.list = async (req, res) => {

    try {

        const result = await Product_.find();
        return res.status(200).json(result);

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


exports.getProducts = async (req, res) => {
    try {
        const result = await ProductService.getProducts(req.body);

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

exports.fetchProduct = async (req, res) => {

    try {

        const { _id } = req.body;
        const result = await Product_.findOne({ _id });
        return res.status(200).json(result);

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.uploadImages = async (req, res) => {

    try {

        const { _id } = req.body;

        console.log("req files", req.file.location)
        const images = req.file.location;
        const result = await ProductService.uploadImagesService(_id, images);
        return res.status(200).json(
            {
                success: true,
                message: "images uploaded successful",

            }
        );

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.uploadVideo = async (req, res) => {

    try {

        const { _id } = req.body;
        const video = req.file.location;
        console.log("_id", _id, "video", video);
        const result = await ProductService.uploadVideoService(_id, video);
        return res.status(200).json(
            {
                success: true,
                message: "video uploaded successful",

            }
        );

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteImage = async (req, res) => {

    try {
        // const id = req.clientId;
        const { _id, image } = req.body;
        console.log("id", id, "_id", _id, "image", image);
        const result = await ProductService.deleteImageService(_id, image);
        return res.status(200).json(
            {
                success: true,
                message: "image deleted successful",

            }
        );

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteVideo = async (req, res) => {

    try {

        const { _id, video } = req.body;
        console.log("_id", _id, "video", video);
        const result = await ProductService.deleteVideoService(_id, video);
        return res.status(200).json(
            {
                success: true,
                message: "video deleted successful",

            }
        );

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.changeStatus = async (req, res) => {

    try {
        //const id = req.clientId;
        const { _id, status } = req.body;
        const result = await ProductService.changeStatusService(_id, status);
        return res.status(200).json(
            {
                success: true,
                message: "status changed successful",

            }
        );

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.approveProduct = async (req, res) => {

    try {
        //const id = req.clientId;
        //console.log("id", id);
        const role = req.role
        console.log("role", role);
        const { _id, product_status } = req.body;
        const result = await ProductService.approveProductService(role, _id, product_status);
        return res.status(200).json(
            {
                success: true,
                message: "product approved successful",

            }
        );

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.viewCount = async (req, res) => {
    try {
        const { _id } = req.body;
        const result = await ProductService.viewCountService(_id);
        return res.status(200).json(
            {
                success: true,
                message: "view count increased successful",

            }
        );

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}