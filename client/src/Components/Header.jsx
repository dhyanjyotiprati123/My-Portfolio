import React from "react"
import {ReactNavbar} from "overlay-navbar";
import {AiOutlineUser} from "react-icons/ai";
import Logo from "../Assets/logo.png"



const Header = () => {
  return (
        <ReactNavbar
           navColor1="white"
           navColor2="hsl(219, 48%, 8%)"
           burgerColor="hsl(250, 100%, 65%)"
           burgerColorHover="hsl(250, 100%, 65%)"
           logo={Logo}
           logoWidth="300px"
           nav2justifyContent="space-around"
           nav3justifyContent="space-around"
           link1Text="Home"
           link2Text="About"
           link3Text="Projects"
           link4Text="Contact"
           link1Url="/"
           link2Url="/about"
           link3Url="/projects"
           link4Url="/contact"
           link1Color="hsl(250 , 100%, 75%)"
           link1ColorHover="white"
           link1Size="1.5rem"
           link1Padding="3vmax"
           profileIcon={true}
           ProfileIconElement={AiOutlineUser}
           profileIconSize="5rem"
           profileIconColor="hsl(250 , 100%, 75%)"
           profileIconColorHover="white"
         />
    
  )
}

export default Header