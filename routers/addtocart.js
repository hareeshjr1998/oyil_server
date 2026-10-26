const express = require("express");

const authorization = require("../middleware/authorization");

const AddtoCartController = require("../controllers/addtocart.controller");

const router = express.Router();

router.post("/add", authorization, AddtoCartController.addToCart);

router.put("/update", authorization, AddtoCartController.Update);

router.delete("/delete", authorization, AddtoCartController.Delete);

router.post("/list", authorization, AddtoCartController.List);

router.post("/fetch", authorization, AddtoCartController.Fetch);



module.exports = router;