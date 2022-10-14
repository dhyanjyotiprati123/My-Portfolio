const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config/config");
const sendMail = require("../middleware/sendMail");
const cloudinary = require("../utils/cloudinary");

const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email, password});

        if(!user){
            return res.status(404).send("Invalid Credentials")
        }

        const token = jwt.sign({_id: user._id}, jwtSecret);

        res.status(200).cookie("jwtToken", token, {
            expires: new Date(Date.now()+ 10*60*1000),
            httpOnly: true
        });

        res.status(201).json({success: true})
    } catch (error) {
        return res.status(500).send(error)
    }
};


const logoutUser = async(req, res)=>{
    try {
        res.clearCookie("jwtToken");
        res.status(200).send("User Logged out");
    } catch (error) {
        return res.status(500).send(error)
    }
}

const getUser = async(req, res)=>{
    try {
        const user = await User.findOne();
        if(!user){
            return res.status(404).send("User Not Found")
        }
        res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const getAdmin = async(req, res)=>{
    try {
        const admin =await User.findById(req.user._id);
        if(!admin){
            return res.status(404).json({message: "Admin Not Found"})
        }
        res.status(200).send(admin);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const contactUser = async(req, res)=>{
    try {
        const {name, email, message} = req.body;

        const userMessage = `Hi my name is ${name}.  My email is ${email}.  My project description ${message}`;

        await sendMail(userMessage);

        res.status(200).json({message: "Response Recorded"})

    } catch (error) {
        return res.status(500).send(error);
    }
}

const updateUser = async(req, res)=>{
    try {
        const user = await User.findById(req.user._id);
        
        if(!user){
            return res.status(404).send("Login To continue")
        }

        const skillItems = user.skills.map((val) => val)

        const {name, email, password, skills, avatar, description, phone, subtitle, role, quote,skillId} = req.body;
         
        if(name){
            user.name = name;
        }
        if(email){
            user.email = email;
        }
        if(password){
            user.password = password;
        }
        if(description){
            user.description = description
        }
        if(phone){
            user.phone = phone
        }
        if(subtitle){
            user.subtitle = subtitle
        }
        if(role){
            user.role = role
        }
        if(quote){
            user.quote = quote
        }
        if(avatar){
            if(user.avatar.public_id != null && user.avatar.public_id !== "" ){
                await cloudinary.uploader.destroy(user.avatar.public_id);
            }
           
            const response = await cloudinary.uploader.upload(avatar);
            user.avatar ={
                public_id: response.public_id,
                url: response.secure_url
            }
        }
        if(skills){
            const skill = skillItems.filter((val) => val.public_id === skillId)
            
             await cloudinary.uploader.destroy(skillId);
            
          
            const response = await cloudinary.uploader.upload(skills);
           
            skill.public_id = response.public_id;
            skill.url = response.secure_url;
        }
        
        await user.save();

        res.status(200).json({message: "User Updated Successfully"})

    } catch (error) {
        return res.status(500).send(error);
    }
}

const addTimeline = async(req, res)=>{
    try {
        const {title, desc, date} = req.body;
        const user = await User.findById(req.user._id);

        user.timeline.unshift({
            title, desc, date
        })

        await user.save();

        res.status(200).json({message:"added to timeline"})

    } catch (error) {
        return res.status(500).send(error);
    }
}

const deleteTimeline = async(req, res)=>{
    try {
        const {id} = req.params;
        
        const user = await User.findById(req.user._id);

        user.timeline = user.timeline.filter((item)=> item.id !== id);

        await user.save();
        res.status(200).json({user: user})
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = {loginUser, logoutUser, getUser, contactUser, updateUser, addTimeline, deleteTimeline, getAdmin};