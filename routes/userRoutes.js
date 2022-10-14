const express=  require("express");

const router = express.Router();

const {loginUser, logoutUser, getUser,contactUser, updateUser, addTimeline, deleteTimeline, getAdmin} = require("../controller/userController");
const jwtVerify = require("../middleware/jwtVerify")

router.post("/user/login", loginUser);

router.get("/user/logout", jwtVerify, logoutUser);

router.get("/user/single", getUser);

router.get("/user/admin", jwtVerify, getAdmin);

router.post("/user/contact", contactUser);

router.patch("/user/update", jwtVerify, updateUser);

router.patch("/user/timeline", jwtVerify, addTimeline);

router.patch("/user/timeline/delete/:id", jwtVerify, deleteTimeline);

module.exports = router;