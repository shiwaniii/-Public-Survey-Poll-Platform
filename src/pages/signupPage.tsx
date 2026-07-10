import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Signup() {

  const navigate = useNavigate();

  const [name,setName]=useState("");

  const [email,setEmail]=useState("");

  const [password,setPassword]=useState("");

  const [confirm,setConfirm]=useState("");

  const handleSignup=(e)=>{

    e.preventDefault();

    if(password!==confirm){

      alert("Passwords don't match");

      return;
    }

    const user={

      name,

      email,

      password

    };

    localStorage.setItem(email,JSON.stringify(user));

    alert("Registration Successful");

    navigate("/");
  }

  return(

<div className="container">

<div className="card">

<h1>Create Account</h1>

<form onSubmit={handleSignup}>

<input
type="text"
placeholder="Full Name"
onChange={(e)=>setName(e.target.value)}
required
/>

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
required
/>

<input
type="password"
placeholder="Confirm Password"
onChange={(e)=>setConfirm(e.target.value)}
required
/>

<button>

Register

</button>

</form>

<p>

Already have an account?

<Link to="/"> Login</Link>

</p>

</div>

</div>

  )

}

export default Signup;