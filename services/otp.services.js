const Product_ = require("../models/product");
const adminUser_ = require("../models/adminUser");


exports.addProductService = async (
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
) => {




    const result = await Product_.create({
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

    });

    return {

        result

    };
};


exports.updateProductService = async (_id, id, product_type, product_id, name, category, sizes, description, color_theme, occasion, set_included, purchase_price, actual_mrp, stock, status, design_by) => {


    try {
        console.log("id", _id, id)
        const result = await Product_.findOneAndUpdate(
            {
                _id: _id,
                // Use this only if your schema has user_id
            },
            {
                $set: {
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
                    design_by
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


exports.deleteProductService = async (_id, id) => {


    try {

        const result = await Product_.findOneAndDelete({ _id, id });

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

exports.listProductService = async () => {


    try {

        const result = await Product_.find();

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

exports.fetchProductService = async (_id, id) => {


    try {

        const result = await Product_.findOne({ _id, id });

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

exports.uploadImagesService = async (_id, id, images) => {


    try {

        const result = await Product_.findOneAndUpdate({ _id, id }, { $push: { images: images } }, { new: true });

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

exports.uploadVideoService = async (_id, id, video) => {
    try {
        console.log("Service id:", id);
        console.log("Service _id:", _id);
        console.log("Service video:", video);

        const result = await Product_.findOneAndUpdate(
            {
                _id: _id,
                id: id
            },
            {
                $push: {
                    video_url: video
                }
            },
        )

        return {
            success: true,
            message: "Video uploaded successfully",
            data: result
        };

    } catch (error) {
        console.error("uploadVideoService error:", error);
        throw error;
    }
};


exports.deleteImageService = async (_id, id, image) => {


    try {

        console.log("service _id", _id);
        console.log("service id", id);
        console.log("service image", image);
        const result = await Product_.findOneAndUpdate({ _id: _id }, { $pull: { images: image } }, { new: true });

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

exports.deleteVideoService = async (_id, id, video) => {


    try {
        console.log("service _id", _id);
        console.log("service id", id);
        console.log("service video", video);
        const result = await Product_.findOneAndUpdate({ _id: _id }, { $pull: { video_url: video } }, { new: true });

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

exports.approveProductService = async (
    role,
    _id,
    id,
    product_status
) => {
    try {
        console.log("Service id:", id);
        console.log("Service _id:", _id);
        console.log("Service role:", role);
        console.log("Service product_status:", product_status);


        // 2. Check admin user
        const checkRole = await adminUser_.find({ _id: id, role: role });



        // 3. Check authorization
        if (checkRole.length === 0) {
            throw new Error("You are not authorized to approve this product");
        }

        // 4. Update product status
        const result = await Product_.findOneAndUpdate(
            { _id: _id },
            {
                $set: {
                    product_status: product_status
                }
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        // 5. Check product exists
        if (!result) {
            throw new Error("Product not found");
        }

        // 6. Return result
        return {
            success: true,
            message: "Product status updated successfully",
            data: result
        };

    } catch (error) {
        console.error("approveProductService error:", error);
        throw error;
    }
};


exports.changeStatusService = async (_id, id, status) => {
    try {
        console.log("Service id:", id);
        console.log("Service _id:", _id);
        console.log("Service status:", status);

        const result = await Product_.findOneAndUpdate(
            {
                _id: _id,

            },
            {
                $set: {
                    status: status
                }
            },
        )

        return {
            success: true,
            message: "status changed successfully",
            data: result
        };

    } catch (error) {
        console.error("changeStatusService error:", error);
        throw error;
    }
};