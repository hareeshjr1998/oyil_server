
const { randomInt } = require("crypto");
const bcrypt = require("bcrypt");


const User_ = require("../models/user");
const Otp_ = require("../models/otp");
const Mail = require("./mail.controller");

// Generate a secure 4-digit OTP
const generateOtpCode = () => {
    return randomInt(1000, 10000).toString();
};

// Normalize email
const normalizeEmail = (email) => {
    return email.trim().toLowerCase();
};

// Save a new OTP and expire older OTPs of the same purpose
const saveOtp = async (email, purpose) => {
    await Otp_.updateMany(
        {
            email,
            purpose,
            status: "HOLD"
        },
        {
            $set: { status: "EXPIRED" }
        }
    );

    const otp_code = generateOtpCode();

    const result = await Otp_.create({
        email,
        otp_code,
        purpose,
        status: "HOLD",
        expires_at: new Date(Date.now() + 5 * 60 * 1000)
    });

    return { result, otp_code };
};

// Send OTP email
const sendOtpEmail = async (email, otp_code, purpose) => {
    const isRegistration = purpose === "REGISTRATION";

    const mailOptions = {
        from: process.env.SERVICE_MAIL,
        to: email,
        subject: isRegistration
            ? "Verify Your Email - Oyil Shop"
            : "Reset Your Password - Oyil Shop",

        html: `
            <!DOCTYPE html>
            <html lang="en">
            <body style="
                margin:0;
                padding:30px 10px;
                font-family:Arial,Helvetica,sans-serif;
                background:#f4f4f4;
                color:#333;
            ">
                <div style="
                    max-width:500px;
                    margin:auto;
                    background:#fff;
                    border-radius:12px;
                    overflow:hidden;
                    text-align:center;
                ">
                    <div style="background:#f8d94e;padding:25px;">
                        <h1 style="margin:0;">Oyil Shop</h1>
                        <p>Your Style, Your Beauty, Your Confidence</p>
                    </div>

                    <div style="padding:30px 20px;">
                        <h2>
                            ${isRegistration
                ? "Email Verification"
                : "Password Reset"}
                        </h2>

                        <p>
                            Use the OTP below to
                            ${isRegistration
                ? "verify your email address"
                : "continue resetting your password"}.
                        </p>

                        <div style="
                            display:inline-block;
                            padding:15px 25px;
                            margin:15px 0;
                            background:#fff7d1;
                            border:1px dashed #e0bd32;
                            border-radius:8px;
                            font-size:32px;
                            font-weight:bold;
                            letter-spacing:8px;
                        ">${otp_code}</div>

                        <p>This OTP expires in <strong>5 minutes</strong>.</p>

                        <p style="font-size:13px;color:#777;">
                            Never share this code with anyone.
                            If you did not request it, ignore this email.
                        </p>
                    </div>

                    <div style="
                        padding:20px;
                        background:#fafafa;
                        font-size:12px;
                        color:#888;
                    ">
                        Oyil Shop Support Team
                    </div>
                </div>
            </body>
            </html>
        `
    };

    const mail = new Mail();
    await mail.send(mailOptions);
};

// Common input validation
const validateEmail = (email) => {
    return (
        typeof email === "string" &&
        email.trim().length > 0 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    );
};

const validateOtpInput = (email, otp_code) => {
    return (
        validateEmail(email) &&
        /^\d{4}$/.test(String(otp_code || ""))
    );
};

// ========================================
// 1. SEND REGISTRATION OTP
// ========================================
exports.sendRegistrationOtp = async (req, res, next) => {
    let savedOtpId;

    try {
        const { to } = req.body;

        if (!validateEmail(to)) {
            return res.status(400).json({
                success: false,
                message: "A valid email is required"
            });
        }

        const email = normalizeEmail(to);

        const existingUser = await User_.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        const { result, otp_code } = await saveOtp(
            email,
            "REGISTRATION"
        );

        savedOtpId = result._id;

        try {
            await sendOtpEmail(
                email,
                otp_code,
                "REGISTRATION"
            );
        } catch (mailError) {
            await Otp_.findByIdAndDelete(savedOtpId);
            savedOtpId = null;
            throw mailError;
        }

        return res.status(200).json({
            success: true,
            message: "Registration OTP sent successfully",
            data: {
                email,
                expires_at: result.expires_at
            }
        });
    } catch (error) {
        return next(error);
    }
};

