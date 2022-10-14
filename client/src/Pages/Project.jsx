import React, { useEffect } from 'react';
import { useState } from 'react';
import {useUpdateProjectMutation, useGetSingleProjectQuery, useDeleteProjectMutation} from "../redux/apis/projectApis";
import {AiOutlineDelete} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import Loader from '../Components/Loader';
import {ToastContainer, toast} from "react-toastify"


const Project = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [weblink, setWeblink] = useState("");
  const [github, setGithub] = useState("");
  const [tags, setTags] = useState("");
  const [img, setImg] = useState();
  const [publicId, setPublicId] = useState("")
  let tagsArr;

  const {data, isLoading, isSuccess: projectSuccess, error = {}} = useGetSingleProjectQuery(id);
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject, {isSuccess: deleteSuccess}] = useDeleteProjectMutation()
  const [project, setProject] = useState({});

  const deleteToast = ()=>{
     toast.warning("Project Deleted",{
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "light",
     })
  }

  const handleImg = (e)=>{
     const file = e.target.files[0];
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onloadend = ()=>{
        setImg(reader.result)
     }
     setPublicId(data.public_id);
  }

  const handleSubmit = async(e)=>{
     e.preventDefault();
     tagsArr = tags.split(",");
     await updateProject({id,publicId,title, weblink, github, img, tags: tagsArr});
     window.location.reload();
  }

  useEffect(()=>{
    if(projectSuccess){
      setProject(data)
    }
  }, [projectSuccess, data]);

  useEffect(()=>{
    if(error.status === 401){
      navigate("/account")
    }
  }, [error, navigate]);

  const handleDelete = async(e)=>{
     e.preventDefault();
     await deleteProject(id);

     if(deleteSuccess){
        deleteToast();
        navigate("/projects")
     }
  }


  return (
    <>
     {
       isLoading ? <Loader /> : (
        <div className='project'>
       <div className="project-info">
         <figure>
           <img src={project.imgUrl} alt="project" className="project-img" />
         </figure>
         <div className="project-content">
           <h1>Title: {project.title}</h1>
           <h2>Website: {project.webLink}</h2>
           <h2>GithubLink: {project.github}</h2>
           <h3>Tags: </h3>
           <h4>Created {project.createdAt}</h4>
         </div>
       </div>
       <div className="project-edit">
          <h1>Edit Project</h1>
         <form >
           <input type="text" placeholder='Title' name='title' value={title} onChange={(e)=> setTitle(e.target.value)} />
           <input type="text" placeholder='Weblink' name='weblink' value={weblink} onChange={(e)=> setWeblink(e.target.value)} />
           <input type="text" placeholder='Github' name='github' value={github} onChange={(e)=> setGithub(e.target.value)} />
           <input type="text" placeholder='Tags' name='tags' value={tags} onChange={(e)=> setTags(e.target.value)} />
           <div>
             <label htmlFor="img">Choose Image File To Edit</label>
             <input type="file" id='img' style={{display: "none"}} onChange={handleImg} />
           </div>

           <button type='submit' onClick={handleSubmit}>Edit Project</button>
         </form>
          <button className='project-delete' onClick={handleDelete}>Delete Project <><AiOutlineDelete size={24} /></></button>
       </div>

       <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </div>
       )
     }
   
    </>
  )
}

export default Project