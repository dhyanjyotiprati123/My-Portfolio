import React from 'react';
import { Typography } from '@mui/material';
import {AiFillMail} from "react-icons/ai"
import {BsPhone} from "react-icons/bs";
import {useSelector} from "react-redux"

const About = () => {
  const user = useSelector(state => state.user.user)  ;
  console.log(user);
  return (
    <div className='about'>
        <div className="about-container">
            <Typography>
                {user.quote}
            </Typography>
        </div>
        <div className="about-container2">
            <div className="about-container2-box">
                <img src={user.avatar.url} alt="name" />
                <Typography variant='h4'>{user.name}</Typography>
                <Typography style={{fontSize: "1.2vmax"}}>Full-Stack Developer</Typography>
                <Typography style={{fontSize: "1vmax"}}>Freelancer</Typography>
            </div>
            <div className="about-container2-box about-container2-box2">
                <p className="about-desc">
                    Hey I am a Full-Stack Developer and a Freelancer located in India, My preferred stack is MERN-stack 
                    I Am compatable with many animation libraries like <b>Framer-Motion, Gsap, Three.js</b>  etc
                </p>
                <p className="about-contact">
                    <p>You can contact me for any web application</p>
                    <span>
                      <><AiFillMail /></>
                      {user.email}
                    </span>

                    <span>
                        <><BsPhone /></>
                        +91 {user.phone}
                    </span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default About