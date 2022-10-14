const express = require("express");
const jwtVerify = require("../middleware/jwtVerify");
const {createProject, updateProject, deleteProject, getAllProjects, getSingleProject ,getRecentProjects} = require("../controller/projectController")

const router = express.Router();

router.get("/project/all", getAllProjects);

router.get("/project/recent",  getRecentProjects);

router.get("/project/single/:id", jwtVerify, getSingleProject);

router.post("/project/create", jwtVerify, createProject);

router.patch("/project/update/:id&:publicId", jwtVerify, updateProject);

router.delete("/project/delete/:id", jwtVerify, deleteProject);

module.exports = router;