const AddtoCart_ = require("../models/addTocart");



exports.addToCartService = async (
    product_id,
    user_id,
    quantity,

) => {

    const result = await AddtoCart_.create({
        product_id,
        user_id,
        quantity,
        status: true


    });

    return {

        result

    };
};


exports.update = async (_id, user_id, product_id, quantity, status) => {


    try {
        console.log("id", _id, user_id)
        const result = await AddtoCart_.findOneAndUpdate(
            {
                _id: _id,
                product_id: product_id,
                user_id: user_id,

            },
            {
                $set: {

                    status: status,
                    quantity: quantity

                }
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        console.log("result", result);


        return {
            success: true,
            message: "update successful",
            data: result

        };

    } catch (error) {
        console.error("loginAdminService error:", error);

        throw error;
    }
};


exports.delete = async (_id) => {


    try {

        const result = await AddtoCart_.deleteOne({ _id: _id });

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

        const result = await AddtoCart_.find({ user_id });

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

exports.fetch = async (_id, product_id, user_id) => {


    try {

        const result = await AddtoCart_.findOne({ _id: _id, product_id: product_id, user_id: user_id });

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


