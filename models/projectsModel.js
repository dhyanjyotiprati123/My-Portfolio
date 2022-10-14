const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    public_id: String,
    imgUrl: String,
    webLink: String,
    github: String,
    tags: [String]
},{timestamps: true});

const Project = new mongoose.model("Project", projectsSchema);

module.exports = Project;