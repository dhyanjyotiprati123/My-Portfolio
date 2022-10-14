import React from 'react';
import {AiFillEdit} from "react-icons/ai"


const SkillCard = ({img, setskill, publicId, setSkillId}) => {
  const handleSkillImg = (e)=>{
     const file = e.target.files[0];
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onloadend =()=>{
       setskill(reader.result);
     }
     setSkillId(publicId)
  }
  return (
    <div className='skillcard'>
        <div className="skillcard-img">
            <img src={img} alt="skill" />
        </div>
        <div className="skillcard-edit">
            <label htmlFor={publicId}>
                <AiFillEdit size={30} />
            </label>
            <input type="file" id={publicId} accept='image/*' className='skillcard-input' onChange={handleSkillImg} />
        </div>
    </div>
  )
}

export default SkillCard