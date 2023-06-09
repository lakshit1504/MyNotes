import React,{useState} from 'react'
import { useNavigate,Link} from 'react-router-dom'

const Login = () => {
  const [credentials, setCredentials] = useState({email:"",password:""})
  const navigate= useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    const response=await fetch("https://mynotes-api-047i.onrender.com/api/auth/authenticateUser",{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({email:credentials.email,password:credentials.password})
  });
  const json=await response.json();
  // console.log(json)
  if(json.success){
      // set and save authtoken
      // console.log(json.authToken)
      localStorage.setItem("token",json.authToken);
      navigate('/');
  }
  else{
    alert("invalid credentials")
  }
  }

  const onChange=(e)=>{ 
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div>
        <h2 className="mt-3">Login to My-Notes</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password"/>
            </div>
            
            <button type="submit" className="btn btn-dark">Submit</button>
            <div className='button my-4' > No Account? <Link to="/signup" style={{"textDecoration":"none", "backgroundColor":"black" , "borderRadius":"5px", padding: "6px",margin:"2px",color:"white"}}>signup</Link></div>
            </form>

            
    </div>
  )
}

export default Login
