const axios = require('axios')

const Product_ = require("../models/product");
const Data_ = require("../models/data");
const Transaction_ = require("../models/transaction");


const { rupeesToPaisa } = require('../middleware/paise')
const {
    calculateFixedDiscount,
    calculatePercentageDiscount,
} = require('../middleware/discount')

exports.createService = async (
    data,
) => {
    console.log("data", data);
    // const result = await Transaction_.create({
    //     data,

    // });
    return {

        result

    };
};



exports.listService = async () => {


    try {
        const result = await Transaction_.find({});

        console.log("result", result);


        return result


    } catch (error) {
        console.error("loginAdminService error:", error);

        throw error;
    }
};


exports.deleteService = async (_id) => {


    try {

        const result = await Transaction_.deleteOne({ _id: _id });

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

exports.fetchService = async (_id) => {


    try {

        const result = await Transaction_.findOne({ _id });

        console.log("result", result);


        return result

    } catch (error) {
        console.error("loginAdminService error:", error);

        throw error;
    }
};



exports.generatePaymentLinkService = async (req) => {
    try {
        const requestData = req.body?.data;

        if (!requestData?.plan_code) {
            throw new Error("plan_code is required");
        }

        // 1. Fetch plan
        const fetch_plan = await plan.fetch({
            code: requestData.plan_code,
        });

        if (!fetch_plan) {
            throw new Error("Plan not found");
        }

        let amount = Number(fetch_plan.price);
        const gst = Number(fetch_plan.gst || 0);

        if (!Number.isFinite(amount) || amount <= 0) {
            throw new Error("Invalid plan price");
        }

        if (!Number.isFinite(gst) || gst < 0) {
            throw new Error("Invalid GST value");
        }

        const currency = "INR";
        const description = "Subscription Payment";

        const is_discount = requestData.is_discount === true;

        let discount_mode;
        let discount_code;
        let discount_type;
        let discount_value;

        // 2. Apply coupon / promo
        if (is_discount) {
            discount_mode = requestData.discount_mode;
            discount_code = requestData.discount_code;

            if (!discount_code) {
                throw new Error("Discount code is required");
            }

            let discount;

            if (discount_mode === "COUPON") {
                discount = await coupon.fetch({
                    code: discount_code,
                });

                if (!discount || discount.status !== "HOLD") {
                    throw new Error("Coupon is not available");
                }
            } else if (discount_mode === "PROMO") {
                discount = await promo.fetch({
                    code: discount_code,
                });

                if (!discount) {
                    throw new Error("Promo code not found");
                }
            } else {
                throw new Error("Invalid discount mode");
            }

            discount_type = discount.discount_type;
            discount_value = discount.discount_value;

            if (discount_type === "fixed_amount") {
                const result = calculateFixedDiscount(discount, amount);
                amount = Number(result.total_amount);
            } else if (discount_type === "percentage") {
                const result = calculatePercentageDiscount(
                    Number(discount.discount_value),
                    amount
                );

                amount = Number(result.total_amount);
            } else {
                throw new Error("Invalid discount type");
            }

            if (!Number.isFinite(amount) || amount < 0) {
                throw new Error("Invalid discounted amount");
            }
        }

        // 3. Add GST after discount
        const totalAmount = Number(
            this.calculate_gst(gst, amount)
        );

        if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
            throw new Error("Invalid final payment amount");
        }

        // 4. Notes for Razorpay (maximum 15 key-value pairs)
        const data = {
            plan_code: String(fetch_plan.code || ""),
            plan_name: String(fetch_plan.name || ""),
            plan_id: String(fetch_plan._id || ""),
            event: "indcharge_subscription",
            is_discount: String(is_discount),
            discount_mode: String(discount_mode || ""),
            discount_code: String(discount_code || ""),
            discount_type: String(discount_type || ""),
            discount_value: String(discount_value ?? ""),
            gst: String(gst),
        };

        // 5. Generate payment link
        return await this.generateRazorPayLink({
            req,
            amount: totalAmount,
            currency,
            description,
            data,
        });
    } catch (error) {
        console.error(
            "GENERATE PAYMENT LINK ERROR:",
            error.message
        );

        throw error;
    }
};

exports.calculate_gst = function (gst, amount) {
    return Number(
        (Number(amount) * (1 + Number(gst) / 100)).toFixed(2)
    );
};

exports.generateRazorPayLink = async ({
    req,
    amount,
    currency,
    description,
    data,
}) => {
    try {
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret) {
            throw new Error("Razorpay credentials are missing");
        }

        const amount_in_paise = Math.round(Number(amount) * 100);

        if (!Number.isSafeInteger(amount_in_paise) || amount_in_paise <= 0) {
            throw new Error("Invalid amount in paise");
        }

        const response = await axios.post(
            "https://api.razorpay.com/v1/payment_links",
            {
                upi_link: true,
                accept_partial: false,
                amount: amount_in_paise,
                currency,
                description,
                notes: data,
            },
            {
                auth: {
                    username: keyId,
                    password: keySecret,
                },
                timeout: 15000,
            }
        );

        return {
            success: true,
            message: "Payment link generated successfully",
            data: {
                payment_link_id: response.data.id,
                payment_link: response.data.short_url,
                amount: response.data.amount,
                currency: response.data.currency,
                status: response.data.status,
            },
        };
    } catch (error) {
        console.error(
            "RAZORPAY ERROR:",
            error.response?.data || error.message
        );

        throw new Error("Unable to generate Razorpay payment link");
    }
};
