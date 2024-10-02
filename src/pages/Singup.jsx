import React, { useRef } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Singup = () => {

  let NameRef=useRef()
  let EmailRef=useRef()
  let PasswordRef=useRef()

  let navigate=useNavigate()

  const handleSubmit = async(e)=>{
      e.preventDefault();

      let obj={
        name:NameRef.current.value,
        email:EmailRef.current.value,
        password:PasswordRef.current.value
        


      }
      

      if(!obj.name || !obj.email|| !obj.password){
         return alert("please fill the all fields")
      }
      // console.log(obj)

      let res =await axios.post('http://localhost:8080/users/create',obj)
      console.log(res.data)

      if(res.data.success){
        toast.success(res.data.msg,{position:'top-center'})
        navigate('/login')
      }else{
        // alert(res.data.msg)
        toast.error(res.data.msg,{position:'top-center'})
      }

     
      
  }


  return (
    <div>
      <form className='bg-warning m-auto mt-5 w-50 border p-3'>
        <h3 className='text-center my-2'> Blog Singup page  </h3>

  <div className="mb-3 ">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input ref={NameRef} type="text" className="form-control" id="name" aria-describedby="emailHelp" />
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input ref={EmailRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text"></div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input ref={PasswordRef} type="password" className="form-control" id="exampleInputPassword1" />
  </div>
  {/* <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div> */}
  <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
   <p className='text-center mb-2'>Allready have an account ? <Link to={'/login'}>Login</Link></p>
</form>
    </div>
  )
}

export default Singup

