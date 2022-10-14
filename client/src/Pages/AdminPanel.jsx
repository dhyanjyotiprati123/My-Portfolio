import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import SkillCard from '../Components/SkillCard';
import { useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../redux/apis/userApis';
import { useEffect } from 'react';

const AdminPanel = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [description, setDescription] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [phone, setPhone] = useState("");
    const [quote, setQuote] = useState("");
    const [avatar, setAvatar] = useState();
    const [skills, setSkills] = useState();
    const [skillId, setSkillId] = useState("");

    const admin = useSelector(state => state.admin.admin);

    const [updateUser, {isSuccess}] = useUpdateUserMutation()
    

    const handleAvatar = (e)=>{
       const file = e.target.files[0];
       const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onloadend = ()=>{
          setAvatar(reader.result)
       }
    }

    const handleSubmit = async(e)=>{
       e.preventDefault();
       await updateUser({name, email,password,role,description,subtitle,phone,quote,avatar, skills, skillId})
    }

    useEffect(()=>{
      if(isSuccess){
        alert("Update Successfull")
      }
    }, [isSuccess]);


  return (
    <div className='admin'>
        <div className="admin-container">
            <div className="admin-side">
              <Sidebar user={admin} />
            </div>
            <div className="admin-right">
               <form className="admin-form">
                  <input type="text" className="admin-input" placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)} />
                  <input type="email" className="admin-input" placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                  <input type="password" className="admin-input" placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} />
                  <input type="text" className="admin-input" placeholder='Role' value={role} onChange={(e)=> setRole(e.target.value)} />
                  <input type="text" className="admin-input" placeholder='Description' value={description} onChange={(e)=> setDescription(e.target.value)} />
                  <input type="text" className="admin-input" placeholder='Subtitle' value={subtitle} onChange={(e)=> setSubtitle(e.target.value)} />
                  <input type="Number" className="admin-input" placeholder='Phone' value={phone} onChange={(e)=> setPhone(e.target.value)} />
                  <input type="text" className="admin-input" placeholder='Quote' value={quote} onChange={(e)=> setQuote(e.target.value)} />
                  <div className="admin-editAvatar">
                    <label htmlFor="avatar">Avatar</label>
                    <input type="file" id='avatar' accept='image/*' onChange={handleAvatar} />
                  </div>
                  <div className="admin-skills">
                    {
                      admin.skills.map((val) =>  <SkillCard key={val._id} id={val.id} setskill={setSkills} setSkillId={setSkillId} publicId={val.public_id} img={val.url} />)
                    }
                  </div>
                  <div className="admin-submit">
                    <button className="admin-btn" type='submit' onClick={handleSubmit}>
                        Update
                    </button>
                  </div>
               </form>
            </div>
        </div>
    </div>
  )
}

export default AdminPanel