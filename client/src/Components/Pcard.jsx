import React from 'react';
import {AiOutlineGithub, AiOutlineAntCloud, AiFillProject} from "react-icons/ai";
import {Link} from "react-router-dom";

const Pcard = ({project}) => {
  if(project === undefined || null){
     return null
  }
  return (
    <div className='pcard' >
       <figure>
          <img src={project.imgUrl} alt="pic" />
       </figure>
       <h4 className="pcard-title">{project.title}</h4>
       <div className="pcard-tags">
        {
          project.tags.map((val, indx)=> <span key={indx}>#{val}</span>)
        }
       </div>
       <div className="pcard-links">
         <a href={project.github} target="blank" className="pcard-link">
           <AiOutlineGithub />
         </a>
         <Link to={`/project/${project._id}`} className="pcard-link">
           <AiFillProject size={20} />
         </Link>
         <a href={project.webLink} target="blank" className="pcard-link">
           <AiOutlineAntCloud  />
         </a>
       </div>
    </div>
  )
}

export default Pcard