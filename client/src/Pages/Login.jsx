import { Button, Typography } from '@mui/material'
import React, { useState } from 'react';
import {AiOutlineLogin} from "react-icons/ai";
import { useGetAdminQuery , useLoginUserMutation } from '../redux/apis/authApis';
import { useEffect } from 'react';



const Login = ({setAdminTrue}) => {
    const [admin, setAdmin] = useState({
        email:"",
        password:""
    });

    const [loginUser, {isSuccess}] = useLoginUserMutation();

    const inputHandler =(e)=>{
        const {name, value} = e.target;
        setAdmin({...admin, [name]: value})
    }
    const submitHandler = async(e)=>{
        e.preventDefault();

         await loginUser(admin);

        setAdmin({
            email:"",
            password:"" 
        })
    };

    const {data} = useGetAdminQuery();
   

    useEffect(()=>{
      if(isSuccess){
        setAdminTrue(data) 
        alert("Login Success");
        window.location.reload();
      }
    }, [isSuccess, data, setAdminTrue])

    
  return (
    <div className='login'>
      <div className="login-container">
        <form  className="login-form" onSubmit={submitHandler}>
            <Typography variant='h4'>
                <p>A</p>
                <p>D</p>
                <p>M</p>
                <p>I</p>
                <p style={{marginRight: "1vmax"}}>N</p>

                <p>P</p>
                <p>A</p>
                <p>N</p>
                <p>E</p>
                <p>L</p>
            </Typography>

            <div>
                <input type="email" placeholder='Email' name='email' value={admin.email} onChange={inputHandler} />
                <input type="password" placeholder='Password' name='password' value={admin.password} onChange={inputHandler} />
                <Button variant='contained' type='submit'>Login <><AiOutlineLogin /></></Button>
            </div>
        </form>
      </div>  
    </div>
  )
}

export default Login