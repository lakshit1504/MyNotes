import React,{useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'

export default function SignUp() {

  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
  const navigate= useNavigate();
  const {name,email,password,cpassword}=credentials;

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    const response=await fetch("https://mynotes-api-047i.onrender.com/api/auth/createuser",{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({name,email,password})
  });
  const json=await response.json();
  console.log(json)
  if(json.success){
      // set and save authtoken
      localStorage.setItem('token',json.authtoken);
      navigate('/');
  }
  else{
    alert("invalid credentials")
  }
  }

  const onchange=(e)=>{ 
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }


  return (
    <div>
      <h2 className="mt-3">Create an account on NOTEBOOK</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3" >
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={name} id="name" aria-describedby="emailHelp" onChange={onchange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" id="email" value={email} aria-describedby="emailHelp" onChange={onchange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>


        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={password} id="password" autoComplete="on" onChange={onchange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="cpassword" className="form-control" value={cpassword} name="cpassword" id="cpassword" onChange={onchange}/>
        </div>

         
        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
    </div>
  )
}
