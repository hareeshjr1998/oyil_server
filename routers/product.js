const express = require("express");

const authorization = require("../middleware/authorization");
const upload = require("../middleware/upload")

const ProductController = require("../controllers/product.controller");

const router = express.Router();

router.post("/add", authorization, ProductController.addProduct);

router.put("/update", authorization, ProductController.updateProduct);

router.delete("/delete", authorization, ProductController.deleteProduct);

router.post("/list", ProductController.getProducts);

router.post("/fetch", ProductController.fetchProduct);

router.post("/image/upload", authorization, upload, ProductController.uploadImages);

router.post("/video/upload", authorization, upload, ProductController.uploadVideo);

router.delete("/image/delete", authorization, upload, ProductController.deleteImage);

router.delete("/video/delete", authorization, upload, ProductController.deleteVideo);

router.put("/status/change", authorization, ProductController.changeStatus);

router.put("/approve", authorization, ProductController.approveProduct);

router.put('/view/add', ProductController.viewCount)

router.get("/user/list", ProductController.list);






module.exports = router;