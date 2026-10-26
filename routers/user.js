const express = require("express");


const authorization = require("../middleware/authorization");
const upload = require("../middleware/upload")

const UserController = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.post("/address/update", authorization, UserController.addressUpdate);


router.delete("/delete", authorization, UserController.delete);

router.get("/list", authorization, UserController.list);

router.post("/fetch", authorization, UserController.fetch);

router.post("/profile/upload", authorization, upload, UserController.profileUpload);

router.delete("/profile/remove", authorization, upload, UserController.profileRemove);

router.post("/proofs/add/pan", authorization, upload, UserController.panUpload);

router.post("/proofs/add/aadhar", authorization, upload, UserController.aadharUpload);

router.post("/proofs/add/driving_licence", authorization, upload, UserController.LicenceUpload);

router.delete("/proofs/delete/pan", authorization, UserController.panDelete);

router.delete("/proofs/delete/aadhar", authorization, UserController.aadharDelete);

router.delete("/proofs/delete/licence", authorization, UserController.licenceDelete);

router.post("/wishlist/add", authorization, upload, UserController.wishlistAdd);

router.delete("/wishlist/remove", authorization, upload, UserController.wishlistRemove);

module.exports = router;