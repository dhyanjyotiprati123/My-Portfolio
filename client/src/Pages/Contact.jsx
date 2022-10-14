import { Button, Typography } from '@mui/material'
import React, { useState } from 'react';
import {IoIosSend} from "react-icons/io";
import {useContactUserMutation} from "../redux/apis/userApis";
import Loader from '../Components/Loader';
import {ToastContainer, toast} from "react-toastify"

const Contact = () => {
   const [details, setDetails] = useState({
      name:"",
      email:"",
      message:""
   });

   const contactToast = ()=>{
     toast.success("Your Message Has Sent", {
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

   const [sendMessage, {isLoading, isSuccess}] = useContactUserMutation()

   const handleChange = (e)=>{
      const {name, value} = e.target;
      setDetails({...details, [name]: value})
   };

   const contactformHandler = async(e)=>{
     e.preventDefault();
     const name = details.name;
     const email = details.email;
     const message = details.message;
     
     await sendMessage({name, email, message});

     setDetails({
      name:"",
      email:"",
      message:""
     })

     if(isSuccess){
       contactToast()
     }
   }
   
  return (
    <>
      {
        isLoading ? <Loader /> : 
        (
      <>    
         <div className='contact'>
           <div className="contact-rightBar"></div>
            <div className="contact-container">
              <form  className="contact-form" onSubmit={contactformHandler}>
                 <Typography variant='h4'>Contact Me</Typography>
                 <input type="text" className="contact-input" placeholder='Name' name='name' value={details.name} onChange={handleChange} />
                 <input type="email" className="contact-input" placeholder='Email' name='email' value={details.email} onChange={handleChange}  />
                 <textarea placeholder='Message' cols="30" rows="10" className="contact-area" name='message' value={details.message} onChange={handleChange} ></textarea>
                 <Button variant='contained' type='submit' >Send <><IoIosSend /></></Button>
              </form>
           </div>  
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
    </>
        )
      }
    </>
    
  )
}

export default Contact