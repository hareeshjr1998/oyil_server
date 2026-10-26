
const express = require("express");
const router = express.Router();

const adminUser_ = require("../models/adminUser");
const User_ = require("../models/user");
const otp_ = require("../models/otp");
const Mail = require("../controllers/mail.controller");
const otpController = require("../controllers/otp.controller")



// Registration email OTP
router.post(
    "/registration/otp",
    otpController.sendRegistrationOtp
);

// Verify registration email OTP
router.post(
    "/verify",
    otpController.verifyRegistrationOtp
);

// Send forgot-password OTP
router.post(
    "/forgot/password/otp",
    otpController.sendForgotPasswordOtp
);

// Verify forgot-password OTP
router.post(
    "/forgot/password/verify",
    otpController.verifyForgotPasswordOtp
);


router.post(
    "/forgot/password/reset",
    otpController.resetForgotPassword
);



// router.post("/registration/otp", async (req, res, next) => {
//     try {
//         const { to } = req.body;

//         // 1. Validate email
//         if (!to || typeof to !== "string") {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email is required"
//             });
//         }

//         const email = to.trim().toLowerCase();

//         // 2. Check whether email already exists
//         const verify_email = await User_.findOne({ email });

//         if (verify_email) {
//             return res.status(409).json({
//                 success: false,
//                 message: "Email already exists"
//             });
//         }

//         // 3. Generate 4-digit OTP
//         const otp_code = Math.floor(
//             1000 + Math.random() * 9000
//         ).toString();

//         // 4. Set OTP expiry to 5 minutes
//         const expires_at = new Date(Date.now() + 5 * 60 * 1000);

//         // 5. Remove previous pending OTPs for this email
//         await otp_.updateMany(
//             {
//                 email,
//                 status: "HOLD"
//             },
//             {
//                 $set: { status: "EXPIRED" }
//             }
//         );

//         // 6. Save OTP in MongoDB
//         const otpResult = await otp_.create({
//             email,
//             otp_code,
//             status: "HOLD",
//             expires_at
//         });

//         try {
//             // 7. Prepare email
//             const mailOptions = {
//                 from: process.env.SERVICE_MAIL,
//                 to: email,
//                 subject: "Verify Your Email - Oyil Shop",
//                 html: `
//                     <!DOCTYPE html>
//                     <html lang="en">
//                     <head>
//                         <meta charset="UTF-8">
//                         <meta name="viewport"
//                               content="width=device-width, initial-scale=1.0">
//                         <title>Oyil Shop Email Verification</title>
//                     </head>
//                     <body style="
//                         margin:0;
//                         padding:30px 10px;
//                         font-family:Arial,Helvetica,sans-serif;
//                         background-color:#f4f4f4;
//                         color:#333;
//                     ">
//                         <div style="
//                             max-width:500px;
//                             margin:0 auto;
//                             background:#ffffff;
//                             border-radius:12px;
//                             overflow:hidden;
//                             text-align:center;
//                         ">
//                             <div style="
//                                 background:#f8d94e;
//                                 padding:25px;
//                             ">
//                                 <h1 style="margin:0;">Oyil Shop</h1>
//                                 <p>Your Style, Your Beauty, Your Confidence</p>
//                             </div>

//                             <div style="padding:30px 20px;">
//                                 <h2>Email Verification</h2>

//                                 <p>
//                                     Thank you for choosing
//                                     <strong>Oyil Shop</strong>.
//                                     Use the OTP below to verify your email.
//                                 </p>

//                                 <div style="
//                                     display:inline-block;
//                                     padding:15px 25px;
//                                     margin:15px 0;
//                                     background:#fff7d1;
//                                     border:1px dashed #e0bd32;
//                                     border-radius:8px;
//                                     font-size:32px;
//                                     font-weight:bold;
//                                     letter-spacing:8px;
//                                 ">${otp_code}</div>

//                                 <p>
//                                     This OTP is valid for
//                                     <strong>5 minutes</strong>.
//                                 </p>

//                                 <p style="font-size:13px;color:#777;">
//                                     Never share this code with anyone.
//                                     If you did not request it, ignore this email.
//                                 </p>

//                                 <p>Thank you for being part of Oyil Shop!</p>
//                             </div>

//                             <div style="
//                                 padding:20px;
//                                 background:#fafafa;
//                                 font-size:12px;
//                                 color:#888;
//                             ">
//                                 Oyil Shop Support Team
//                             </div>
//                         </div>
//                     </body>
//                     </html>
//                 `
//             };

//             // 8. Send email
//             const mail = new Mail();
//             await mail.send(mailOptions);

//         } catch (mailError) {
//             // Remove OTP if email delivery fails
//             await otp_.findByIdAndDelete(otpResult._id);
//             throw mailError;
//         }

//         // 9. Send API response
//         return res.status(200).json({
//             success: true,
//             message: "OTP sent successfully to your email",
//             data: {
//                 email,
//                 expires_at
//             }
//         });

//     } catch (error) {
//         next(error);
//     }
// });





// router.post('/verify', async (req, res, next) => {
//     const { email, otp_code } = req.body

//     try {
//         const verify_otp = await otpController.verifyOtp({
//             email,
//             otp: otp_code,
//             status: 'PENDING',
//         })

//         if (!verify_otp) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid OTP or OTP already verified',
//             })
//         }

//         res
//             .status(200)
//             .json({ success: true, message: 'OTP verified successfully' })
//     } catch (error) {
//         // console.error('Error verifying OTP:', error);
//         // res.status(500).json({ success: false, message: 'Error verifying OTP' });
//         next(error)
//     }
// })



// router.post('/forgot/password', async (req, res, next) => {
//     const { email, otp_code } = req.body

//     try {
//         const verify_otp = await otp_.verify({
//             email,
//             otp: otp_code,
//             status: 'PENDING',
//         })

//         if (!verify_otp) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid OTP or OTP already verified',
//             })
//         }

//         res
//             .status(200)
//             .json({ success: true, message: 'OTP verified successfully' })
//     } catch (error) {
//         // console.error('Error verifying OTP:', error);
//         // res.status(500).json({ success: false, message: 'Error verifying OTP' });
//         next(error)
//     }
// })


// router.post('/forgot/password/user', async (req, res, next) => {
//     const { email, otp_code } = req.body

//     try {
//         const verify_otp = await otp.verify({
//             email,
//             otp: otp_code,
//             status: 'PENDING',
//         })

//         if (!verify_otp) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid OTP or OTP already verified',
//             })
//         }

//         res
//             .status(200)
//             .json({ success: true, message: 'OTP verified successfully' })
//     } catch (error) {
//         // console.error('Error verifying OTP:', error);
//         // res.status(500).json({ success: false, message: 'Error verifying OTP' });
//         next(error)
//     }
// })
module.exports = router;