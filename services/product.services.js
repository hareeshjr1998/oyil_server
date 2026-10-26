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


exports.deleteProductService = async (_id) => {


    try {

        const result = await Product_.deleteOne({ _id: _id });

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




exports.getProducts = async (body) => {
    const { page, limit } = body;

    const pageNumber = Math.max(1, Number(page) || 1);
    const pageLimit = Math.max(1, Number(limit) || 10);
    const skip = (pageNumber - 1) * pageLimit;

    const result = await Product_.aggregate([
        {
            $facet: {
                products: [
                    { $sort: { createdAt: -1, _id: -1 } },
                    { $skip: skip },
                    { $limit: pageLimit }
                ],
                totalCount: [
                    { $count: "total" }
                ]
            }
        }
    ]);

    const products = result[0]?.products || [];
    const totalProducts = result[0]?.totalCount[0]?.total || 0;

    return {
        products,
        pagination: {
            currentPage: pageNumber,
            limit: pageLimit,
            totalProducts,
            totalPages: Math.ceil(totalProducts / pageLimit)
        }
    };
};

exports.uploadImagesService = async (_id, images) => {


    try {

        const result = await Product_.findOneAndUpdate({ _id: _id }, { $push: { images: images } }, { new: true });

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

exports.uploadVideoService = async (_id, video) => {
    try {

        console.log("Service _id:", _id);
        console.log("Service video:", video);

        const result = await Product_.findOneAndUpdate(
            {
                _id: _id
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


exports.deleteImageService = async (_id, image) => {


    try {

        console.log("service _id", _id);

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

exports.deleteVideoService = async (_id, video) => {


    try {
        console.log("service _id", _id);
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

exports.viewCountService = async (_id) => {

    try {

        console.log("Service _id:", _id);

        const result = await Product_.findOneAndUpdate({ _id }, { $inc: { views: 1 } }, { new: true });



        return {
            success: true,
            message: "view count increased successful",
            data: result

        };

    } catch (error) {
        console.error("viewCountService error:", error);
        throw error;
    }
};