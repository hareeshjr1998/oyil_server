const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
require("dotenv").config();


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "50mb"
}));



// Root
app.get("/", (req, res) => {
    res.send("OYIL SERVER RUNNING ✅");
});

//initialize all routers
const adminRouter = require("./routers/admin.js");
const productRouter = require("./routers/product.js");
const userRouter = require("./routers/user.js");
const mailRouter = require("./routers/mail.js");
const addtocartRouter = require("./routers/addtocart.js");
const razorpayRouter = require("./routers/razorpay.js");
//Routers
app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/mail", mailRouter);
app.use("/cart", addtocartRouter);
app.use("/razorpay", razorpayRouter);







// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;

