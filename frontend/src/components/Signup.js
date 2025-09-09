import React, { useState } from 'react';
import '../components/style.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const [signupInfo, setSignupInfo] = useState({
        firstName:'',
        lastName:'',
        email:'',
        mobile:'',
        password:'',
        role:''
    });
    const navigate = useNavigate();
    const handleOnChange = (e) =>{
        const { name , value } = e.target

        setSignupInfo((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const submitHandler = (event) => {
        event.preventDefault();
        const { firstName, lastName, email, mobile, password, role } = signupInfo;
        if (!firstName || !lastName || !email || !mobile || !password  || !role) {
            return toast.error('All Fields are required')
        }
        try{
            navigate('/')
        }catch(error){


        }
    };

    return (
        <div className='signup-wrapper'>
            <div className='signup-box'>
                <div className='signup-left'>
                    <div className='signup-left-heading'>
                        <h1>Signup</h1>
                    </div>
                    <div className='signup-left-para'></div>
                </div>
                <div className='signup-right'>
                    <form className='signup-form' onSubmit={submitHandler}>
                        <h1>User Registration</h1>

                        <input 
                            type='text' 
                            onChange={handleOnChange} 
                            name='firstName' 
                            placeholder='Enter First Name' 
                            value={signupInfo.firstName}
                        />
                        <input 
                            type='text' 
                            onChange={handleOnChange} 
                            name='lastName' 
                            placeholder='Enter Last Name' 
                            value={signupInfo.lastName}
                        />
                        <input 
                            type='email' 
                            onChange={handleOnChange} 
                            name='email' 
                            placeholder='Enter Email address' 
                            value={signupInfo.email}
                        />
                        <input 
                            type='text' 
                            onChange={handleOnChange} 
                            name='mobile' 
                            placeholder='Enter Mobile No.' 
                            value={signupInfo.mobile}
                        />
                        <input 
                            type='password' 
                            onChange={handleOnChange} 
                            name='password' 
                            placeholder='Enter Password' 
                            value={signupInfo.password}
                        />
                        <select name='role' onChange={handleOnChange} value={signupInfo.role}>
                            <option value=''>Select Role</option>
                            <option value='Admin'>Admin</option>
                            <option value='User'>User</option>
                        </select>
                        <button type='submit' name='submit' className='signup-btn'>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
