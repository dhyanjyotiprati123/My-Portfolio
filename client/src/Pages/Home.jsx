import React, {useEffect, useState} from 'react';
import * as THREE from "three";
import Moon from "../Assets/moon.jpg";
import Venus from "../Assets/venus.jpg";
import Space from "../Assets/space.jpg";
import { Typography } from '@mui/material';
import TimeLine from '../Components/Timeline';
import {SiReact, SiJavascript,SiMongodb,SiNodedotjs,SiExpress,SiCss3,SiHtml5,SiJsonwebtokens,SiFramer} from "react-icons/si";
import Pcard from '../Components/Pcard';
import {useSelector} from "react-redux";
import {useGetRecentProjectsQuery} from "../redux/apis/projectApis";
import {Link} from "react-router-dom";
import { MouseOutlined } from '@mui/icons-material';



const Home = () => {
    const user = useSelector(state => state.user.user);
    const {data, isSuccess} = useGetRecentProjectsQuery();
    const [recent, setRecent] = useState([]);

    useEffect(() => {
       if(isSuccess){
         setRecent(data)
       }
    }, [data, isSuccess]);

    useEffect(()=>{
        const texture = new THREE.TextureLoader();
        const moonTexture = texture.load(Moon);
        const venusTexture = texture.load(Venus);
        const spaceTexture = texture.load(Space)

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        const canvas = document.querySelector(".home-canvas");
     
        const renderer = new THREE.WebGLRenderer({canvas: canvas});

        const moonGeometry = new THREE.SphereGeometry(2, 64, 64);
        const moonMaterial = new THREE.MeshStandardMaterial({map: moonTexture});
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);

        const venusGeometry = new THREE.SphereGeometry(3, 64, 64);
        const venusMaterial = new THREE.MeshBasicMaterial({map: venusTexture});
        const venus = new THREE.Mesh(venusGeometry, venusMaterial);
        venus.position.set(8, 5, 5);


        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(8,5,5);
        const pointLight2 = new THREE.PointLight(0xfffff, 0.1);
        pointLight2.position.set(-8,-5,-5);


        scene.add(moon);
        scene.add(venus);
        scene.add(pointLight);
        scene.add(pointLight2);
        scene.background = spaceTexture;

        camera.position.set(4,4,8);

        window.addEventListener("mousemove", (e)=>{
            if(e.clientX < window.innerWidth/2){
               moon.rotation.x -= 0.01
               moon.rotation.y += 0.01
               venus.rotation.x -= 0.01
               venus.rotation.y += 0.01
            }

            if(e.clientX > window.innerWidth/2){
                moon.rotation.x -= 0.01
                moon.rotation.y -= 0.01
                venus.rotation.x -= 0.01
                venus.rotation.y -= 0.01
            }

            if(e.clientX < window.innerHeight/2){
                moon.rotation.x -= 0.01
                moon.rotation.y += 0.01
                venus.rotation.x -= 0.01
                venus.rotation.y += 0.01
             }

             if(e.clientX > window.innerHeight/2){
                moon.rotation.x -= 0.01
                moon.rotation.y -= 0.01
                venus.rotation.x -= 0.01
                venus.rotation.y -= 0.01
            }
        })

        const animate =()=>{
            requestAnimationFrame(animate);
            moon.rotation.y += 0.001;
            venus.rotation.y += 0.001;
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera)
        }

        animate();   
        
        return window.addEventListener("scroll", ()=>{
            camera.rotation.z = window.scrollY*0.001
            camera.rotation.y = window.scrollY*0.003

            const iconBox = document.getElementById("skillIcons");
            if(window.scrollY > 1200){
                iconBox.style.animationName ="iconAnimationOn"
            }
            else{
                iconBox.style.animationName ="iconAnimationOff"
            }
        });
        
     },[]);

  return (
    <div className='home'>
        <canvas className="home-canvas">

        </canvas>
        <div className="home-canvasContainer">
            <Typography variant='h1'>
               <p>D</p>
               <p>H</p>
               <p>Y</p>
               <p>A</p>
               <p>N</p>
            </Typography>

            <div className="home-canvasBox">
                <Typography variant='h2'>DESIGNER</Typography>
                <Typography variant='h2'>DEVELOPER</Typography>
                <Typography variant='h2'>FREELANCER</Typography>
            </div>

            <Link className='home-canvasLink' to={"/projects"}>
                View Work
            </Link>
        </div>

        <div className="home-scrollBtn">
            <MouseOutlined />
        </div>

        <div className="home-container">
            <Typography variant='h3' >
               TIMELINE
            </Typography>
            <TimeLine timelines={user.timeline} />
        </div>

        <div className="home-skills">
            <Typography variant='h3'>SKILLS</Typography>

            <div className="home-skills-cube">
                {
                    user !== null && (
                       <>
                         {
                           user.skills.map((val, indx) => (
                            <div className={`home-skills-faces home-skills-faces${indx+1}`} key={val._id}>
                              <img src={val.url} alt={`face${indx}`} />
                            </div>
                           ) ) 
                         }
                       </> 
                    )
                }
            </div>

            <div className="home-cubeShadow"></div>

            <div className="home-icons" id="skillIcons">
               <SiReact />
               <SiCss3 />
               <SiExpress />
               <SiHtml5 />
               <SiJavascript />
               <SiNodedotjs />
               <SiMongodb />
               <SiJsonwebtokens />
               <SiFramer />
            </div>
        </div>
        <div className="home-projects">
          <Typography variant='h3'>Projects</Typography>

          <div className="home-projects-wrapper">
             {
                recent.map((val)=> <Pcard key={val.id} project={val} />)
             }
          </div>
        </div>
    </div>
  )
}

export default Home