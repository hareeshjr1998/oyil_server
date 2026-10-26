const express = require("express");

const RazorpayController = require("../controllers/razorpay.controller");

const router = express.Router();

router.post("/create", RazorpayController.create);

router.post("/list", RazorpayController.list);

router.post("/fetch", RazorpayController.fetch);

router.post("/delete", RazorpayController.delete)

router.post("/generatepaymentlink", RazorpayController.generatePaymentLink)

module.exports = router;