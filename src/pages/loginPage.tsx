import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {

      alert("Login Successful!");

      navigate("/dashboard");

    } else {

      alert("Invalid Email or Password");

    }
  };

  return (

    <div className="container">

      <div className="card">

        <h1>Survey & Poll Platform</h1>

        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>

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

          <button type="submit">

            Login

          </button>

        </form>

        <p>

          New user?

          <Link to="/signup"> Create Account</Link>

        </p>

      </div>

    </div>

  );
}

export default Login;