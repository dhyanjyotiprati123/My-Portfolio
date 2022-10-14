import React from 'react';
import { Typography } from '@mui/material';
import {AiOutlineProject} from "react-icons/ai";
import Pcard from "../Components/Pcard";
import {useGetAllProjectsQuery} from "../redux/apis/projectApis"
import { useState } from 'react';
import { useEffect } from 'react';

const Projects = () => {
  const {data, isSuccess} = useGetAllProjectsQuery();
  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    if(isSuccess){
      setProjects(data)
    }
  },[data, isSuccess]);

  
  return (
    <div className='projects'>
       <Typography variant='h2'>Projects <AiOutlineProject /> </Typography>

       <div className="projects-wrapper">
         {
            projects.map((val)=> <Pcard key={val._id} project={val} />)
         }
       </div> 
    </div>
  )
}

export default Projects