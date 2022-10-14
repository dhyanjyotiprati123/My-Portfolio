import React, { useCallback, useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.min.css';
import "./Style/main.css";
import {Routes, Route} from "react-router-dom"
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Login from "./Pages/Login";
import NewProject from "./Pages/NewProject";
import Timeline from "./Pages/Timeline";
import Project from "./Pages/Project";

import { useDispatch, useSelector} from "react-redux"
import { useGetCurrentUserQuery } from "./redux/apis/userApis";
import {isLoggedin_success} from "./redux/slices/userSlice"
import AdminPanel from "./Pages/AdminPanel";
import { useGetAdminQuery } from "./redux/apis/authApis";
import {isAdminLoggedIn} from "./redux/slices/adminSlice"
import Timelines from "./Pages/Timelines";

const App = () => {
  let admin = useSelector(state => state.admin.admin);
  const [isAdmin, setIsAdmin] = useState(admin);

  const {isLoading, isSuccess, data} = useGetCurrentUserQuery();
  
  const {data: adminData, isSuccess: adminSuccess} = useGetAdminQuery()
 
  const dispatch = useDispatch()
  
  const loadAdmin = useCallback(()=>{
    if(adminSuccess){
      dispatch(isAdminLoggedIn(adminData));
      setIsAdmin(adminData);
    }
  },[adminData, adminSuccess, dispatch]);

   if(isSuccess){
    dispatch(isLoggedin_success(data))
   }


  useEffect(()=>{
    loadAdmin();
  },[ loadAdmin])


  return (
    <div>
    {
      isLoading ? <div>Loading..</div> :
      <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<Project />} />

        <Route path='/account' element={ isAdmin ? <AdminPanel /> : <Login setAdminTrue={setIsAdmin} />} />
        <Route path="/addproject" element={isAdmin ? <NewProject /> : <Login setAdminTrue={setIsAdmin}  /> } />
        <Route path="/timeline" element={isAdmin ? <Timeline /> : <Login setAdminTrue={setIsAdmin}  /> } />
        <Route path="/timelines" element={isAdmin ? <Timelines /> : <Login setAdminTrue={setIsAdmin} />} />
        
      </Routes>
      <Footer />
      </>
    }
      
    </div>
  )
}

export default App
