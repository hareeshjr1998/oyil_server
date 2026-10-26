const adminUser_ = require("../models/adminUser.js");
const { generateAgentToken, generateClientToken } = require("../middleware/Authentication.js")

const {
    hashPassword,
    comparePassword,
} = require("../middleware/password.js");


exports.registerAdminService = async (
    name,
    email,
    password
) => {

    const existingAdmin = await adminUser_.findOne({
        email
    });

    if (existingAdmin) {
        throw new Error("Admin already exists");
    }

    const hashedPassword =
        await hashPassword(password);

    const admin = await adminUser_.create({
        name,
        email,
        password: hashedPassword,
        role: "admin"
    });

    return {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
    };
};
exports.loginAdminService = async (email, password) => {
    console.log("email:", email);

    try {
        // =====================================================
        // 1. FIND ADMIN
        // =====================================================
        const login_client = await adminUser_.findOne({ email });

        console.log("login_client:", login_client);

        if (!login_client) {
            return {
                success: false,
                message: "Invalid credentials",
                data: {}
            };
        }

        // =====================================================
        // 2. CHECK ROLE
        // =====================================================
        if (
            login_client.role !== "super_admin" &&
            login_client.role !== "admin"
        ) {
            return {
                success: false,
                message: "Invalid role",
                data: {}
            };
        }

        // =====================================================
        // 3. COMPARE PASSWORD
        // =====================================================
        const isPasswordValid = await comparePassword(
            password,
            login_client.password
        );

        console.log("isPasswordValid:", isPasswordValid);

        if (!isPasswordValid) {
            return {
                success: false,
                message: "Invalid credentials",
                data: {}
            };
        }

        // =====================================================
        // 4. GENERATE TOKEN
        // =====================================================
        const token = generateClientToken(login_client);

        // =====================================================
        // 5. RETURN RESPONSE
        // =====================================================
        return {
            success: true,
            message: "Login successful",
            data: {
                token,
                role: login_client.role
            }

        };

    } catch (error) {
        console.error("loginAdminService error:", error);

        throw error;
    }
};