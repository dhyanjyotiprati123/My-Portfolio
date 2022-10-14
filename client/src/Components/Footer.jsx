import React from 'react'
import { Typography } from '@mui/material'
import {Link} from "react-router-dom"
import {AiOutlineGithub, AiFillLinkedin} from "react-icons/ai"
import {SiNetlify} from "react-icons/si"

const Footer = () => {
  return (
    <div className='footer'>
       <div className="footer-about">
         <Typography variant='h4'>About Me</Typography>
         <Typography>
            Hey, My name is Dhyan Jyoti Das. I am a Full-Stack Developer and a Freelancer
         </Typography>

         <Link to="/contact" className='footer-btn'>
            <Typography variant='h5'>Contact Me</Typography>
         </Link>
       </div>
       <div className="footer-social">
         <Typography variant='h6'>Social Media</Typography>
         <div>
         <a href="https://github.com/dhyanjyotiprati123" target="blank" className="footer-link">
            <AiOutlineGithub />
         </a>

         <a href="https://app.netlify.com/teams/dhyanjyotiprati123" className="footer-link">
            <SiNetlify />
         </a>

         <a href="https://www.linkedin.com/in/dhyanjyoti-das-b409b31b1/" className="footer-link">
            <AiFillLinkedin />
         </a>
         </div>
       </div>
    </div>
  )
}

export default Footer