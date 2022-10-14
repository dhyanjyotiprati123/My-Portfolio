const Project = require("../models/projectsModel");
const cloudinary = require("../utils/cloudinary")

const createProject = async(req, res)=>{
    try {
        const {title, webLink, github, img, tags} = req.body;

        const response = await cloudinary.uploader.upload(img)

        const project = new Project({
            title,
            webLink,
            github,
            userId: req.user._id,
            public_id: response.public_id,
            imgUrl: response.secure_url,
            tags
        })

        await project.save();

        res.status(201).send(project);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateProject = async(req, res)=>{
    try {
        const {id, publicId} = req.params;
        const {img, title, webLink, github, tags} = req.body

        const project = await Project.findById(id);
        if(!project){
            return res.status(404).send("No project found")
        }
        if(publicId){
            await cloudinary.uploader.destroy(publicId);
             const response = await cloudinary.uploader.upload(img);

             project.public_id = response.public_id,
             project.imgUrl = response.secure_url
        }
        if(title){
            project.title = title
        }
        if(webLink){
            project.webLink = webLink
        }
        if(github){
            project.github = github
        }
        if(tags){
            project.tags = tags
        }

        await project.save();

        res.status(200).send(project)
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteProject = async(req, res)=>{
    try {
        const project = Project.findById(req.params.id);
        if(!project){
            return res.status(404).send("No Project found")
        }

        await cloudinary.uploader.destroy(project.public_id);

        await Project.findByIdAndDelete(req.params.id);

        res.status(200).send("Project Deleted");
    } catch (error) {
        return res.status(500).send(error.message)
    }
};

const getAllProjects = async(req, res)=>{
    try {
        const projects = await Project.find();
        res.status(200).send(projects)
    } catch (error) {
        return res.status(500).send(error)
    }
}

const getRecentProjects = async(req, res)=>{
    try {
        const projects = await Project.find().sort({createdAt: -1}).limit(4);
        res.status(200).send(projects)
    } catch (error) {
        return res.status(500).send(error)
    }
}

const getSingleProject = async(req, res) =>{
  try {
     const project = await Project.findById(req.params.id);
     if(!project){
        return res.status(404).json({message: "No Project Found"})
     }

     res.status(200).send(project);
  } catch (error) {
    return res.status(500).send(error)
  }
}


module.exports = {createProject, updateProject, deleteProject, getAllProjects,getRecentProjects, getSingleProject}