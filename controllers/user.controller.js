const UserService = require("../services/user.services");
const User_ = require("../models/user");




exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await UserService.registerUserService(name, email, password);
        return res.status(200).json(
            {
                success: true,
                message: "registered successful",
            }
        );
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;


        const result = await UserService.loginUserService(email, password);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



exports.addressUpdate = async (req, res) => {

    try {

        const {
            alternate_phone_number,
            address
        } = req.body;

        const user_id = req.user_id
        console.log("user_id", user_id)
        const result = await UserService.addUserService(
            user_id,
            alternate_phone_number,
            address



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




exports.delete = async (req, res) => {

    try {
        const user_id = req.user_id;
        const { _id } = req.body;
        const result = await UserService.deleteUserService(_id, user_id);
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

        const user_id = req.user_id;

        const result = await UserService.list(user_id);
        return res.status(200).json(result);

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.fetch = async (req, res) => {

    try {
        const user_id = req.user_id;
        const { _id } = req.body;
        const result = await UserService.fetch(user_id, _id);
        return res.status(200).json(result);

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.profileUpload = async (req, res) => {

    try {
        const user_id = req.user_id;
        const image = req.file.location;
        const { _id } = req.body;
        const result = await UserService.profileUploadService(_id, user_id, image);
        return res.status(200).json(
            {
                success: true,
                message: "profile picture uploaded successful",

            }
        );

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.profileRemove = async (req, res) => {

    try {
        const user_id = req.user_id;
        const { _id } = req.body;
        const result = await UserService.profileRemoveService(_id, user_id);
        return res.status(200).json(
            {
                success: true,
                message: "profile picture removed successful",

            }
        );

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.LicenceUpload = async (req, res) => {
    try {
        const user_id = req.user_id;
        const image = req.file.location;
        const { driving_licence_number } = req.body;
        const result = await UserService.drivingLicenceUpload(user_id, image, driving_licence_number);
        return res.status(200).json(
            {
                success: true,
                message: "driving licence uploaded successful",

            }
        );

    } catch (error) {

    }
}
exports.aadharUpload = async (req, res) => {
    try {
        const user_id = req.user_id;
        const image = req.file.location;
        const { aadhar_card_number } = req.body;
        const result = await UserService.aadharUpload(user_id, image, aadhar_card_number);
        return res.status(200).json(
            {
                success: true,
                message: "aadhar card uploaded successful",

            }
        );
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
}
exports.panUpload = async (req, res) => {
    try {
        const user_id = req.user_id;
        const image = req.file.location;
        const { pan_number } = req.body;
        console.log("data", user_id, image, pan_number);

        const result = await UserService.panUpload(user_id, image, pan_number);
        return res.status(200).json(
            {
                success: true,
                message: "pan card uploaded successful",

            }
        );
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
}


exports.panDelete = async (req, res) => {
    try {
        const user_id = req.user_id;
        const { image, pan_number } = req.body;
        const result = await UserService.panDelete(user_id, image, pan_number);
        return res.status(200).json(
            {
                success: true,
                message: "pan card deleted successful",

            }
        );
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
}


exports.aadharDelete = async (req, res) => {
    try {
        const user_id = req.user_id;
        const { image, aadhar_card_number } = req.body;
        const result = await UserService.aadharDelete(user_id, image, aadhar_card_number);
        return res.status(200).json(
            {
                success: true,
                message: "aadhar card deleted successful",

            }
        );
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
}


exports.licenceDelete = async (req, res) => {
    try {
        const user_id = req.user_id;
        const { image, driving_licence_number } = req.body;
        const result = await UserService.licenceDelete(user_id, image, driving_licence_number);
        return res.status(200).json(
            {
                success: true,
                message: "licence deleted successful",

            }
        );
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
}

exports.deleteImage = async (req, res) => {

    try {
        const id = req.clientId;
        const { _id, image } = req.body;
        console.log("id", id, "_id", _id, "image", image);
        const result = await ProductService.deleteImageService(_id, id, image);
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

exports.wishlistAdd = async (req, res) => {

    try {
        const user_id = req.user_id;
        const { product_id } = req.body;
        const result = await UserService.wishlistAddService(user_id, product_id);
        return res.status(200).json(
            {
                success: true,
                message: "wishlist added successful",

            }
        );

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.wishlistRemove = async (req, res) => {

    try {
        const user_id = req.user_id;
        const { product_id } = req.body;
        const result = await UserService.wishlistRemoveService(user_id, product_id);
        return res.status(200).json(
            {
                success: true,
                message: "wishlist removed successful",

            }
        );

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};