const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: [true, "Please Enter Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter password"],
        select: false
    },
    timeline: [
        {
            title: String,
            desc: String,
            date: Date
        }
    ],
     skills: [
        {
            public_id: String,
            url: String
        }
     ],

    avatar:{
        public_id: String,
        url: String
    },
    
    description: String,
    phone: Number,
    subtitle: String,
    role: String,
    quote: String,
});

const User = new mongoose.model("User", userSchema);

module.exports = User;