const AdminService = require("../services/admin.services");


exports.registerAdmin = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        const result = await AdminService.registerAdminService(
            name,
            email,
            password
        );

        return res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            data: result
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


exports.loginAdmin = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;
        console.log("req", req.body)
        const result = await AdminService.loginAdminService(
            email,
            password
        );

        return res.status(200).json(result);

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};