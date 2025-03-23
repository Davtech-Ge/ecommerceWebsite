import { useState } from 'react'
import loginIcons from '../logo/2.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imagetobase64';
import summaryApi from '../common/index'
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false)
    const [data, setData] = useState({
        email: "",
        name : "",
        password : "",
        confirmPassword : "",
        profilePic : ""
    });
    const navigate =  useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
            ...preve,
            [name] : value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password === data.confirmPassword){
            const dataResponse = await fetch(summaryApi.signUp.url,{
                method: summaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
    
            const dataApi = await dataResponse.json()

            if (dataApi.success){
                toast.success(dataApi.message)
                navigate('/login')
            }

            if (dataApi.error){
                toast.error(dataApi.message)
            }  
        } else {
            toast.error('password and confirm password must be the same')
        }    
    }

    const handleUploadPic = async (e) => {
        const file = e.target.files[0]

       const imagePic = await imageTobase64(file) 
        setData((prev) => {
            return{
            ...prev,
            profilePic : imagePic
            }
    })
    }
  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>
            
            <div className='bg-white p-5 w-full max-w-sm mx-auto rounded'>
                    <div className='h-20 w-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || loginIcons} alt='login icons' className='rounded-full' />
                        </div>
                        <form>
                            <label>
                                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                 upload Photo
                                 </div>
                                <input type='file' className='hidden' onChange={handleUploadPic} required/>
                            </label>
                        </form>
                    </div>

                    <form className='p-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Name :</label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                    type='text' 
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    placeholder='Name' 
                                    className='w-full h-full outline-none bg-transparent'
                                    required
                                    />
                            </div>
                        </div>

                        <div className='grid'>
                            <label>Email :</label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                type='email' 
                                name='email'
                                value={data.email}
                                onChange={handleOnChange}
                                placeholder='Email address'
                                required 
                                className='w-full h-full outline-none bg-transparent'/>
                            </div>
                        </div>

                        <div>
                            <label>Password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                type={showPassword ? "text" : "password"} 
                                name='password'
                                value={data.password}
                                onChange={handleOnChange}
                                placeholder='Enter password'
                                required 
                                className='w-full h-full outline-none bg-transparent'
                                />
                                <div 
                                className='cursor-pointer text-xl' 
                                onClick={() => setShowPassword((prev) => !prev)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )
                                        }
                                    </span>
                                </div>
                            </div>

                            <div>
                            <label>Confirm password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                type={showConfirm ? "text" : "password"} 
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleOnChange}
                                placeholder='confirm password'
                                required 
                                className='w-full h-full outline-none bg-transparent'
                                />
                                <div 
                                className='cursor-pointer text-xl' 
                                onClick={() => setShowConfirm((prev) => !prev)}
                                >
                                    <span>
                                        {
                                            showConfirm ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                         </div>
                            <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                        Forgot password?
                            </Link>
                        
                    </div>

                        <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 hover:bg-red-700 transition-all mx-auto block mt-6'>Sign Up</button>
                    </form>

                    <p className='my-5'>
                        Already have an account ? 
                        <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'> Sign In </Link>

                    </p>
            </div>
        </div>
    </section>
  )
}

export default SignUp