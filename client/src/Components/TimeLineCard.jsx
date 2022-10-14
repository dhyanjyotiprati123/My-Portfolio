import React, { useEffect } from 'react';
import {AiFillDelete} from "react-icons/ai";
import {useDeleteTimelineMutation} from "../redux/apis/userApis";
import {useNavigate} from "react-router-dom"

const TimeLineCard = ({id ,title, desc, date}) => {
 
  const [deleteTimeline, {isSuccess}] = useDeleteTimelineMutation();
  const navigate = useNavigate()

  const handleClick = async()=>{
     await deleteTimeline(id);
  }

  console.log(isSuccess);

  useEffect(()=>{
    if(isSuccess){
      navigate("/timelines");
      window.location.reload();
    }
  }, [isSuccess,navigate])


  return (
    <div className='tcard'>
        <h1>{title}</h1>
        <h2>{desc}</h2>
        <h3>{date}</h3>
        <div>
         <button onClick={handleClick}><AiFillDelete /></button>
        </div>
       
    </div>
  )
}

export default TimeLineCard