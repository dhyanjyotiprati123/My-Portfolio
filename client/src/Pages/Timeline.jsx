import React from 'react'
import { useState, useEffect } from 'react';
import {useAddTimelineMutation} from "../redux/apis/userApis";
import {useNavigate} from "react-router-dom"
// import { useEffect } from 'react';

const Timeline = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const [addTimeline, {isSuccess, error={}}] = useAddTimelineMutation();

  const handleSubmit = async(e)=>{
     e.preventDefault();
     await addTimeline({title,desc,date});
  }

console.log(isSuccess);

useEffect(() => {
  if(isSuccess){
    navigate("/");
    window.location.reload();
  }
}, [isSuccess, navigate]);

useEffect(()=>{
  if(error.status === 401){
    navigate("/account")
  }
}, [error, navigate])
 


  return (
    <div className='timeline'>
        <div className="timeline-wrapper">
            <h1 className="timeline-heading">Add Timeline</h1>

            <div className="timeline-content">
                <form>
                  <div>
                    <input type="text" placeholder='Title' name='title' value={title} onChange={(e)=> setTitle(e.target.value)} />
                    <input type="text" placeholder='Description' name='desc' value={desc} onChange={(e)=> setDesc(e.target.value)} />
                    <input type="date" placeholder='Date' name='date' value={date} onChange={(e)=> setDate(e.target.value)} />
                  </div>
                  <button type='submit' onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Timeline