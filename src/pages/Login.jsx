import axios from 'axios'
import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserContext from '../context/UserContext'


const Login = () => {

  let ctx = useContext(UserContext)
  console.log(ctx)

  let emailRef = useRef()
  let passwordRef = useRef()

  let navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault();
    let obj = {
      email:emailRef.current.value,
      password:passwordRef.current.value
    }
    let res = await axios.post('http://localhost:8080/users/login',obj)
    // console.log(res)
    if(res.data.success){
      console.log(res.data)
      localStorage.setItem('socialDetails',JSON.stringify({login:true,token:res.data.token}))
      ctx.setdetails({login:true,token:res.data.token})
      toast.success(res.data.msg,{position:'top-center'})
      navigate('/')
    }
    else{
      toast.error(res.data.msg, {position:'top-center'})
    }
  }
  return (
    <div>
           <form  className='w-50 bg-warning  p-3 m-auto mt-5'>
        <h3 className='text-center my-2'>Blog Login page</h3>
 
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input ref={emailRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input ref={passwordRef} type="password" className="form-control" id="exampleInputPassword1" />
  </div>
  
  <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
  <p className='text-center'>don't have an account? <Link to={'/signup'}>register</Link> </p>
  <p className='text-center my-1'><Link to={'/forgetPassword'}>Forget pssword</Link></p>
</form>
    </div>
  )
}

export default Login