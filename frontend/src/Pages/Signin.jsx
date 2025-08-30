import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api_url from '../utils';
import { useDispatch } from 'react-redux';
import { signIn } from "../store/authSlice";

const Signin = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const HandleSignin = async (req, res) => {
        try {
            if (!password || !email) {
                console.log("email and password are required");
                return;
            }
            const url = `${api_url}/api/user/signin`;
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }
            const response = await fetch(url, options);
            const result = await response.json();
            const { success, message, error, user } = result;
            if (success) {
                console.log(message);
                dispatch(signIn({email,user}));
                navigate("/");
            } else {
                console.log(message, error);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='w-full min-h-screen flex flex-col lg:flex-row'>
            <div className='w-full lg:w-1/2 flex justify-center p-4 lg:p-8'>
                <div className='w-full max-w-md'>
                    <div className='flex flex-col justify-center items-center gap-4 lg:gap-6'>
                        <img
                            src="/logo.svg"
                            alt="Logo"
                            className='w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40'
                        />
                        <h1 className='text-lg sm:text-xl lg:text-2xl font-semibold text-center'>
                            Sign in to your account
                        </h1>
                        
                        <div className='w-full flex flex-col gap-3 lg:gap-4'>
                            <input
                                type="email"
                                placeholder='Email'
                                value={email}
                                className='border border-gray-300 p-3 rounded-md w-full h-12 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder='Password'
                                value={password}
                                className='border border-gray-300 p-3 rounded-md w-full h-12 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button 
                            className='bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 w-full rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2' 
                            onClick={() => HandleSignin()}
                        >
                            Sign In
                        </button>
                        
                        <Link 
                            className='text-sm sm:text-base text-center' 
                            to="/signup"
                        >
                            Don't have an account?{' '}
                            <span className='text-blue-500 font-bold hover:text-blue-600 transition-colors'>
                                Sign up
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='hidden lg:flex lg:w-1/2'>
                <img
                    src="/authImg.png"
                    alt="Authentication illustration"
                    className='w-full h-full object-cover'
                />
            </div>
        </div>
    )
}

export default Signin
