import React from 'react';
import {AiOutlineFundProjectionScreen, AiOutlineLogout} from "react-icons/ai";
import {RiRestTimeLine} from "react-icons/ri";
import {MdTimeline} from "react-icons/md";
import {Link} from "react-router-dom";
import axios from 'axios';
import {isAdminLoggedOut} from "../redux/slices/adminSlice";
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";

const Sidebar = ({user}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const LogoutUser = async()=>{
       try {
         const response = await axios.get("https://frozen-brook-79076.herokuapp.com/api/user/logout", {withCredentials: true});
         if(response.status === 200){
           dispatch(isAdminLoggedOut(null));
           window.location.reload();
           navigate("/account")
         }
       } catch (error) {
         alert(error)
       }
  }
  

  return (
    <div className='sidebar'>
        <div className="sidebar-avatar">
            <img src={user.avatar.url} alt="profile" />
        </div>
        <div className="sidebar-info">
            <h1>{user.name}</h1>
            <h2>{user.subtitle}</h2>
            <h3>{user.role}</h3>
        </div>
        <div className="sidebar-controls">
            <Link to={"/timeline"} className="sidebar-link">
              <button className="sidebar-btn">
                <><MdTimeline /></>
                Add Timeline
              </button>
            </Link>
            <Link to={"/addproject"} className="sidebar-link">
              <button className="sidebar-btn">
                <><AiOutlineFundProjectionScreen /></>
                Create New Project
              </button>
            </Link>

            <Link className='sidebar-link' to={"/timelines"}>
              <button className='sidebar-btn'>
                 <><RiRestTimeLine /></>
                 Timelines
              </button>
            </Link>
            
            <button className="sidebar-btn" onClick={LogoutUser}>
                <><AiOutlineLogout /></>
                Logout
            </button>
        </div>
    </div>
  )
}

export default Sidebar