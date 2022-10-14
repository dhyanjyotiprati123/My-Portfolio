import React from 'react'
import { useState } from 'react';
import {useCreateProjectMutation} from "../redux/apis/projectApis";
import {useNavigate} from "react-router-dom"
import { useEffect } from 'react';


const NewProject = () => {
   const [title, setTitle] = useState("");
   const [webLink, setWebLink] = useState("");
   const [github, setGithub] = useState("");
   const [tags, setTags] = useState("");
   const [img, setImg] = useState();
   let tagsArr;
   let navigate = useNavigate();

   const [addProject, {isSuccess, isError}] = useCreateProjectMutation()

   const handleImg = (e)=>{
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
        setImg(reader.result)
      }
   }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    tagsArr = tags.split(",");
     try {
       await addProject({title, webLink, github, tags: tagsArr , img});
     } catch (error) {
       alert(error)
     };
  }

  useEffect(()=>{
    if(isSuccess){ 
      setTitle("");
      setWebLink("");
      setGithub("");
      setTags("");
      setImg();

      navigate("/projects");
      window.location.reload();
   }
   if(isError){
     alert("something went wrong")
   }
   }, [isSuccess, isError, navigate])

   
  return (
    <div className='newproject'>
        <div className="newproject-wrapper">
            <div className="newproject-header">
              <h1 className="newproject-heading">
                Create New Project
              </h1>
            </div>
            <form className="newproject-form">
              <input type="text" placeholder='Title' name='title' className="newproject-input" value={title} onChange={(e)=> setTitle(e.target.value)} />
              <input type="text" placeholder='Weblink' name='weblink' className="newproject-input" value={webLink} onChange={(e)=> setWebLink(e.target.value)} />
              <input type="text" placeholder='Github' name='github' className="newproject-input" value={github} onChange={(e)=> setGithub(e.target.value)} />
              <input type="text" placeholder='Tags' name='tags' className="newproject-input" value={tags} onChange={(e)=> setTags(e.target.value)} />
              <input type="file" placeholder='project-img' onChange={handleImg} />
              <button className="newproject-btn" type='submit' onClick={ handleSubmit }>
                 Submit
              </button>
            </form>
        </div>
    </div>
  )
}

export default NewProject