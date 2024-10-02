

import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    let emailRef = useRef();
    const [msg, setmsg] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        let obj={
            email:emailRef.current.value
        }
        let res = await axios.post('http://localhost:8080/users/forget-password',obj);
        let data = res.data
        console.log(data)
        setmsg(data.msg)

    }
  

    
  return (

 
   
 <div >
       {msg?<h1>{msg}</h1>:<form action=""  className='d-flex flex-column w-50 m-auto gap-lg-2 gap-3 bg-info p-4 my-5 rounded-2'>
              <h3>Please enter your email</h3>
            <label style={{fontFamily:"bold"}} htmlFor=""> email</label>

            <input ref={emailRef} type="email" />
            <button  className=' btn btn-success' onClick={handleSubmit}>Submit</button>
        </form>}

        {msg &&<Link to='/login'  className='btn btn-success'>Login</Link>}
    </div>
  
   
  )
}

export default ForgetPassword