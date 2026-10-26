const User_ = require("../models/user.js");

const { generateAgentToken, generateClientToken } = require("../middleware/Authentication.js")

const { hashPassword, comparePassword } = require("../middleware/password.js");




exports.registerUserService = async (
    name,
    email,
    password
) => {

    const existingUser = await User_.findOne({
        email
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword =
        await hashPassword(password);

    const user = await User_.create({
        name,
        email,
        password: hashedPassword,
        role: "user",
        is_verified: true
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};



exports.loginUserService = async (email, password) => {
    try {
        const login_user = await User_.findOne({
            email: email
        });

        if (!login_user) {
            return {
                success: false,
                message: "Invalid credentials",
                data: {},
            };
        }

        const isPasswordValid = await comparePassword(
            password,
            login_user.password
        );

        if (!isPasswordValid) {
            return {
                success: false,
                message: "Invalid credentials",
                data: {},
            };
        }

        if (!login_user.is_verified) {
            return {
                success: false,
                message: "Please verify your account before logging in",
                data: {},
            };
        }

        // Select only the required data
        const dataToSent = {
            _id: login_user._id,
            email: login_user.email,
            name: login_user.name,
        };

        // Generate token
        const token = generateAgentToken(dataToSent);


        return {
            success: true,
            message: "Login successful",
            data: token

        };
    } catch (error) {
        console.error("loginUserService error:", error);
        throw error;
    }
};



exports.addUserService = async (user_id,
    alternate_phone_number,
    address
) => {




    const result = await User_.findOneAndUpdate({
        _id: user_id,
    }, {
        $set: {
            alternate_phone_number,
            address
        }

    });

    return {

        result

    };
};



exports.deleteUserService = async (_id, user_id) => {


    try {

        const result = await User_.findOneAndDelete({ _id, user_id });

        console.log("result", result);


        return {
            success: true,
            message: "delete successful",
            data: result

        };

    } catch (error) {
        console.error("loginAdminService error:", error);

        throw error;
    }
};

exports.list = async (user_id) => {


    try {

        const result = await User_.find({ _id: user_id });

        console.log("result", result);


        return {
            success: true,
            message: "get all successful",
            data: result

        };

    } catch (error) {
        console.error("loginAdminService error:", error);

        throw error;
    }
};

exports.fetch = async (user_id, _id) => {


    try {

        const result = await User_.findOne({ user_id, _id });

        console.log("result", result);


        return {
            success: true,
            message: "fetch successful",
            data: result

        };

    } catch (error) {
        console.error("loginAdminService error:", error);

        throw error;
    }
};

exports.profileUploadService = async (_id, user_id, image) => {


    try {

        const result = await User_.findOneAndUpdate({ _id, user_id }, { $set: { profile_image: image } }, { new: true });

        console.log("result", result);


        return {
            success: true,
            message: "upload successful",
            data: result

        };

    } catch (error) {
        console.error("loginAdminService error:", error);

        throw error;
    }
};

exports.profileRemoveService = async (_id, user_id) => {


    try {
        const result = await User_.findOneAndUpdate({ _id, user_id }, { $set: { profile_image: null } }, { new: true })
        return {
            success: true,
            message: "remove successful",
            data: result
        }
    } catch (error) {
        console.error("profileRemoveService error:", error);
        throw error;
    }
}

exports.drivingLicenceUpload = async (user_id, image, driving_licence_number) => {
    try {
        const result = await User_.findOneAndUpdate({
            _id: user_id
        }, {
            $set: {

                "proofs.driving_licence_image": image,
                "proofs.driving_licence_number": driving_licence_number

            }
        }, {
            new: true
        })
        return {
            success: true,
            message: "driving licence uploaded successful",
            data: result
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}
exports.aadharUpload = async (user_id, image, aadhar_card_number) => {
    try {
        const result = await User_.findOneAndUpdate({
            _id: user_id
        }, {
            $set: {

                "proofs.aadhar_card_image": image,
                "proofs.aadhar_card_number": aadhar_card_number

            }
        }, {
            new: true
        })
        return {
            success: true,
            message: "aadhar card uploaded successful",
            data: result
        }

    } catch (error) {

    }
}
exports.panUpload = async (user_id, image, pan_number) => {
    try {
        console.log("user_id", user_id);
        console.log("image", image);
        console.log("pan_number", pan_number);

        const result = await User_.findOneAndUpdate({
            _id: user_id
        }, {
            $set: {

                "proofs.pan_image": image,
                "proofs.pan_number": pan_number
            }

        }, {
            new: true
        })
        return {
            success: true,
            message: "pan card uploaded successful",
            data: result
        }
    } catch (error) {

    }
}
exports.licenceDelete = async (user_id, image, driving_licence_number) => {
    try {
        const result = await User_.findOneAndUpdate({
            _id: user_id
        }, {
            $set: {

                "proofs.driving_licence_image": null,
                "proofs.driving_licence_number": null
            }
        }, {
            new: true
        })
        return {
            success: true,
            message: "licence deleted successful",
            data: result
        }
    } catch (error) {

    }
}

exports.aadharDelete = async (user_id, image, aadhar_card_number) => {
    try {
        const result = await User_.findOneAndUpdate({
            _id: user_id
        }, {
            $set: {

                "proofs.aadhar_card_image": null,
                "proofs.aadhar_card_number": null
            }
        }, {
            new: true
        })
        return {
            success: true,
            message: "aadhar card deleted successful",
            data: result
        }
    } catch (error) {

    }
}
exports.panDelete = async (user_id, image, pan_number) => {
    try {
        const result = await User_.findOneAndUpdate({
            _id: user_id
        }, {
            $set: {

                "proofs.pan_image": null,
                "proofs.pan_number": null
            }
        }, {
            new: true
        })
        return {
            success: true,
            message: "pan card deleted successful",
            data: result
        }
    } catch (error) {

    }
}

exports.wishlistAddService = async (user_id, product_id) => {
    try {
        const result = await User_.findOneAndUpdate({
            _id: user_id
        }, {
            $addToSet: {
                wishlist: {
                    product_id: product_id,
                    status: true
                }
            }
        }, {
            new: true
        })
        return {
            success: true,
            message: "wishlist added successful",
            data: result
        }
    } catch (error) {

    }
}

exports.wishlistRemoveService = async (user_id, product_id) => {
    try {
        console.log("user_id:", user_id);
        console.log("product_id:", product_id);

        const result = await User_.findOneAndUpdate(
            {
                _id: user_id,
                "wishlist.product_id": product_id
            },
            {
                $pull: {
                    wishlist: {
                        product_id: product_id
                    }
                }
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!result) {
            return {
                success: false,
                message: "User or wishlist product not found",
                data: {}
            };
        }

        return {
            success: true,
            message: "Wishlist removed successfully",
            data: result
        };

    } catch (error) {
        console.error("wishlistRemoveService error:", error);
        throw error;
    }
};