// ========================================
// 2. VERIFY REGISTRATION OTP
// ========================================
exports.verifyRegistrationOtp = async (req, res, next) => {
    try {
        const { email: inputEmail, otp_code } = req.body;

        if (!validateOtpInput(inputEmail, otp_code)) {
            return res.status(400).json({
                success: false,
                message: "Valid email and 4-digit OTP are required"
            });
        }

        const email = normalizeEmail(inputEmail);

        // Do not allow OTP verification if account already exists
        const existingUser = await User_.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        const verifiedOtp = await Otp_.findOneAndUpdate(
            {
                email,
                otp_code: String(otp_code),
                purpose: "REGISTRATION",
                status: "HOLD",
                expires_at: { $gt: new Date() }
            },
            {
                $set: { status: "VERIFIED" }
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!verifiedOtp) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });
    } catch (error) {
        return next(error);
    }
};

// ========================================
// 3. SEND FORGOT-PASSWORD OTP
// ========================================
exports.sendForgotPasswordOtp = async (req, res, next) => {
    try {
        const { email: inputEmail } = req.body;

        if (!validateEmail(inputEmail)) {
            return res.status(400).json({
                success: false,
                message: "A valid email is required"
            });
        }

        const email = normalizeEmail(inputEmail);

        const existingUser = await User_.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "No account found with this email"
            });
        }

        const { result, otp_code } = await saveOtp(
            email,
            "FORGOT_PASSWORD"
        );

        try {
            await sendOtpEmail(
                email,
                otp_code,
                "FORGOT_PASSWORD"
            );
        } catch (mailError) {
            await Otp_.findByIdAndDelete(result._id);
            throw mailError;
        }

        return res.status(200).json({
            success: true,
            message: "Password reset OTP sent successfully",
            data: {
                email,
                expires_at: result.expires_at
            }
        });
    } catch (error) {
        return next(error);
    }
};

// ========================================
// 4. VERIFY FORGOT-PASSWORD OTP
// ========================================
exports.verifyForgotPasswordOtp = async (req, res, next) => {
    try {
        const { email: inputEmail, otp_code } = req.body;

        if (!validateOtpInput(inputEmail, otp_code)) {
            return res.status(400).json({
                success: false,
                message: "Valid email and 4-digit OTP are required"
            });
        }

        const email = normalizeEmail(inputEmail);

        const existingUser = await User_.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const verifiedOtp = await Otp_.findOneAndUpdate(
            {
                email,
                otp_code: String(otp_code),
                purpose: "FORGOT_PASSWORD",
                status: "HOLD",
                expires_at: { $gt: new Date() }
            },
            {
                $set: { status: "VERIFIED" }
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!verifiedOtp) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully. You can proceed to reset your password."
        });
    } catch (error) {
        return next(error);
    }
};


// ========================================
// 5. RESET FORGOTTEN PASSWORD
// ========================================
exports.resetForgotPassword = async (req, res, next) => {
    try {
        const {
            email: inputEmail,
            new_password,
            confirm_password
        } = req.body;

        // 1. Validate inputs
        if (
            !validateEmail(inputEmail) ||
            typeof new_password !== "string" ||
            typeof confirm_password !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Email and both password fields are required"
            });
        }

        if (new_password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least 8 characters"
            });
        }

        if (new_password !== confirm_password) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const email = normalizeEmail(inputEmail);

        // 2. Confirm user exists
        const user = await User_.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // 3. Consume the most recent verified, unexpired OTP.
        // This prevents reusing the same OTP after a successful reset.
        const verifiedOtp = await Otp_.findOneAndUpdate(
            {
                email,
                purpose: "FORGOT_PASSWORD",
                status: "VERIFIED",
                expires_at: { $gt: new Date() }
            },
            {
                $set: { status: "EXPIRED" }
            },
            {
                sort: { createdAt: -1 },
                returnDocument: "before"
            }
        );

        if (!verifiedOtp) {
            return res.status(400).json({
                success: false,
                message: "Please verify a valid forgot-password OTP first"
            });
        }

        // 4. Hash the new password
        const hashedPassword = await bcrypt.hash(new_password, 12);

        // 5. Update the password in MongoDB
        await User_.updateOne(
            { _id: user._id },
            { $set: { password: hashedPassword } }
        );

        return res.status(200).json({
            success: true,
            message: "Password reset successfully. Please log in with your new password."
        });
    } catch (error) {
        return next(error);
    }
};
